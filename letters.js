/** Receiver page — Menna's side of the site. Sealed letters stay locked behind a countdown until graduation; after that (or with ?open for a preview) each letter is shown as an opened-mail collage: envelope, stamp, note card in the writer's handwriting, doodle sheets, and a polaroid photo. */
import { h, Component, render } from 'https://esm.sh/preact@10.24.3';
import htm from 'https://esm.sh/htm@3.1.1';
import { envelopes, papers, fonts, stamps, stampArt, gradDate, gradLabel } from './app.js';

const BACKEND_URL = window.BACKEND_URL || '';
const html = htm.bind(h);

/** Shown when no letters have been sealed in this browser yet, so the page never looks broken. */
const sampleLetters = [
  {
    envelope: 'Classic Air Mail', stamp: 'Songbird', to: 'Menna', from: 'Pinka',
    letters: [{ type: 'text', text: "in the tapestry of our lives, your presence is a rare gem, illuminating the path with moments of warmth and acceptance. thank you for being my friend! i hope you're always surrounded by love, because you really deserve it.", paper: 1, font: 4 }],
    attachment: null, unlockAt: '2028-06-15', sample: true
  },
  {
    envelope: 'Burgundy Air Mail', stamp: 'Daisies', to: 'Menna', from: 'your fries partner',
    letters: [{ type: 'text', text: 'You did it. I always knew you would.\nFries on me this time — forever.', paper: 0, font: 3 }],
    attachment: null, unlockAt: '2028-06-15', sample: true
  },
  {
    envelope: 'Kraft Air Mail', stamp: 'Wild Fern', to: 'Menna', from: 'the study group',
    letters: [
      { type: 'text', text: "Where do we even start? Two years ago you walked into that horrible 8am lecture, sat next to us by accident, and somehow that became the whole thing — the library all-nighters, the shared flashcards, the panic and the laughing about the panic.", paper: 0, font: 1 },
      { type: 'text', text: "We wrote this in 2026, taking turns with the pen, arguing about every sentence. Future Menna, if any of us fell asleep at graduation, know that we were dreaming of how proud we are. Come find us after the ceremony — first round of fries is a group expense now.", paper: 0, font: 1 },
      { type: 'draw', paper: 2, drawData: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 340 300'%3E%3Cg fill='none' stroke='%235e1620' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M170 232 C90 177 100 97 150 90 C168 87 170 110 170 124 C170 110 172 87 190 90 C240 97 250 177 170 232 Z'/%3E%3Cpath d='M62 58 l8 20 20 3 -15 14 4 21 -17 -11 -17 11 4 -21 -15 -14 20 -3 z'/%3E%3Cpath d='M262 52 c2 12 8 18 20 20 c-12 2 -18 8 -20 20 c-2 -12 -8 -18 -20 -20 c12 -2 18 -8 20 -20 z'/%3E%3Cpath d='M120 268 h100' stroke-dasharray='2 10'/%3E%3C/g%3E%3C/svg%3E" }
    ],
    attachment: null, unlockAt: '2028-06-15', sample: true
  }
];

const envFor = (l) => envelopes.find(e => e.name === l.envelope) || envelopes[1];
const stampFor = (l) => stamps.find(st => st.name === l.stamp) || stamps[0];
const fontFor = (p) => fonts[p?.font] || fonts[0];
const paperFor = (p) => papers[p?.paper] || papers[0];

const waxSeal = (size) => html`<svg width=${size} height=${size} viewBox="0 0 100 100" style="display:block;filter:drop-shadow(0 3px 5px rgba(0,0,0,.4))">
  <defs>
    <radialGradient id="waxSealGradM" cx="38%" cy="32%" r="78%">
      <stop offset="0%" stop-color="#7d4a42"></stop>
      <stop offset="55%" stop-color="#5c2f2a"></stop>
      <stop offset="100%" stop-color="#421f1c"></stop>
    </radialGradient>
  </defs>
  <path d="M50 2 C62 1 74 6 82 13 C91 21 98 33 98 48 C98 61 93 74 84 83 C75 92 63 98 50 98 C37 98 24 93 16 84 C7 75 2 62 2 49 C2 36 7 24 15 15 C23 6 38 3 50 2 Z" fill="url(#waxSealGradM)"></path>
  <circle cx="50" cy="50" r="45.5" fill="none" stroke="rgba(0,0,0,.22)" stroke-width="1.6"></circle>
  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(240,214,198,.3)" stroke-width="2"></circle>
  <g fill="none" stroke="rgba(238,211,196,.62)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="50" cy="50" r="5.5"></circle>
    <ellipse cx="50" cy="34" rx="4.5" ry="9"></ellipse>
    <ellipse cx="50" cy="34" rx="4.5" ry="9" transform="rotate(45 50 50)"></ellipse>
    <ellipse cx="50" cy="34" rx="4.5" ry="9" transform="rotate(90 50 50)"></ellipse>
    <ellipse cx="50" cy="34" rx="4.5" ry="9" transform="rotate(135 50 50)"></ellipse>
    <ellipse cx="50" cy="34" rx="4.5" ry="9" transform="rotate(180 50 50)"></ellipse>
    <ellipse cx="50" cy="34" rx="4.5" ry="9" transform="rotate(225 50 50)"></ellipse>
    <ellipse cx="50" cy="34" rx="4.5" ry="9" transform="rotate(270 50 50)"></ellipse>
    <ellipse cx="50" cy="34" rx="4.5" ry="9" transform="rotate(315 50 50)"></ellipse>
  </g>
</svg>`;

function loadLetters() {
  if (typeof localStorage !== 'undefined') {
    try {
      const stored = JSON.parse(localStorage.getItem('sealedLetters') || '[]');
      if (Array.isArray(stored) && stored.length) return stored;
    } catch (_) { }
  }
  return sampleLetters;
}

class LoginScreen extends Component {
  constructor() {
    super();
    this.state = { passcode: '', loading: false, error: '' };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.state.passcode) return;
    this.setState({ loading: true, error: '' });
    
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: this.state.passcode })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        this.props.onLogin(data.token);
      } else {
        this.setState({ loading: false, error: data.error || 'Invalid passcode' });
      }
    } catch (err) {
      this.setState({ loading: false, error: 'Network error' });
    }
  }

  render() {
    const { passcode, loading, error } = this.state;
    return html`
    <div style="font-family:'Spectral',serif;color:#c2aa80;background:#28090f;min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative">
      <div style="position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(120% 100% at 50% 22%,#3a1017 0%,#280a10 62%,#1e070b 100%)"></div>
      
      <div style="position:relative;z-index:1;background:rgba(20,5,8,.6);backdrop-filter:blur(10px);padding:50px 40px;border-radius:12px;border:1px solid rgba(207,161,92,.15);box-shadow:0 20px 40px rgba(0,0,0,.5);text-align:center;max-width:380px;width:100%;animation:fadeUp .6s ease both">
        <div style="font:500 13px 'Spectral',serif;letter-spacing:3px;color:#cfa15c;margin-bottom:16px">RESTRICTED ACCESS</div>
        <h2 style="margin:0 0 30px;font:400 36px/1.1 'Newsreader',serif;color:#ead2a2">Enter Passcode</h2>
        
        <form onSubmit=${this.handleSubmit}>
          <input 
            type="password" 
            value=${passcode} 
            onInput=${e => this.setState({ passcode: e.target.value, error: '' })}
            placeholder="Your secret passcode"
            style="width:100%;box-sizing:border-box;padding:14px 16px;background:rgba(0,0,0,.3);border:1px solid rgba(207,161,92,.3);border-radius:6px;color:#ead2a2;font:400 16px 'Spectral',serif;outline:none;transition:border-color .3s;margin-bottom:16px"
            onFocus=${e => e.target.style.borderColor = '#cfa15c'}
            onBlur=${e => e.target.style.borderColor = 'rgba(207,161,92,.3)'}
          />
          ${error ? html`<div style="color:#d46a6a;font-size:14px;margin-bottom:16px">${error}</div>` : null}
          <button 
            type="submit" 
            disabled=${loading || !passcode}
            style="width:100%;padding:14px;background:${loading || !passcode ? 'rgba(207,161,92,.3)' : '#cfa15c'};color:${loading || !passcode ? 'rgba(40,9,15,.5)' : '#28090f'};border:none;border-radius:6px;font:500 16px 'Spectral',serif;cursor:${loading || !passcode ? 'not-allowed' : 'pointer'};transition:all .3s"
          >
            ${loading ? 'Authenticating...' : 'Unlock Letters'}
          </button>
        </form>
        <a href="./index.html" style="display:inline-block;margin-top:24px;font:400 13px 'Spectral',serif;color:#a88f66">← return to main page</a>
      </div>
    </div>`;
  }
}

class ReceiverPage extends Component {
  constructor() {
    super();
    let initialToken = null;
    if (typeof localStorage !== 'undefined') {
      initialToken = localStorage.getItem('auth_token');
    }
    this.state = { token: initialToken, letters: [], locked: true, loading: false };
  }

  componentDidMount() {
    if (this.state.token) {
      this.fetchLetters();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.token && !prevState.token) {
      this.fetchLetters();
    }
  }

  fetchLetters = async () => {
    this.setState({ loading: true });
    try {
      const res = await fetch(`${BACKEND_URL}/api/letters`, {
        headers: { 'Authorization': `Bearer ${this.state.token}` }
      });
      if (res.status === 401 || res.status === 403) {
        this.handleLogout();
        return;
      }
      const data = await res.json();
      this.setState({ letters: data.letters, locked: data.locked, loading: false });
    } catch (err) {
      console.error(err);
      this.setState({ loading: false });
    }
  }

  handleLogin = (token) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
    this.setState({ token });
  }

  handleLogout = (e) => {
    if (e) e.preventDefault();
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
    this.setState({ token: null });
  }

  renderSealedEnvelope(letter, i) {
    const env = envFor(letter);
    const tilt = i % 2 ? 1.8 : -2.2;
    const floatSeconds = 4.6 + (i % 3) * 0.7;
    return html`
    <div key=${i} style="width:270px;transform:rotate(${tilt}deg);animation:floaty ${floatSeconds}s ease-in-out infinite;filter:drop-shadow(0 16px 26px rgba(0,0,0,.4))">
      <div style="border-radius:6px;background:${env.stripe};padding:8px;box-sizing:border-box">
        <div style="position:relative;background:${env.paper};border-radius:2px;height:150px;overflow:hidden">
          <div style="position:absolute;inset:0;background:radial-gradient(rgba(120,90,50,.06) 1px,transparent 1px) 0 0/13px 13px;opacity:.7"></div>
          <div style="position:absolute;top:10px;right:11px;width:34px;height:42px;box-shadow:0 1px 4px rgba(0,0,0,.3);border-radius:2px;overflow:hidden;transform:rotate(4deg)">${stampArt(stampFor(letter), '100%', '100%')}</div>
          <div style="position:absolute;left:16px;top:52px;font:500 19px 'Newsreader',serif;color:${env.ink}">${letter.to || 'Menna'}</div>
          <div style="position:absolute;left:16px;top:78px;font:400 11.5px 'Spectral',serif;color:${env.ink};opacity:.75">from ${letter.from || 'a friend'}</div>
          <div style="position:absolute;right:14px;bottom:12px">${waxSeal(44)}</div>
        </div>
      </div>
    </div>`;
  }

  renderOpenedLetter(letter, i) {
    const env = envFor(letter);
    const textPages = letter.letters.filter(p => p.type === 'text' && p.text?.trim());
    const doodles = letter.letters.filter(p => p.type === 'draw' && p.drawData);
    const firstText = textPages[0];
    const cardBg = (firstText ? paperFor(firstText) : papers[1]).bg;
    const signFont = firstText ? fontFor(firstText) : fonts[3];
    return html`
    <article key=${i} style="position:relative;max-width:760px;margin:0 auto 110px;transform:rotate(${i % 2 ? 0.9 : -0.9}deg);animation:fadeUp .7s ease both;animation-delay:${i * 0.12}s">
      <div style="position:absolute;top:-40px;left:-22px;width:210px;transform:rotate(-7deg);z-index:0;filter:drop-shadow(0 14px 22px rgba(0,0,0,.45))">
        <div style="border-radius:5px;background:${env.stripe};padding:6px;box-sizing:border-box">
          <div style="position:relative;background:${env.paper};border-radius:2px;height:112px">
            <div style="position:absolute;top:0;left:0;right:0;height:0;border-left:99px solid transparent;border-right:99px solid transparent;border-top:56px solid rgba(0,0,0,.06)"></div>
            <div style="position:absolute;left:50%;top:44px;transform:translate(-50%,-50%)">${waxSeal(36)}</div>
          </div>
        </div>
      </div>
      <div style="position:absolute;top:-24px;right:52px;width:54px;height:67px;transform:rotate(6deg);z-index:2;box-shadow:0 2px 8px rgba(0,0,0,.4);border-radius:3px;overflow:hidden">${stampArt(stampFor(letter), '100%', '100%')}</div>

      <div style="position:relative;z-index:1;background:${cardBg};border-radius:6px;box-shadow:0 28px 60px -18px rgba(0,0,0,.6);padding:50px 56px 42px;box-sizing:border-box">
        <div style="font:500 26px 'Newsreader',serif;color:#5e1620">Dear ${letter.to || 'Menna'},</div>
        ${textPages.map((p, j) => html`<p key=${j} style="margin:16px 0 0;font-family:${fontFor(p).css};font-size:calc(${fontFor(p).size} + 3px);line-height:1.9;color:#3a2e28;white-space:pre-wrap">${p.text}</p>`)}
        ${textPages.length === 0 ? html`<p style="margin:16px 0 0;font:italic 400 16px 'Spectral',serif;color:#8a7a60">(they said it all in pictures)</p>` : null}
        ${doodles.length ? html`<div style="display:flex;gap:18px;flex-wrap:wrap;margin-top:24px">
          ${doodles.map((p, j) => html`<div key=${j} style="background:#fff;padding:8px 8px 22px;box-shadow:0 6px 16px rgba(40,30,20,.25);transform:rotate(${j % 2 ? 1.6 : -1.8}deg)">
            <img src=${p.drawData} style="display:block;width:190px;background:${paperFor(p).bg}" />
            <div style="font:600 13px 'Caveat',cursive;color:#8a7a60;text-align:center;margin-top:4px">a doodle, by hand</div>
          </div>`)}
        </div>` : null}
        <div style="margin-top:26px;text-align:right;font-family:${signFont.css};font-size:calc(${signFont.size} + 2px);color:#5e1620">XO, ${letter.from || 'a friend'}</div>
        ${letter.sample ? html`<div style="margin-top:18px;font:400 12px 'Spectral',serif;color:#8a7a60;text-align:center">sample letter — seal a real one from the <a href="./index.html" style="color:#8a4a30">main page</a></div>` : null}
      </div>

      ${letter.attachment ? html`<div style="position:absolute;right:-18px;top:90px;z-index:3;transform:rotate(4deg);background:#fff;padding:9px 9px 30px;box-shadow:0 14px 30px rgba(0,0,0,.45);width:150px">
        <img src=${letter.attachment} style="display:block;width:100%;height:150px;object-fit:cover" />
        <div style="font:600 15px 'Caveat',cursive;color:#5c5346;text-align:center;margin-top:6px">from ${letter.from || 'a friend'}'s cam!</div>
      </div>` : null}
    </article>`;
  }

  render() {
    if (!this.state.token) {
      return html`<${LoginScreen} onLogin=${this.handleLogin} />`;
    }

    const letters = this.state.letters;
    const now = new Date();
    const search = typeof location !== 'undefined' ? location.search : '';
    const unlocked = !this.state.locked || new URLSearchParams(search).has('open');
    const days = Math.max(0, Math.round((gradDate - now) / 86400000));
    const openedCountLabel = letters.length === 1 ? 'letter was' : 'letters were';
    const sealedCountLabel = letters.length === 1 ? 'letter is' : 'letters are';
    
    if (this.state.loading) {
      return html`<div style="font-family:'Spectral',serif;color:#c2aa80;background:#28090f;min-height:100vh;display:flex;align-items:center;justify-content:center">Loading...</div>`;
    }

    return html`
<div style="font-family:'Spectral',serif;color:#c2aa80;background:#28090f;min-height:100vh;overflow-x:hidden;position:relative">
  <div style="position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(120% 100% at 50% 22%,#3a1017 0%,#280a10 62%,#1e070b 100%)"></div>
  <div style="position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.5;background:radial-gradient(60% 45% at 78% 12%,rgba(207,161,92,.14),transparent 70%)"></div>

  <div style="position:relative;z-index:1;display:flex;justify-content:space-between;align-items:center;padding:18px 30px">
    <div style="display:flex;align-items:center;gap:20px">
      <a href="./index.html" style="display:flex;align-items:center;gap:10px;color:#ead2a2;font:400 13px 'Spectral',serif">
        <svg width="30" height="24" viewBox="0 0 40 32" fill="none" stroke="#cfa15c" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12 L20 5 L36 12 L20 19 Z"></path><path d="M11 15.5 v6 q0 3.5 9 3.5 t9 -3.5 v-6"></path><path d="M36 12 v8"></path><circle cx="36" cy="22.5" r="1.8"></circle><path d="M20 19 v2.5"></path></svg>
        ← back to the story
      </a>
      <a href="#" onClick=${this.handleLogout} style="color:#a88f66;font:400 13px 'Spectral',serif;opacity:0.8;transition:opacity 0.2s;text-decoration:none" onMouseOver=${e=>e.target.style.opacity=1} onMouseOut=${e=>e.target.style.opacity=0.8}>sign out</a>
    </div>
    <div style="font:400 13px 'Spectral',serif;color:#c2aa80">${unlocked ? html`unlocked · <b style="color:#cfa15c;font-weight:500">${gradLabel}</b>` : html`unlocks in <b style="color:#cfa15c;font-weight:500">${days} days</b>`}</div>
  </div>

  ${unlocked ? html`
  <div style="position:relative;z-index:1;max-width:900px;margin:0 auto;padding:50px 30px 80px">
    <div style="text-align:center;margin-bottom:80px;animation:fadeUp .7s ease both">
      <div style="font:500 15px 'Spectral',serif;letter-spacing:3.5px;color:#cfa15c">THE SECOND HALF IS DONE TOO</div>
      <h1 style="margin:18px 0 0;font:400 76px/1.02 'Newsreader',serif;letter-spacing:-1.5px;color:#ead2a2">You made it, Menna.<br /><span style="font-style:italic;font-weight:500;color:#cfa15c">Now read what they knew all along.</span></h1>
      <p style="margin:26px auto 0;max-width:520px;font:400 19px/1.7 'Spectral',serif;color:#c2aa80">${letters.length} ${openedCountLabel} sealed for this exact moment — written by the people of two years ago, for the graduate of today.</p>
    </div>
    ${letters.map((l, i) => this.renderOpenedLetter(l, i))}
  </div>` : html`
  <div style="position:relative;z-index:1;max-width:960px;margin:0 auto;padding:60px 30px 100px;text-align:center">
    <div style="animation:fadeUp .7s ease both">
      <div style="font:500 15px 'Spectral',serif;letter-spacing:3.5px;color:#cfa15c">FOR Menna — AND ONLY FUTURE Menna</div>
      <h1 style="margin:18px 0 0;font:400 80px/1.02 'Newsreader',serif;letter-spacing:-1.6px;color:#ead2a2">Not yet.<br /><span style="font-style:italic;font-weight:500;color:#cfa15c">Good things stay sealed.</span></h1>
      <p style="margin:26px auto 0;max-width:500px;font:400 19px/1.7 'Spectral',serif;color:#c2aa80">${letters.length} ${sealedCountLabel} waiting for you here. They open the day you graduate — <b style="color:#cfa15c;font-weight:500">${gradLabel}</b>, in about <b style="color:#cfa15c;font-weight:500">${days} days</b>. Even you can't peek.</p>
    </div>
    <div style="display:flex;gap:44px;flex-wrap:wrap;justify-content:center;margin-top:90px">
      ${letters.map((l, i) => this.renderSealedEnvelope(l, i))}
    </div>
    <p style="margin:90px 0 0;font:400 13px 'Spectral',serif;color:#a88f66">come back on graduation day · the wax knows the date</p>
  </div>`}
</div>`;
  }
}

export { ReceiverPage };

if (typeof document !== 'undefined') {
  const mount = document.getElementById('letters');
  if (mount) render(h(ReceiverPage, null), mount);
}
