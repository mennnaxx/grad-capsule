require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const Letter = require('./models/Letter');

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post('/api/auth/login', (req, res) => {
  const { passcode } = req.body;
  if (passcode === process.env.PASSCODE) {
    const token = jwt.sign({ role: 'recipient' }, process.env.JWT_SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid passcode' });
  }
});

app.post('/api/letters', async (req, res) => {
  try {
    const { envelope, stamp, to, from, letters, attachment, unlockAt, sealedAt } = req.body;
    let attachmentUrl = null;

    if (attachment && attachment.startsWith('data:image')) {
      const uploadRes = await cloudinary.uploader.upload(attachment, {
        folder: 'friends-messages'
      });
      attachmentUrl = uploadRes.secure_url;
    } else if (attachment && attachment.startsWith('http')) {
      attachmentUrl = attachment;
    }

    const newLetter = new Letter({
      envelope,
      stamp,
      to,
      from,
      letters,
      attachment: attachmentUrl,
      unlockAt: unlockAt ? new Date(unlockAt) : undefined,
      sealedAt
    });

    await newLetter.save();
    res.status(201).json({ success: true });
  } catch (err) {
    console.log('Error saving letter:', err);
    res.status(500).json({ error: 'Failed to save letter' });
  }
});

app.get('/api/letters', authenticateToken, async (req, res) => {
  try {
    // find() triggers the post('find') hook which decrypts the fields
    const docs = await Letter.find();
    
    let isLocked = false;
    if (docs.length > 0) {
      // Find the first letter's unlock date, or default to June 15, 2028
      const unlockDate = docs[0].unlockAt || new Date('2028-06-15T00:00:00');
      if (new Date() < unlockDate) {
        isLocked = true;
      }
    }

    if (isLocked) {
      // Strip out private fields
      const lockedLetters = docs.map(doc => ({
        _id: doc._id,
        from: doc.from, // We return the decrypted 'from' name so the envelope can show it
        envelope: doc.envelope,
        stamp: doc.stamp,
        // letters (pages) and attachment are omitted
        sample: false
      }));
      res.json({ locked: true, letters: lockedLetters });
    } else {
      res.json({ locked: false, letters: docs });
    }
  } catch (err) {
    console.error('Error fetching letters:', err);
    res.status(500).json({ error: 'Failed to fetch letters' });
  }
});

const publicPath = path.join(__dirname, '..');
app.use(express.static(publicPath));

app.get('/letters', (req, res) => {
  res.sendFile(path.join(publicPath, 'letters.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
