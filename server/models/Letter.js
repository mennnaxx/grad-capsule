const mongoose = require('mongoose');
const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;

function getKey() {
  const envKey = process.env.ENCRYPTION_KEY || '0123456789abcdef0123456789abcdef';
  return Buffer.alloc(32, envKey, 'utf8');
}

function encrypt(text) {
  if (!text) return text;
  // If it's already encrypted (starts with base64 iv:authTag:), don't re-encrypt
  if (text.includes(':') && text.split(':').length === 3) return text;
  
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = getKey();
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  
  const authTag = cipher.getAuthTag();
  return iv.toString('base64') + ':' + authTag.toString('base64') + ':' + encrypted;
}

function decrypt(text) {
  if (!text || !text.includes(':')) return text;
  
  try {
    const parts = text.split(':');
    const iv = Buffer.from(parts[0], 'base64');
    const authTag = Buffer.from(parts[1], 'base64');
    const encryptedText = parts[2];
    
    const key = getKey();
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (err) {
    console.error('Decryption failed:', err);
    return '[Encrypted Data]';
  }
}

const letterSchema = new mongoose.Schema({
  envelope: { type: String, default: 'Classic Air Mail' },
  stamp: { type: String, default: 'Songbird' },
  to: { type: String },
  from: { type: String, required: true },
  attachment: { type: String, default: null }, // Cloudinary URL
  letters: [{
    type: { type: String },
    text: { type: String },
    drawData: { type: String },
    paper: { type: Number },
    font: { type: Number }
  }],
  unlockAt: { type: Date, default: () => new Date('2028-06-15T00:00:00') },
  sealedAt: { type: String }
});

letterSchema.pre('save', function() {
  if (this.isModified('from')) this.from = encrypt(this.from);
  if (this.isModified('to')) this.to = encrypt(this.to);
  
  if (this.isModified('letters')) {
    this.letters.forEach(page => {
      if (page.text) page.text = encrypt(page.text);
      if (page.drawData) page.drawData = encrypt(page.drawData);
    });
  }
});

function decryptDoc(doc) {
  if (!doc) return;
  if (doc.from) doc.from = decrypt(doc.from);
  if (doc.to) doc.to = decrypt(doc.to);
  if (doc.letters) {
    doc.letters.forEach(page => {
      if (page.text) page.text = decrypt(page.text);
      if (page.drawData) page.drawData = decrypt(page.drawData);
    });
  }
}

letterSchema.post('find', function(docs) {
  docs.forEach(decryptDoc);
});

letterSchema.post('findOne', function(doc) {
  decryptDoc(doc);
});

module.exports = mongoose.model('Letter', letterSchema);
