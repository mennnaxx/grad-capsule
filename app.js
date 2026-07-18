/** Friend's Message Site — standalone implementation of the Claude Design file "Friend's Message Site.dc.html" (Preact + htm, no build step). */
import { h, Component, createRef, render } from 'https://esm.sh/preact@10.24.3';
import htm from 'https://esm.sh/htm@3.1.1';

const BACKEND_URL = window.BACKEND_URL || '';

const html = htm.bind(h);

const gradDate = new Date('2028-06-15T00:00:00');
const gradLabel = 'June 2028';

const envelopes = [
  {
    name: 'Kraft Air Mail', paper: '#efe7d3', ink: '#5a4a32', seal: '#8a5a3a',
    stripe: 'repeating-linear-gradient(45deg,#b39b6e 0 12px,#efe7d3 12px 24px)'
  },
  {
    name: 'Classic Air Mail', paper: '#f3ede1', ink: '#2c3e70', seal: '#c0392b',
    stripe: 'repeating-linear-gradient(45deg,#c0392b 0 10px,#f3ede1 10px 20px,#2c3e70 20px 30px,#f3ede1 30px 40px)'
  },
  {
    name: 'Burgundy Air Mail', paper: '#f0e7d5', ink: '#5e1620', seal: '#7a1e2a',
    stripe: 'repeating-linear-gradient(45deg,#7a1e2a 0 12px,#e8dcc0 12px 24px)'
  }
];
const papers = [
  { name: 'lined', bg: 'repeating-linear-gradient(#fbf4e4,#fbf4e4 27px,rgba(120,90,50,.18) 28px)' },
  { name: 'ivory', bg: '#f6efdd' },
  { name: 'dotted', bg: 'radial-gradient(rgba(120,90,50,.22) 1.3px,transparent 1.3px) 0 0/18px 18px, #faf3e2' },
  { name: 'aged', bg: 'radial-gradient(120% 120% at 50% 0%,#f3e7c8,#e7d4ab)' }
];
const inks = ['#3a2e28', '#5e1620', '#cfa15c', '#2f5d50', '#3a4a7a'];
const stamps = [
  { name: 'Songbird', cents: '28', color: '#7a5230', motif: 'bird' },
  { name: 'Wings', cents: '25', color: '#5f7a92', motif: 'butterfly' },
  { name: 'Daisies', cents: '28', color: '#b07d3a', motif: 'daisy' },
  { name: 'Wild Fern', cents: '10', color: '#556b5a', motif: 'fern' },
  { name: 'Bloom', cents: '30', color: '#7a2e35', motif: 'tulip' },
  { name: 'Lavender', cents: '20', color: '#4f5d6b', motif: 'wheat' }
];
const fonts = [
  { name: 'Serif', css: "'Newsreader', serif", size: '18px' },
  { name: 'Handwriting', css: "'Kalam', cursive", size: '18px' },
  { name: 'Cursive', css: "'Dancing Script', cursive", size: '24px' },
  { name: 'Casual', css: "'Caveat', cursive", size: '24px' },
  { name: 'Marker', css: "'Gochi Hand', cursive", size: '20px' },
  { name: 'Typewriter', css: "'Spectral', serif", size: '17px' }
];

/** Hand-drawn line doodles — single beige stroke, no fills. */
const beige = '#cfa15c';
const dwrap = (width, height, viewBox, children) =>
  h('svg', { width, height, viewBox, fill: 'none', stroke: beige, 'stroke-width': 2.4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, children);

const doodleCap = dwrap(92, 78, '0 0 92 78', [
  h('path', { key: 'm', d: 'M8 30 L46 15 L84 30 L46 45 Z' }),
  h('path', { key: 'u', d: 'M28 38 v14 q0 7 18 7 t18 -7 v-14' }),
  h('path', { key: 't', d: 'M84 30 v20' }),
  h('circle', { key: 'te', cx: 84, cy: 53, r: 3.4 }),
  h('path', { key: 'k', d: 'M46 45 v6' })
]);
const doodleBook = dwrap(90, 72, '0 0 90 72', [
  h('path', { key: 'sp', d: 'M45 16 v46' }),
  h('path', { key: 'l', d: 'M45 16 C34 9 18 9 8 13 L8 55 C18 51 34 51 45 58' }),
  h('path', { key: 'r', d: 'M45 16 C56 9 72 9 82 13 L82 55 C72 51 56 51 45 58' }),
  h('path', { key: 'ln', d: 'M16 24 h20M16 31 h16M54 24 h20M54 31 h16', 'stroke-width': 1.5 })
]);
const doodlePlane = dwrap(96, 74, '0 0 96 74', [
  h('path', { key: 'p', d: 'M8 30 L88 8 L54 64 L44 42 Z' }),
  h('path', { key: 'f', d: 'M88 8 L44 42' }),
  h('path', { key: 'tr', d: 'M42 46 q-16 5 -22 22', 'stroke-dasharray': '1 7' })
]);
const doodleStar = dwrap(42, 42, '0 0 44 44', [
  h('path', { key: 's', d: 'M22 4 L27 17 L41 18 L30 27 L34 40 L22 32 L10 40 L14 27 L3 18 L17 17 Z' })
]);
const doodleSparkle = dwrap(64, 60, '0 0 64 60', [
  h('path', { key: 's1', d: 'M22 6 C24 17 29 22 40 24 C29 26 24 31 22 42 C20 31 15 26 4 24 C15 22 20 17 22 6 Z' }),
  h('path', { key: 's2', d: 'M49 32 C50 39 53 42 60 43 C53 44 50 47 49 54 C48 47 45 44 38 43 C45 42 48 39 49 32 Z' })
]);
const doodleBalloon = dwrap(70, 104, '0 0 70 104', [
  h('ellipse', { key: 'b1', cx: 24, cy: 25, rx: 17, ry: 20 }),
  h('ellipse', { key: 'b2', cx: 49, cy: 36, rx: 13, ry: 16 }),
  h('path', { key: 'hl1', d: 'M13 15 q-4 6 -2 14', 'stroke-width': 1.5 }),
  h('path', { key: 'hl2', d: 'M41 28 q-3 4 -2 10', 'stroke-width': 1.5 }),
  h('path', { key: 'k1', d: 'M24 45 l-3 5 h6 z' }),
  h('path', { key: 'k2', d: 'M49 52 l-2.5 4.5 h5 z' }),
  h('path', { key: 's1', d: 'M24 50 C20 66 34 76 28 98', 'stroke-width': 1.5 }),
  h('path', { key: 's2', d: 'M49 57 C53 70 41 80 45 100', 'stroke-width': 1.5 })
]);
const doodleHeart = dwrap(60, 56, '0 0 60 56', [
  h('path', { key: 'h', d: 'M30 50 C9 37 4 17 16 10 C24 5.5 30 12 30 19 C30 12 36 5.5 44 10 C56 17 51 37 30 50 Z' }),
  h('path', { key: 'hl', d: 'M13 17 q1.5 -6 8 -8', 'stroke-width': 1.5 }),
  h('path', { key: 'sp', d: 'M52 7 l4 -4 M55 14 h5', 'stroke-width': 1.6 })
]);
const doodleEnvelope = dwrap(90, 66, '0 0 90 66', [
  h('path', { key: 'r', d: 'M8 14 h74 v40 h-74 Z' }),
  h('path', { key: 'fl', d: 'M8 14 L45 40 L82 14' })
]);
const doodleFlower = dwrap(58, 78, '0 0 58 78', [
  h('path', { key: 'st', d: 'M29 74 v-30' }),
  h('path', { key: 'lf', d: 'M29 60 q-14 -3 -18 -15 q14 1 18 15', 'stroke-width': 1.8 }),
  h('circle', { key: 'c', cx: 29, cy: 30, r: 6 }),
  h('path', { key: 'pt', d: 'M29 24 q8 -14 0 -20 q-8 6 0 20' }),
  h('path', { key: 'pt2', d: 'M35 30 q14 -6 20 0 q-6 8 -20 0' }),
  h('path', { key: 'pt3', d: 'M23 30 q-14 -6 -20 0 q6 8 20 0' }),
  h('path', { key: 'pt4', d: 'M29 36 q8 12 0 18 q-8 -6 0 -18' })
]);
const doodleKey = dwrap(84, 50, '0 0 84 50', [
  h('circle', { key: 'h', cx: 17, cy: 25, r: 14 }),
  h('circle', { key: 'hh', cx: 17, cy: 25, r: 5 }),
  h('path', { key: 'sh', d: 'M31 25 H72' }),
  h('path', { key: 't1', d: 'M56 25 v11' }),
  h('path', { key: 't2', d: 'M66 25 v8' }),
  h('path', { key: 't3', d: 'M72 25 v11' })
]);
const doodleCloud = dwrap(90, 56, '0 0 90 56', [
  h('path', { key: 'c', d: 'M20 40 Q10 40 10 30 Q10 20 20 20 Q22 8 38 8 Q54 8 56 20 Q70 18 74 30 Q78 42 64 42 Z' })
]);
const doodleRibbon = dwrap(84, 58, '0 0 84 58', [
  h('path', { key: 'll', d: 'M40 26 C36 12 18 8 8 16 C0 24 6 34 20 32 C30 30 37 28 40 26 Z' }),
  h('path', { key: 'rl', d: 'M40 26 C44 12 62 8 72 16 C80 24 74 34 60 32 C50 30 43 28 40 26 Z' }),
  h('circle', { key: 'kn', cx: 40, cy: 27, r: 5 }),
  h('path', { key: 't1', d: 'M37 31 L32 50 L40 44' }),
  h('path', { key: 't2', d: 'M43 31 L48 50 L40 44' })
]);


/** Line art for one postage-stamp motif, drawn in cream on the stamp's plate colour. */
function stampMotif(kind, plateColor) {
  const cream = '#f4eede';
  if (kind === 'butterfly') return [
    h('ellipse', { key: 1, cx: 50, cy: 58, rx: 2.6, ry: 18, fill: cream }),
    h('ellipse', { key: 2, cx: 35, cy: 46, rx: 15, ry: 13, fill: cream }),
    h('ellipse', { key: 3, cx: 65, cy: 46, rx: 15, ry: 13, fill: cream }),
    h('ellipse', { key: 4, cx: 39, cy: 70, rx: 11, ry: 11, fill: cream }),
    h('ellipse', { key: 5, cx: 61, cy: 70, rx: 11, ry: 11, fill: cream }),
    h('circle', { key: 6, cx: 35, cy: 46, r: 4, fill: plateColor }),
    h('circle', { key: 7, cx: 65, cy: 46, r: 4, fill: plateColor }),
    h('path', { key: 8, d: 'M50 40 L44 30 M50 40 L56 30', stroke: cream, 'stroke-width': 1.6, fill: 'none' })
  ];
  if (kind === 'bird') return [
    h('path', { key: 'br', d: 'M12 96 Q48 90 92 86', stroke: cream, 'stroke-width': 2.4, fill: 'none' }),
    h('ellipse', { key: 'b', cx: 44, cy: 56, rx: 17, ry: 12, fill: cream }),
    h('circle', { key: 'h', cx: 60, cy: 47, r: 8.5, fill: cream }),
    h('path', { key: 'bk', d: 'M68 45 l10 2 -9 4z', fill: cream }),
    h('path', { key: 't', d: 'M28 58 l-16 6 15 5z', fill: cream }),
    h('circle', { key: 'e', cx: 62, cy: 45, r: 1.7, fill: plateColor }),
    h('path', { key: 'l', d: 'M42 68 l3 12 M50 68 l4 12', stroke: cream, 'stroke-width': 1.6, fill: 'none' }),
    h('path', { key: 'wg', d: 'M34 52 q10 10 24 4', stroke: plateColor, 'stroke-width': 1.4, fill: 'none' })
  ];
  if (kind === 'daisy') {
    const petals = [];
    for (let a = 0; a < 360; a += 45) { petals.push(h('ellipse', { key: 'p' + a, cx: 50, cy: 36, rx: 4.5, ry: 11, transform: 'rotate(' + a + ' 50 47)', fill: cream })); }
    return [
      h('path', { key: 'st', d: 'M50 47 L50 96', stroke: cream, 'stroke-width': 2.2, fill: 'none' }),
      h('path', { key: 'lf', d: 'M50 72 q-13 -4 -17 -15 q13 2 17 15z', fill: cream }),
      h('path', { key: 'lf2', d: 'M50 84 q13 -4 17 -15 q-13 2 -17 15z', fill: cream }),
      ...petals,
      h('circle', { key: 'c', cx: 50, cy: 47, r: 6.5, fill: plateColor })
    ];
  }
  if (kind === 'fern') {
    const leaves = [];
    for (let i = 0; i < 6; i++) { const y = 32 + i * 11; leaves.push(h('ellipse', { key: 'lL' + i, cx: 38, cy: y, rx: 9, ry: 3.6, transform: 'rotate(-28 50 ' + y + ')', fill: cream })); leaves.push(h('ellipse', { key: 'lR' + i, cx: 62, cy: y, rx: 9, ry: 3.6, transform: 'rotate(28 50 ' + y + ')', fill: cream })); }
    return [h('path', { key: 's', d: 'M50 98 L50 24', stroke: cream, 'stroke-width': 2, fill: 'none' }), ...leaves, h('circle', { key: 'tip', cx: 50, cy: 24, r: 3, fill: cream })];
  }
  if (kind === 'tulip') return [
    h('path', { key: 's', d: 'M50 96 L50 54', stroke: cream, 'stroke-width': 2.2, fill: 'none' }),
    h('path', { key: 'lf', d: 'M50 80 q-15 -2 -19 -17 q15 0 19 17z', fill: cream }),
    h('path', { key: 'cup', d: 'M34 52 q2 -25 16 -29 q14 4 16 29 q-16 9 -32 0z', fill: cream }),
    h('path', { key: 'p1', d: 'M50 23 L50 54', stroke: plateColor, 'stroke-width': 1.4, fill: 'none' }),
    h('path', { key: 'p2', d: 'M40 27 q-2 19 6 27', stroke: plateColor, 'stroke-width': 1.2, fill: 'none' }),
    h('path', { key: 'p3', d: 'M60 27 q2 19 -6 27', stroke: plateColor, 'stroke-width': 1.2, fill: 'none' })
  ];
  /** wheat / lavender */
  const grains = [];
  for (let i = 0; i < 7; i++) { const y = 30 + i * 8; grains.push(h('ellipse', { key: 'gc' + i, cx: 50, cy: y, rx: 3.2, ry: 4.6, fill: cream })); if (i < 6) { grains.push(h('ellipse', { key: 'gl' + i, cx: 43, cy: y + 4, rx: 3, ry: 4.3, transform: 'rotate(-24 43 ' + (y + 4) + ')', fill: cream })); grains.push(h('ellipse', { key: 'gr' + i, cx: 57, cy: y + 4, rx: 3, ry: 4.3, transform: 'rotate(24 57 ' + (y + 4) + ')', fill: cream })); } }
  return [h('path', { key: 's', d: 'M50 98 L50 50', stroke: cream, 'stroke-width': 1.8, fill: 'none' }), ...grains];
}

/** A full postage stamp (white frame, coloured plate, motif, denomination, name). */
function stampArt(stamp, width, height) {
  return h('svg', { viewBox: '0 0 100 128', width, height, preserveAspectRatio: 'xMidYMid meet', style: { display: 'block' } }, [
    h('rect', { key: 'w', x: 1, y: 1, width: 98, height: 126, rx: 2, fill: '#f4eede' }),
    h('rect', { key: 'p', x: 8, y: 8, width: 84, height: 98, fill: stamp.color }),
    h('g', { key: 'm' }, stampMotif(stamp.motif, stamp.color)),
    h('text', { key: 'c', x: 13, y: 121, fill: '#3a2a1c', style: { font: "700 12px 'Newsreader',serif" } }, stamp.cents),
    h('text', { key: 'cn', x: 31, y: 121, fill: '#6a5a48', style: { font: "600 6px 'Spectral',serif", letterSpacing: '1px' } }, 'CENTS'),
    h('text', { key: 'n', x: 87, y: 121, 'text-anchor': 'end', fill: '#3a2a1c', style: { font: "italic 400 8px 'Newsreader',serif" } }, stamp.name)
  ]);
}

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

class FriendsMessageSite extends Component {
  constructor(props) {
    super(props);
    this.rootRef = createRef();
    this.heroRef = createRef();
    this.modalRef = createRef();
    this.soundDotRef = createRef();
    this.previewRef = createRef();
    this.sealRef = createRef();
    this.lockRef = createRef();
    this.rightRef = createRef();
    this.doneRef = createRef();
    this.drawCanvasRef = createRef();
    this.fileRef = createRef();

    this.state = {
      soundOn: true,
      step: 0,
      envIdx: 1,
      envTo: '', envFrom: '',
      pages: [{ type: 'text', text: '', paper: 0, font: 0 }],
      pageIdx: 0,
      inkIdx: 1,
      stampIdx: 0,
      eraseMode: false,
      attachSrc: null
    };
    this.staticMode = false; this.hasScrolled = false;
    this.drawing = false; this.last = null;
    this.soundEnabled = true;
    this.audio = new Audio('./audio/to the same heights.mp3');
    this.audio.loop = true;
    this.audio.volume = 0.2;
  }

  componentDidMount() {
    this._unlockAudio = () => {
      if (this.soundEnabled && this.audio && this.audio.paused) {
        this.audio.play().catch(e => { });
      }
      if (this.audio && !this.audio.paused) {
        window.removeEventListener('pointerdown', this._unlockAudio);
        window.removeEventListener('touchstart', this._unlockAudio);
        window.removeEventListener('keydown', this._unlockAudio);
      }
    };
    window.addEventListener('pointerdown', this._unlockAudio, { passive: true });
    window.addEventListener('touchstart', this._unlockAudio, { passive: true });
    window.addEventListener('keydown', this._unlockAudio, { passive: true });

    this._onScroll = () => {
      this.hasScrolled = true;
      if (this.staticMode) {
        this.staticMode = false;
        const root = this.rootRef.current;
        if (root) root.querySelectorAll('.js-reveal').forEach(el => { el.__phase = null; });
      }
    };
    window.addEventListener('scroll', this._onScroll, { passive: true });
    this._loop = this.loop.bind(this);
    this.raf = requestAnimationFrame(this._loop);
    /** Fallback: if nothing ever scrolls, don't leave content hidden. */
    this._fallback = setTimeout(() => { if (!this.hasScrolled) this.staticMode = true; }, 1600);

    if (this.soundEnabled) {
      this.audio.play().catch(e => console.log('Autoplay blocked', e));
    }
  }
  componentDidUpdate() { this.updateReveal(); this.syncCanvas(); }
  componentWillUnmount() {
    cancelAnimationFrame(this.raf);
    clearTimeout(this._fallback);
    window.removeEventListener('scroll', this._onScroll);
    window.removeEventListener('pointerdown', this._unlockAudio);
    window.removeEventListener('touchstart', this._unlockAudio);
    window.removeEventListener('keydown', this._unlockAudio);
  }

  loop() {
    this.updateReveal();
    this.raf = requestAnimationFrame(this._loop);
  }

  /** Fixed background + content that drifts toward center and transitions both ways. */
  updateReveal() {
    const root = this.rootRef.current; if (!root) return;
    const els = root.querySelectorAll('.js-reveal');
    const vh = window.innerHeight;
    if (this.staticMode) {
      els.forEach(el => { el.style.transition = 'opacity .5s ease,transform .5s ease'; el.style.opacity = '1'; el.style.transform = 'none'; el.__phase = 'active'; });
      return;
    }
    els.forEach(el => {
      const r = el.getBoundingClientRect();
      /** Element center as a fraction of the viewport (0..1) decides its phase: below | active | above. */
      const c = (r.top + r.height / 2) / vh;
      let phase;
      if (c > 0.86) phase = 'below';
      else if (c < 0.16) phase = 'above';
      else phase = 'active';
      /** Only animate on phase change — the CSS transition does the easing. */
      if (el.__phase === phase) return;
      el.__phase = phase;
      el.style.transition = 'opacity .7s cubic-bezier(.22,.61,.36,1),transform .7s cubic-bezier(.22,.61,.36,1)';
      if (phase === 'active') { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }
      else if (phase === 'below') { el.style.opacity = '0'; el.style.transform = 'translateY(60px)'; }
      else { el.style.opacity = '0'; el.style.transform = 'translateY(-60px)'; }
    });
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    this.setState({ soundOn: this.soundEnabled });
    const dot = this.soundDotRef.current;
    if (dot) dot.style.background = this.soundEnabled ? '#cfa15c' : '#6e5a44';
    try {
      if (this.soundEnabled) {
        this.audio.play().catch(e => console.log('Autoplay blocked', e));
      } else {
        this.audio.pause();
      }
    } catch (e) { }
  }

  clearCanvas() { const c = this.drawCanvasRef.current; if (c) c.getContext('2d').clearRect(0, 0, c.width, c.height); this._canvasKey = null; }
  openCompose() { const m = this.modalRef.current; if (m) m.style.display = 'flex'; this.clearCanvas(); }
  closeCompose() {
    const m = this.modalRef.current; if (m) m.style.display = 'none';
    /** Reset for next time. */
    const d = this.doneRef.current; if (d) d.style.display = 'none';
    const r = this.rightRef.current; if (r) r.style.display = 'block';
    const pv = this.previewRef.current; if (pv) { pv.style.animation = ''; pv.style.opacity = '1'; }
    const sl = this.sealRef.current; if (sl) sl.style.display = 'none';
    const lk = this.lockRef.current; if (lk) lk.style.display = 'none';
    this.clearCanvas();
    this.setState({ step: 0, envIdx: 1, envTo: '', envFrom: '', pages: [{ type: 'text', text: '', paper: 0, font: 0 }], pageIdx: 0, inkIdx: 1, stampIdx: 0, eraseMode: false, attachSrc: null, previewing: false });
  }

  setStamp(i) { this.setState({ stampIdx: i }); }
  setPen() { this.setState({ eraseMode: false }); }
  setEraser() { this.setState({ eraseMode: true }); }

  setEnv(i) { this.setState({ envIdx: i }); }
  setEnvTo(e) { this.setState({ envTo: e.target.value }); }
  setEnvFrom(e) { this.setState({ envFrom: e.target.value }); }

  setPaper(i) { const p = this.state.pages.slice(); p[this.state.pageIdx] = { ...p[this.state.pageIdx], paper: i }; this.setState({ pages: p }); }
  setFont(i) { const p = this.state.pages.slice(); p[this.state.pageIdx] = { ...p[this.state.pageIdx], font: i }; this.setState({ pages: p }); }
  setPageText(e) { const p = this.state.pages.slice(); p[this.state.pageIdx] = { ...p[this.state.pageIdx], text: e.target.value }; this.setState({ pages: p }); }
  addPage() { const p = this.state.pages.slice(); p.push({ type: 'text', text: '', paper: this.state.pages[this.state.pageIdx].paper, font: 0 }); this.setState({ pages: p, pageIdx: p.length - 1 }); }
  addDoodle() { const p = this.state.pages.slice(); p.push({ type: 'draw', paper: 0, drawData: null }); this.setState({ pages: p, pageIdx: p.length - 1 }); }
  prevPage() { this.saveDoodle(); this.setState({ pageIdx: Math.max(0, this.state.pageIdx - 1) }); }
  nextPageSheet() { this.saveDoodle(); this.setState({ pageIdx: Math.min(this.state.pages.length - 1, this.state.pageIdx + 1) }); }

  /** Persist the current doodle canvas into its page (mutating, no re-render) so it can be restored on page change. */
  saveDoodle() {
    const c = this.drawCanvasRef.current, pg = this.state.pages[this.state.pageIdx];
    if (!c || !pg || pg.type !== 'draw') return;
    const p = this.state.pages.slice(); p[this.state.pageIdx] = { ...pg, drawData: c.toDataURL('image/png') }; this.state.pages = p;
  }
  syncCanvas() {
    const c = this.drawCanvasRef.current; if (!c) return;
    const pg = this.state.pages[this.state.pageIdx];
    const key = this.state.pageIdx + '|' + (pg && pg.type);
    if (this._canvasKey === key) return;
    this._canvasKey = key;
    if (!pg || pg.type !== 'draw') return;
    const ctx = c.getContext('2d'); ctx.clearRect(0, 0, c.width, c.height);
    if (pg.drawData) { const img = new Image(); img.onload = () => ctx.drawImage(img, 0, 0, c.width, c.height); img.src = pg.drawData; }
  }

  setInk(i) { this.setState({ inkIdx: i }); }
  drawStart(e) {
    const c = this.drawCanvasRef.current; if (!c) return;
    this.drawing = true; const r = c.getBoundingClientRect();
    this.last = { x: (e.clientX - r.left) * (c.width / r.width), y: (e.clientY - r.top) * (c.height / r.height) };
    try { c.setPointerCapture(e.pointerId); } catch (_) { }
  }
  drawMove(e) {
    if (!this.drawing) return;
    const c = this.drawCanvasRef.current; if (!c) return;
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) * (c.width / r.width), y = (e.clientY - r.top) * (c.height / r.height);
    const ctx = c.getContext('2d');
    if (this.state.eraseMode) {
      ctx.globalCompositeOperation = 'destination-out'; ctx.lineWidth = 20;
    } else {
      ctx.globalCompositeOperation = 'source-over'; ctx.strokeStyle = inks[this.state.inkIdx]; ctx.lineWidth = 2.6;
    }
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(this.last.x, this.last.y); ctx.lineTo(x, y); ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';
    this.last = { x, y };
  }
  drawEnd() { if (this.drawing) { this.drawing = false; this.last = null; this.saveDoodle(); } }
  clearDraw() { const c = this.drawCanvasRef.current; if (c) { c.getContext('2d').clearRect(0, 0, c.width, c.height); } this.saveDoodle(); }

  pickFile() { const f = this.fileRef.current; if (f) f.click(); }
  onFile(e) {
    const file = e.target.files && e.target.files[0]; if (!file) return;
    const rd = new FileReader(); rd.onload = () => this.setState({ attachSrc: rd.result }); rd.readAsDataURL(file);
  }
  removeAttach() { this.setState({ attachSrc: null }); if (this.fileRef.current) this.fileRef.current.value = ''; }

  next() { this.saveDoodle(); this.setState({ step: Math.min(3, this.state.step + 1) }); }
  back() { this.saveDoodle(); this.setState({ step: Math.max(0, this.state.step - 1) }); }

  /** A static page can't hold+release mail on its own. Point the fetch below at a server that stores the letter and only delivers it to the owner after unlockAt: POST /api/letters { envelope, stamp, to, from, letters, attachment, unlockAt }. The request failing is fine — the front-end animation runs regardless. */
  async seal() {
    this.saveDoodle();
    this.setState({ loading: true });
    try {
      const payload = {
        envelope: envelopes[this.state.envIdx].name,
        stamp: stamps[this.state.stampIdx].name,
        to: this.state.envTo || 'Menna', from: this.state.envFrom || 'a friend',
        letters: this.state.pages,
        attachment: this.state.attachSrc || null,
        unlockAt: '2028-06-15',
        sealedAt: new Date().toISOString().slice(0, 10)
      };
      const res = await fetch(`${BACKEND_URL}/api/letters`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error('Failed to seal letter');

      try {
        const stored = JSON.parse(localStorage.getItem('sealedLetters') || '[]');
        stored.push(payload);
        localStorage.setItem('sealedLetters', JSON.stringify(stored));
      } catch (_) { }
    } catch (err) {
      console.error(err);
      // Continue with the animation even if saving failed to avoid blocking the user experience entirely
    }
    this.setState({ loading: false });

    /** Seal the closed envelope, lock it, then fly away. */
    const sl = this.sealRef.current, lk = this.lockRef.current, pv = this.previewRef.current;
    if (sl) { sl.style.display = 'flex'; sl.style.animation = 'sealDrop .7s cubic-bezier(.3,1.4,.5,1) forwards'; }
    setTimeout(() => { if (lk) { lk.style.display = 'block'; lk.style.animation = 'lockClick .5s cubic-bezier(.3,1.5,.5,1) forwards'; } }, 640);
    setTimeout(() => { if (pv) pv.style.animation = 'flyAway 1.15s cubic-bezier(.5,0,.7,.3) forwards'; }, 1250);
    setTimeout(() => {
      const r = this.rightRef.current; if (r) r.style.display = 'none';
      const d = this.doneRef.current; if (d) d.style.display = 'flex';
    }, 2750);
  }

  render() {
    const s = this.state;
    const days = Math.max(0, Math.round((gradDate - new Date()) / 86400000));
    const soundLabel = s.soundOn ? 'sound on' : 'sound off';
    const env = envelopes[s.envIdx], page = s.pages[s.pageIdx];
    const isDraw = page.type === 'draw';
    const stepNames = ['Choose your envelope', 'Write your letter', 'Add a photo', 'Seal it shut'];
    const doodleCount = s.pages.filter(p => p.type === 'draw').length;
    const textCount = s.pages.length - doodleCount;
    const toLine = s.envTo || 'Menna';
    const fromLine = 'from ' + (s.envFrom || 'a friend');
    const pageFont = fonts[page.font || 0].css, pageFontSize = fonts[page.font || 0].size;
    const paperBg = papers[page.paper].bg;
    const sheetCount = (textCount + (textCount === 1 ? ' page' : ' pages')) + (doodleCount ? ' + ' + doodleCount + ' doodle' + (doodleCount > 1 ? 's' : '') : '');

    const envChips = envelopes.map((e, i) => h('div', {
      key: i, className: 'stud-chip', onClick: () => this.setEnv(i),
      style: { flex: 1, cursor: 'pointer', borderRadius: 8, padding: 8, border: '2px solid ' + (i === s.envIdx ? '#5e1620' : 'transparent'), background: i === s.envIdx ? 'rgba(94,22,32,.06)' : 'transparent' }
    }, [
      h('div', { key: 'sw', style: { height: 44, borderRadius: 5, background: e.stripe, padding: 4, boxSizing: 'border-box' } },
        h('div', { key: 'p', style: { width: '100%', height: '100%', background: e.paper, borderRadius: 2 } })),
      h('div', { key: 'n', style: { font: "400 11px 'Spectral',serif", color: '#5c5346', marginTop: 6, textAlign: 'center' } }, e.name)
    ]));

    const paperChips = papers.map((p, i) => h('div', {
      key: i, className: 'stud-chip', onClick: () => this.setPaper(i), title: p.name,
      style: { width: 44, height: 44, borderRadius: 6, cursor: 'pointer', background: p.bg, backgroundSize: p.bg.includes('/') ? undefined : 'cover', border: '2px solid ' + (i === page.paper ? '#5e1620' : 'rgba(46,42,36,.2)') }
    }));

    const inkChips = inks.map((c, i) => h('div', {
      key: i, className: 'stud-chip', onClick: () => this.setInk(i),
      style: { width: 26, height: 26, borderRadius: '50%', cursor: 'pointer', background: c, boxShadow: (!s.eraseMode && i === s.inkIdx) ? '0 0 0 2px #fff,0 0 0 4px ' + c : 'none' }
    }));

    const fontChips = fonts.map((f, i) => h('div', {
      key: i, className: 'stud-chip', onClick: () => this.setFont(i),
      style: {
        cursor: 'pointer', padding: '6px 12px', borderRadius: 6, fontFamily: f.css, fontSize: 16, color: '#2e2a24',
        border: '2px solid ' + ((!isDraw && page.font === i) ? '#5e1620' : 'rgba(46,42,36,.2)'), background: (!isDraw && page.font === i) ? 'rgba(94,22,32,.06)' : '#fff'
      }
    }, f.name));

    const stampChips = stamps.map((st, i) => h('div', {
      key: i, className: 'stud-chip', onClick: () => this.setStamp(i),
      style: {
        width: 46, height: 58, borderRadius: 3, cursor: 'pointer', overflow: 'hidden',
        boxShadow: i === s.stampIdx ? '0 0 0 2px #5e1620,0 2px 6px rgba(0,0,0,.2)' : '0 1px 4px rgba(0,0,0,.22)'
      }
    }, stampArt(st, '100%', '100%')));

    const stepDots = stepNames.map((_, i) => h('div', { key: i, style: { width: i === s.step ? 18 : 7, height: 7, borderRadius: 4, background: i === s.step ? '#5e1620' : (i < s.step ? '#c9a15c' : 'rgba(46,42,36,.2)'), transition: 'all .25s ease' } }));

    const show = (b) => b ? 'block' : 'none';
    const dEnv = show(s.step === 0), dLetter = show(s.step === 1), dAttach = show(s.step === 2), dReview = show(s.step === 3);
    const dTextCtl = show(!isDraw), dDrawCtl = show(isDraw), dTextArea = show(!isDraw), dDrawArea = show(isDraw);
    const dEnvPrev = s.step === 1 ? 'none' : 'flex', dPagePrev = s.step === 1 ? 'flex' : 'none';
    const previewCaption = s.step === 1 ? (isDraw ? 'doodle preview' : 'page preview') : 'live preview';
    const penBorder = s.eraseMode ? 'rgba(46,42,36,.2)' : '#5e1620', penBg = s.eraseMode ? '#fff' : 'rgba(94,22,32,.08)';
    const eraserBorder = s.eraseMode ? '#5e1620' : 'rgba(46,42,36,.2)', eraserBg = s.eraseMode ? 'rgba(94,22,32,.08)' : '#fff';
    const nextLabel = ['Next', 'Next', 'Review'][s.step] || 'Next';

    return html`
<div ref=${this.rootRef} style="font-family:'Spectral',serif;color:#c2aa80;background:#28090f;overflow-x:hidden;position:relative">

  <div style="position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(120% 100% at 50% 22%,#3a1017 0%,#280a10 62%,#1e070b 100%)"></div>
  <div style="position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.5;background:radial-gradient(60% 45% at 78% 12%,rgba(207,161,92,.14),transparent 70%)"></div>

  <div style="position:absolute;top:0;right:0;width:min(52%,720px);height:100vh;z-index:100;pointer-events:none">
    <lanyard-card branded back-image="./images/card.jpg" position="[0,0,20]" gravity="[0,-40,0]" fov="20" style="width:100%;height:100%;pointer-events:auto;touch-action:none;display:block"></lanyard-card>
  </div>

  <div style="position:fixed;top:0;left:0;right:0;z-index:110;display:flex;justify-content:space-between;align-items:center;padding:18px 30px;pointer-events:none">
    <div style="display:flex;align-items:center;gap:9px;pointer-events:auto;color:#ead2a2">
      <svg width="30" height="24" viewBox="0 0 40 32" fill="none" stroke="#cfa15c" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12 L20 5 L36 12 L20 19 Z"></path><path d="M11 15.5 v6 q0 3.5 9 3.5 t9 -3.5 v-6"></path><path d="M36 12 v8"></path><circle cx="36" cy="22.5" r="1.8"></circle><path d="M20 19 v2.5"></path></svg>
    </div>
    <div style="display:flex;align-items:center;gap:18px;pointer-events:auto">
      <div style="font:400 13px 'Spectral',serif;color:#c2aa80;letter-spacing:.3px">unlocks in <b style="color:#cfa15c;font-weight:500">${days} days</b></div>
      <button onClick=${() => this.toggleSound()} style="border:1px solid rgba(207,161,92,.4);background:rgba(207,161,92,.10);color:#ead2a2;font:400 12.5px 'Spectral',serif;letter-spacing:.4px;padding:7px 13px;border-radius:20px;cursor:pointer;display:flex;align-items:center;gap:7px">
        <span ref=${this.soundDotRef} style="width:7px;height:7px;border-radius:50%;background:${s.soundOn ? '#cfa15c' : '#6e5a44'};display:inline-block"></span>${soundLabel}
      </button>
    </div>
  </div>

  <section ref=${this.heroRef} style="position:relative;z-index:1;min-height:100vh;overflow:hidden;display:flex;align-items:center">

    <div style="position:absolute;left:50%;bottom:34px;transform:translateX(-50%);z-index:8;text-align:center;animation:cue 2.4s ease-in-out infinite">
      <div style="font:400 12px 'Spectral',serif;letter-spacing:2px;color:#b29873">SCROLL</div>
      <div style="font-size:18px;color:#cfa15c;margin-top:2px">↓</div>
    </div>

    <div style="position:relative;z-index:0;max-width:1100px;margin:0 auto;padding:0 40px;width:100%;pointer-events:none">
      <div style="max-width:760px">
        <div class="js-reveal" style="opacity:0;font:500 15px 'Spectral',serif;letter-spacing:3.5px;color:#cfa15c;margin-bottom:26px">A NOTE FOR MY FRIENDS</div>
        <h1 class="js-reveal" style="opacity:0;margin:0;font:400 132px/.94 'Newsreader',serif;letter-spacing:-2.5px;color:#ead2a2"><span style="position:relative;display:inline-block"><span style="position:absolute;left:-0.30em;top:-0.32em;transform:rotate(-8deg);transform-origin:bottom right;width:0.6em;height:0.6em;pointer-events:none"></span>T</span>he first half<br /><span style="font-style:italic;font-weight:500;color:#cfa15c">is done.</span></h1>
        <p class="js-reveal" style="opacity:0;margin:38px 0 0;max-width:500px;font:400 22px/1.65 'Spectral',serif;color:#c2aa80">Two years of this degree behind me, and somehow you guys survived my endless yapping about it. This one’s for you.</p>
      </div>
    </div>

    <div class="js-reveal" style="opacity:0;position:absolute;left:6%;bottom:6%;z-index:8;animation:bob 5s ease-in-out infinite">${doodleEnvelope}</div>
    <div class="js-reveal" style="opacity:0;position:absolute;right:20%;top:5%;z-index:6;animation:floaty 6s ease-in-out infinite">${doodleStar}</div>

  </section>

  <section style="position:relative;z-index:1;min-height:100vh;display:flex;align-items:center">
    <div class="js-reveal" style="opacity:0;position:absolute;right:7%;top:16%;animation:floaty 5s ease-in-out infinite">${doodleCap}</div>
    <div class="js-reveal" style="opacity:0;position:absolute;left:5%;bottom:14%;animation:bob 6s ease-in-out infinite">${doodleBook}</div>
    <div class="js-reveal" style="opacity:0;position:absolute;right:10%;bottom:16%;animation:floaty 4.6s ease-in-out infinite">${doodleHeart}</div>
    <div style="max-width:1200px;margin:0 auto;padding:120px 40px;width:100%">
      <h2 class="js-reveal" style="opacity:0;margin:0 0 8px;font:400 84px/1.02 'Newsreader',serif;letter-spacing:-1.6px;color:#ead2a2">It was never<br /><span style="font-style:italic;font-weight:500;color:#cfa15c">just me.</span></h2>
      <div style="margin-top:50px;display:flex;flex-direction:column;gap:2px">
        <div class="js-reveal" style="opacity:0;padding:26px 0;border-top:1px solid rgba(207,161,92,.28);display:flex;gap:30px;align-items:baseline"><span style="font:500 18px 'Spectral',serif;color:#cfa15c;flex:none;width:40px">01</span><span style="font:500 34px/1.35 'Newsreader',serif;color:#e6d4ab">Matching my energy whether I’m completely hyped or just dead inside.</span></div>
        <div class="js-reveal" style="opacity:0;padding:26px 0;border-top:1px solid rgba(207,161,92,.28);display:flex;gap:30px;align-items:baseline"><span style="font:500 18px 'Spectral',serif;color:#cfa15c;flex:none;width:40px">02</span><span style="font:500 34px/1.35 'Newsreader',serif;color:#e6d4ab">Tuning into my 10-minute voice notes like they’re a top-chart podcast.</span></div>
        <div class="js-reveal" style="opacity:0;padding:26px 0;border-top:1px solid rgba(207,161,92,.28);display:flex;gap:30px;align-items:baseline"><span style="font:500 18px 'Spectral',serif;color:#cfa15c;flex:none;width:40px">03</span><span style="font:500 34px/1.35 'Newsreader',serif;color:#e6d4ab">Dragging me out of the house when I’m literally in rot mode.</span></div>
        <div class="js-reveal" style="opacity:0;padding:26px 0;border-top:1px solid rgba(207,161,92,.28);border-bottom:1px solid rgba(207,161,92,.28);display:flex;gap:30px;align-items:baseline"><span style="font:500 18px 'Spectral',serif;color:#cfa15c;flex:none;width:40px">04</span><span style="font:500 34px/1.35 'Newsreader',serif;color:#e6d4ab">The \"you got this\" hype calls before every single exam.</span></div>
      </div>
    </div>
  </section>

  <section style="position:relative;z-index:1;min-height:100vh;display:flex;align-items:center">
    <div class="js-reveal" style="opacity:0;position:absolute;left:8%;top:16%;animation:floaty 5.5s ease-in-out infinite">${doodleSparkle}</div>
    <div class="js-reveal" style="opacity:0;position:absolute;right:8%;bottom:18%;animation:bob 5.4s ease-in-out infinite">${doodleBalloon}</div>
    <div class="js-reveal" style="opacity:0;position:absolute;right:14%;top:20%;animation:floaty 6.5s ease-in-out infinite">${doodleFlower}</div>
    <div class="js-reveal" style="opacity:0;position:absolute;left:11%;bottom:20%;animation:floaty 5.8s ease-in-out infinite">${doodlePlane}</div>

    <div style="max-width:820px;margin:0 auto;padding:120px 40px;text-align:center;width:100%">
      <div class="js-reveal" style="opacity:0;font:500 15px 'Spectral',serif;letter-spacing:3.5px;color:#cfa15c;margin-bottom:30px">TWO YEARS LEFT</div>
      <h2 class="js-reveal" style="opacity:0;margin:0;font:400 104px/1 'Newsreader',serif;letter-spacing:-2px;color:#ead2a2">Now I want you<br /><span style="font-style:italic;font-weight:500;color:#cfa15c">in the second half.</span></h2>
      <p class="js-reveal" style="opacity:0;margin:38px auto 0;max-width:560px;font:400 23px/1.65 'Spectral',serif;color:#c2aa80">The finish line is closer than the start now. When I walk that stage, I want your words with me — written today, by the you of right now.</p>
    </div>
  </section>

  <section style="position:relative;z-index:1;min-height:100vh;display:flex;align-items:center">

    <div class="js-reveal" style="opacity:0;position:absolute;right:9%;top:18%;animation:floaty 5s ease-in-out infinite">${doodleKey}</div>
    <div class="js-reveal" style="opacity:0;position:absolute;left:10%;bottom:18%;animation:floaty 4.8s ease-in-out infinite">${doodleCloud}</div>
    <div class="js-reveal" style="opacity:0;position:absolute;right:11%;bottom:20%;animation:bob 6.2s ease-in-out infinite">${doodleRibbon}</div>
    <div style="max-width:640px;margin:0 auto;padding:120px 40px;text-align:center;width:100%">
      <div class="js-reveal" style="opacity:0;margin:0 auto 30px;width:158px;height:104px;position:relative;box-shadow:0 14px 34px -8px rgba(0,0,0,.5);border-radius:7px">
        <div style="position:absolute;inset:0;border-radius:7px;background:repeating-linear-gradient(45deg,#7a1e2a 0 9px,#e8dcc0 9px 18px,#2c3e70 18px 27px,#e8dcc0 27px 36px);padding:6px;box-sizing:border-box">
          <div style="position:relative;width:100%;height:100%;background:#fdfaf3;border-radius:3px;overflow:hidden">
            <div style="position:absolute;bottom:0;left:0;width:0;height:0;border-bottom:58px solid rgba(0,0,0,.05);border-right:73px solid transparent"></div>
            <div style="position:absolute;bottom:0;right:0;width:0;height:0;border-bottom:58px solid rgba(0,0,0,.08);border-left:73px solid transparent"></div>
            <div style="position:absolute;top:0;left:0;right:0;height:0;border-left:73px solid transparent;border-right:73px solid transparent;border-top:46px solid #f0e6d0"></div>
            <div style="position:absolute;top:6px;right:7px;width:24px;height:29px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.28);padding:2px;box-sizing:border-box;transform:rotate(4deg);z-index:2">
              <div style="width:100%;height:100%;border:1px solid rgba(0,0,0,.12);background:radial-gradient(circle at 50% 42%,rgba(207,159,92,.4),rgba(122,30,42,.2))"></div>
            </div>
          </div>
        </div>
        <div style="position:absolute;top:46px;left:50%;transform:translate(-50%,-50%);z-index:3">
          ${waxSeal(38)}
        </div>
      </div>
      <h2 class="js-reveal" style="opacity:0;margin:0;font:400 82px/1.02 'Newsreader',serif;letter-spacing:-1.6px;color:#ead2a2">Write me a letter<br /><span style="font-style:italic;font-weight:500;color:#cfa15c">I'll open at graduation.</span></h2>

      <button class="js-reveal" onClick=${() => this.openCompose()} style="opacity:0;margin-top:38px;border:none;background:#cfa15c;color:#2a0b11;font:500 16px 'Spectral',serif;letter-spacing:.5px;padding:16px 40px;border-radius:3px;cursor:pointer;box-shadow:0 12px 26px -8px rgba(0,0,0,.6)">Seal a letter →</button>
      <div class="js-reveal" style="opacity:0;margin-top:24px;font:400 14px 'Spectral',serif;color:#b29873">unlocks ${gradLabel} · in ${days} days</div>
    </div>
  </section>


  <div ref=${this.modalRef} style="position:fixed;inset:0;z-index:100;display:none;align-items:center;justify-content:center;background:rgba(20,7,11,.72);backdrop-filter:blur(5px);padding:24px">
    <div style="background:#fbf6ec;border-radius:14px;max-width:980px;width:100%;max-height:92vh;overflow:hidden;box-shadow:0 40px 90px -24px rgba(0,0,0,.7);display:flex;flex-direction:column">

      <div style="display:flex;align-items:center;justify-content:space-between;padding:20px 28px;border-bottom:1px solid rgba(46,42,36,.12)">
        <div>
          <div style="font:400 24px 'Newsreader',serif;color:#2e2a24">The Envelope Studio</div>
          <div style="font:400 13px 'Spectral',serif;color:#8a7a60;margin-top:2px">${stepNames[s.step]}</div>
        </div>
        <div style="display:flex;align-items:center;gap:18px">
          <div style="display:flex;gap:7px">${stepDots}</div>
          <button onClick=${() => this.closeCompose()} style="border:none;background:none;color:#8a7a60;font-size:22px;line-height:1;cursor:pointer;padding:4px 8px">×</button>
        </div>
      </div>

      <div style="display:flex;flex:1;min-height:0">
        <div style="width:44%;flex:none;background:linear-gradient(160deg,#efe4cf,#e5d7ba);display:flex;align-items:center;justify-content:center;padding:30px;position:relative;overflow:hidden">
          <div style="display:${dEnvPrev};flex-direction:column;align-items:center;justify-content:center;width:100%">
          <div ref=${this.previewRef} style="width:320px;height:206px;position:relative;filter:drop-shadow(0 20px 34px rgba(60,40,20,.34))">
            <div style="position:absolute;inset:0;border-radius:6px;background:${env.stripe};padding:9px;box-sizing:border-box">
              <div style="position:relative;width:100%;height:100%;background:${env.paper};border-radius:2px;overflow:hidden">
                <div style="position:absolute;inset:0;background:radial-gradient(rgba(120,90,50,.06) 1px,transparent 1px) 0 0/13px 13px;opacity:.7"></div>
                <div style="position:absolute;top:12px;right:14px;width:46px;height:56px;box-shadow:0 1px 5px rgba(0,0,0,.3);border-radius:3px;overflow:hidden;transform:rotate(4deg)">${stampArt(stamps[s.stampIdx], '100%', '100%')}</div>
                <svg width="62" height="52" viewBox="0 0 62 52" style="position:absolute;top:12px;right:60px;transform:rotate(-9deg);opacity:.5" fill="none" stroke=${env.ink}>
                  <circle cx="40" cy="21" r="16" stroke-width="1.4"></circle>
                  <circle cx="40" cy="21" r="11" stroke-width="1" stroke-dasharray="2 2"></circle>
                  <path d="M33 27 l14 -6 -5 9 z" fill=${env.ink} stroke="none"></path>
                  <path d="M2 15 q7 -3 14 0 t14 0M2 21 q7 -3 14 0 t14 0M2 27 q7 -3 14 0 t14 0" stroke-width="1.3"></path>
                </svg>
                <div style="position:absolute;left:22px;top:96px;font:500 18px 'Newsreader',serif;color:${env.ink}">${toLine}</div>
                <div style="position:absolute;left:22px;top:122px;font:400 11px 'Spectral',serif;color:${env.ink};opacity:.75">${fromLine}</div>
                <div style="position:absolute;right:20px;top:104px;width:150px;display:flex;flex-direction:column;gap:13px">
                  <div style="height:1px;background:${env.ink};opacity:.35"></div>
                  <div style="height:1px;background:${env.ink};opacity:.35"></div>
                  <div style="height:1px;background:${env.ink};opacity:.35"></div>
                </div>
                <div style="position:absolute;left:20px;bottom:16px;display:flex;align-items:stretch;border:1.4px solid ${env.ink};border-radius:3px;font:600 10px 'Spectral',serif;color:${env.ink};letter-spacing:.5px">
                  <span style="padding:4px 6px;border-right:1.4px solid ${env.ink}">N°</span><span style="padding:4px 9px">1686 / 12</span>
                </div>
              </div>
            </div>
            <div ref=${this.sealRef} style="position:absolute;top:57px;left:50%;transform:translate(-50%,0);width:92px;height:92px;border-radius:50%;border:3px double ${env.seal};color:${env.seal};background:rgba(255,255,255,.04);z-index:7;display:none;flex-direction:column;align-items:center;justify-content:center;text-align:center;transform-origin:center">
              <div style="font:700 12px 'Spectral',serif;letter-spacing:1.5px">SEALED</div>
              <div style="font:400 7.5px 'Spectral',serif;letter-spacing:1px;margin-top:3px">UNTIL GRADUATION</div>
            </div>
            <div ref=${this.lockRef} style="position:absolute;top:160px;left:50%;transform:translate(-50%,-50%);z-index:8;display:none">
              <svg width="30" height="34" viewBox="0 0 30 34" fill="none"><path d="M8 15v-4a7 7 0 0114 0v4" stroke="#cfa15c" stroke-width="3" fill="none"></path><rect x="4" y="15" width="22" height="16" rx="3" fill="#cfa15c"></rect><circle cx="15" cy="22" r="2.4" fill="#5e1620"></circle></svg>
            </div>
          </div>
          </div>

          <div style="display:${dPagePrev};flex-direction:column;align-items:center;justify-content:center;width:100%">
            <div style="position:relative;width:100%;max-width:340px;background:${paperBg};border-radius:255px 15px 225px 15px/15px 225px 15px 255px;box-shadow:0 18px 42px -12px rgba(60,40,20,.44),inset 0 0 46px rgba(120,90,50,.10);padding:32px 26px 26px;box-sizing:border-box">
              <div style="position:absolute;top:-23px;left:50%;transform:translate(-50%,0);z-index:2">${waxSeal(46)}</div>
              <textarea value=${isDraw ? '' : page.text} onInput=${(e) => this.setPageText(e)} placeholder="Dear Menna, when you read this you'll have made it…" style="display:${dTextArea};width:100%;box-sizing:border-box;height:300px;resize:none;background:transparent;border:none;outline:none;color:#2e2a24;font-family:${pageFont};font-size:${pageFontSize};line-height:1.85;padding-top:6px"></textarea>
              <canvas ref=${this.drawCanvasRef} width="340" height="300" onPointerDown=${(e) => this.drawStart(e)} onPointerMove=${(e) => this.drawMove(e)} onPointerUp=${() => this.drawEnd()} onPointerLeave=${() => this.drawEnd()} style="display:${dDrawArea};width:100%;height:300px;box-sizing:border-box;background:transparent;touch-action:none;cursor:crosshair"></canvas>
            </div>
          </div>

          <div style="position:absolute;bottom:16px;left:0;right:0;text-align:center;font:400 12px 'Spectral',serif;color:#8a7a60">${previewCaption}</div>
        </div>

        <div ref=${this.rightRef} style="flex:1;min-width:0;padding:26px 30px;overflow-y:auto">

          <div style="display:${dEnv}">
            <div style="font:500 13px 'Spectral',serif;letter-spacing:1px;color:#8a7a60;margin-bottom:12px">CHOOSE YOUR ENVELOPE</div>
            <div style="display:flex;gap:12px;margin-bottom:24px">${envChips}</div>
            <div style="font:500 13px 'Spectral',serif;letter-spacing:1px;color:#8a7a60;margin-bottom:10px">WRITE ON THE ENVELOPE</div>
            <label style="display:block;font:400 12px 'Spectral',serif;color:#8a7a60;margin-bottom:5px">To</label>
            <input class="stud-input" value=${s.envTo} onInput=${(e) => this.setEnvTo(e)} placeholder="Menna" style="width:100%;box-sizing:border-box;border:1px solid rgba(46,42,36,.22);border-radius:5px;padding:10px 12px;font:400 15px 'Newsreader',serif;color:#2e2a24;background:#fff;margin-bottom:14px" />
            <label style="display:block;font:400 12px 'Spectral',serif;color:#8a7a60;margin-bottom:5px">From</label>
            <input class="stud-input" value=${s.envFrom} onInput=${(e) => this.setEnvFrom(e)} placeholder="your name" style="width:100%;box-sizing:border-box;border:1px solid rgba(46,42,36,.22);border-radius:5px;padding:10px 12px;font:400 15px 'Newsreader',serif;color:#2e2a24;background:#fff;margin-bottom:20px" />
            <div style="font:500 13px 'Spectral',serif;letter-spacing:1px;color:#8a7a60;margin-bottom:10px">CHOOSE A STAMP</div>
            <div style="display:flex;gap:9px;flex-wrap:wrap">${stampChips}</div>
          </div>

          <div style="display:${dLetter}">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
              <div style="font:500 13px 'Spectral',serif;letter-spacing:1px;color:#8a7a60">${isDraw ? 'DOODLE SHEET' : 'YOUR LETTER'} · sheet ${s.pageIdx + 1} / ${s.pages.length}</div>
              <div style="display:flex;gap:7px">
                <button onClick=${() => this.prevPage()} style="border:1px solid rgba(46,42,36,.2);background:#fff;border-radius:5px;width:30px;height:30px;cursor:pointer;color:#5c5346">‹</button>
                <button onClick=${() => this.nextPageSheet()} style="border:1px solid rgba(46,42,36,.2);background:#fff;border-radius:5px;width:30px;height:30px;cursor:pointer;color:#5c5346">›</button>
                <button onClick=${() => this.addPage()} style="border:1px solid rgba(178,105,74,.4);background:rgba(178,105,74,.1);border-radius:5px;padding:0 11px;height:30px;cursor:pointer;font:400 12px 'Spectral',serif;color:#8a4a30">+ page</button>
                <button onClick=${() => this.addDoodle()} style="border:1px solid rgba(178,105,74,.4);background:rgba(178,105,74,.1);border-radius:5px;padding:0 11px;height:30px;cursor:pointer;font:400 12px 'Spectral',serif;color:#8a4a30">+ doodle</button>
              </div>
            </div>

            <div style="display:${dTextCtl};margin-bottom:12px">
              <div style="font:400 12px 'Spectral',serif;color:#8a7a60;margin-bottom:7px">handwriting</div>
              <div style="display:flex;gap:8px;flex-wrap:wrap">${fontChips}</div>
            </div>
            <div style="display:${dDrawCtl};margin-bottom:12px">
              <div style="font:400 12px 'Spectral',serif;color:#8a7a60;margin-bottom:7px">ink colour</div>
              <div style="display:flex;gap:9px;margin-bottom:12px">${inkChips}</div>
              <div style="display:flex;align-items:center;gap:9px">
                <button onClick=${() => this.setPen()} style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;border:2px solid ${penBorder};background:${penBg};border-radius:6px;padding:9px;cursor:pointer;font:500 13px 'Spectral',serif;color:#3a2e28"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#3a2e28" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M11.5 2.5 a1.7 1.7 0 0 1 2.4 2.4 L6 12.8 L2.8 13.6 L3.6 10.4 Z"></path><path d="M10.2 3.8 l2.4 2.4"></path></svg>Pen</button>
                <button onClick=${() => this.setEraser()} style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;border:2px solid ${eraserBorder};background:${eraserBg};border-radius:6px;padding:9px;cursor:pointer;font:500 13px 'Spectral',serif;color:#3a2e28"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#3a2e28" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9.2 2.6 L13.8 7.2 L8 13 H4.8 L2.2 10.4 Z"></path><path d="M6.2 5.6 L10.8 10.2"></path><path d="M8 13 H14"></path></svg>Eraser</button>
                <button onClick=${() => this.clearDraw()} style="border:1px solid rgba(46,42,36,.2);background:#fff;border-radius:6px;padding:9px 14px;cursor:pointer;font:400 13px 'Spectral',serif;color:#5c5346">Clear</button>
              </div>
            </div>

            <div style="font:400 12px 'Spectral',serif;color:#8a7a60;margin-bottom:7px">paper</div>
            <div style="display:flex;gap:9px">${paperChips}</div>
            <p style="font:400 13px/1.5 'Spectral',serif;color:#8a7a60;margin:18px 0 0">Write straight onto the page in the preview →</p>
          </div>

          <div style="display:${dAttach}">
            <div style="font:500 13px 'Spectral',serif;letter-spacing:1px;color:#8a7a60;margin-bottom:10px">TUCK IN ONE PHOTO</div>
            <input ref=${this.fileRef} type="file" accept="image/*" onChange=${(e) => this.onFile(e)} style="display:none" />
            <div onClick=${() => this.pickFile()} style="border:2px dashed rgba(46,42,36,.28);border-radius:8px;padding:22px;text-align:center;cursor:pointer;background:#fff">
              <div style="display:${show(!s.attachSrc)}">
                <svg width="30" height="26" viewBox="0 0 30 26" fill="none" stroke="#8a7a60" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:0 auto"><rect x="2" y="2" width="26" height="22" rx="2.5"></rect><circle cx="10" cy="9.5" r="2.4"></circle><path d="M2 19 l7 -6 5 4.5 5.5 -5 8.5 7"></path></svg>
                <div style="font:400 14px 'Spectral',serif;color:#8a7a60;margin-top:6px">Click to add an image</div>
              </div>
              ${s.attachSrc ? html`<img src=${s.attachSrc} style="max-width:100%;max-height:180px;border-radius:5px" />` : null}
            </div>
            <button onClick=${() => this.removeAttach()} style="display:${show(!!s.attachSrc)};margin-top:10px;border:1px solid rgba(46,42,36,.2);background:#fff;border-radius:5px;padding:7px 14px;cursor:pointer;font:400 12px 'Spectral',serif;color:#5c5346">remove photo</button>
          </div>

          <div style="display:${dReview}">
            <div style="font:500 13px 'Spectral',serif;letter-spacing:1px;color:#8a7a60;margin-bottom:14px">READY TO SEAL</div>
            <div style="font:400 15px/1.9 'Spectral',serif;color:#4a4038">
              <div>Envelope · <b style="color:#2e2a24;font-weight:600">${env.name}</b> · stamp ${stamps[s.stampIdx].name}</div>
              <div>To · <b style="color:#2e2a24;font-weight:600">${toLine}</b></div>
              <div>Letter · <b style="color:#2e2a24;font-weight:600">${sheetCount}</b></div>
              <div>Photo · <b style="color:#2e2a24;font-weight:600">${s.attachSrc ? 'added' : 'none'}</b></div>
            </div>
            <div style="margin-top:18px;padding:14px 16px;background:rgba(94,22,32,.07);border-radius:8px;font:400 14px/1.55 'Spectral',serif;color:#5e1620">
              <svg width="13" height="15" viewBox="0 0 15 17" fill="none" style="vertical-align:-2px;margin-right:5px"><path d="M4 7 V5.5 a3.5 3.5 0 0 1 7 0 V7" stroke="#5e1620" stroke-width="1.8" fill="none"></path><rect x="2" y="7" width="11" height="8.5" rx="1.6" fill="#5e1620"></rect><circle cx="7.5" cy="10.8" r="1.3" fill="#f3d9a2"></circle></svg>Once sealed, this stays locked — even from Menna — until <b>${gradLabel}</b>, about ${days} days from now.
            </div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:26px;padding-top:18px;border-top:1px solid rgba(46,42,36,.1)">
            <button onClick=${() => this.back()} style="display:${show(s.step > 0)};border:1px solid rgba(46,42,36,.25);background:none;color:#5c5346;font:400 14px 'Spectral',serif;padding:11px 22px;border-radius:4px;cursor:pointer">← Back</button>
            <div style="flex:1"></div>
            <button onClick=${() => this.next()} style="display:${show(s.step < 3)};border:none;background:#2e2a24;color:#fbf6ec;font:500 14px 'Spectral',serif;padding:12px 26px;border-radius:4px;cursor:pointer">${nextLabel} →</button>
            <button onClick=${() => this.seal()} disabled=${s.loading} style="display:${s.step === 3 ? 'inline-flex' : 'none'};align-items:center;gap:8px;border:none;background:#5e1620;color:#f3d9a2;font:500 15px 'Spectral',serif;letter-spacing:.4px;padding:13px 30px;border-radius:4px;cursor:${s.loading ? 'wait' : 'pointer'};opacity:${s.loading ? '0.7' : '1'};box-shadow:0 10px 22px -8px rgba(94,22,32,.6)"><svg width="13" height="15" viewBox="0 0 15 17" fill="none"><path d="M4 7 V5.5 a3.5 3.5 0 0 1 7 0 V7" stroke="#f3d9a2" stroke-width="1.8" fill="none"></path><rect x="2" y="7" width="11" height="8.5" rx="1.6" fill="#f3d9a2"></rect><circle cx="7.5" cy="10.8" r="1.3" fill="#5e1620"></circle></svg>${s.loading ? 'Sending...' : 'Seal & send'}</button>
          </div>

        </div>
      </div>

      <div ref=${this.doneRef} style="position:absolute;inset:0;background:radial-gradient(rgba(120,90,50,.07) 1px,transparent 1px) 0 0/16px 16px,#fbf6ec;display:none;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px;animation:fadeUp .6s ease both">
        <div style="position:absolute;top:14%;left:14%;animation:floaty 5s ease-in-out infinite">${doodleStar}</div>
        <div style="position:absolute;top:12%;right:12%;animation:bob 6s ease-in-out infinite">${doodlePlane}</div>
        <div style="position:absolute;bottom:15%;left:11%;animation:bob 5.4s ease-in-out infinite">${doodleHeart}</div>
        <div style="position:absolute;bottom:13%;right:12%;animation:floaty 6.2s ease-in-out infinite">${doodleSparkle}</div>
        <div style="animation:floatWisp 3s ease-in-out infinite"><svg width="88" height="65" viewBox="0 0 90 66" fill="none" stroke="#5e1620" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M8 14 h74 v40 h-74 Z"></path><path d="M8 14 L45 40 L82 14"></path></svg></div>
        <div style="font:600 58px/1.1 'Caveat',cursive;color:#2e2a24;margin-top:20px;transform:rotate(-1.5deg)">It's sealed and on its way.</div>
        <p style="font:400 19px/1.7 'Spectral',serif;color:#5c5346;max-width:480px;margin:16px 0 0">Your letter is locked away — even Menna can't read it. It will wait, sealed shut, until the day she walks the stage.</p>
        <div style="display:flex;align-items:stretch;margin-top:36px">
          <div style="padding:14px 34px"><div style="font:500 11px 'Spectral',serif;letter-spacing:2.5px;color:#8a7a60">SEALED</div><div style="font:400 26px 'Newsreader',serif;color:#2e2a24;margin-top:6px">today</div></div>
          <div style="width:1px;background:rgba(46,42,36,.16)"></div>
          <div style="padding:14px 34px"><div style="font:500 11px 'Spectral',serif;letter-spacing:2.5px;color:#8a7a60">UNLOCKS</div><div style="font:400 26px 'Newsreader',serif;color:#5e1620;margin-top:6px">${gradLabel}</div></div>
          <div style="width:1px;background:rgba(46,42,36,.16)"></div>
          <div style="padding:14px 34px"><div style="font:500 11px 'Spectral',serif;letter-spacing:2.5px;color:#8a7a60">THE WAIT</div><div style="font:400 26px 'Newsreader',serif;color:#2e2a24;margin-top:6px">${days} days</div></div>
        </div>
        <div style="margin-top:36px;display:flex;gap:12px;justify-content:center">
          <button onClick=${() => this.setState({ previewing: true })} style="border:1px solid rgba(46,42,36,.25);background:none;color:#5c5346;font:500 15px 'Spectral',serif;letter-spacing:.4px;padding:13px 26px;border-radius:4px;cursor:pointer">Preview letter</button>
          <button onClick=${() => this.closeCompose()} style="border:none;background:#2e2a24;color:#fbf6ec;font:500 15px 'Spectral',serif;letter-spacing:.4px;padding:13px 36px;border-radius:4px;cursor:pointer">Done</button>
        </div>
        <p style="position:absolute;bottom:80px;font:400 17px/1.7 'Spectral',serif;color:#5c5346;max-width:860px;width:100%;margin:0;padding:0 30px;box-sizing:border-box">Lowkey cool, right? But hear me out: give it to me as a real letter now. I’ll hide it away myself until graduation. I adore physical letters, and since we already have the digital backup here, it’s a win-win.</p>

        ${s.previewing ? html`
          <div style="position:fixed;inset:0;z-index:200;background:rgba(20,7,11,.8);backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center;padding:40px;overflow-y:auto;text-align:left">
            <div style="background:#fbf6ec;border-radius:6px;max-width:760px;width:100%;padding:50px 56px 42px;box-shadow:0 28px 60px -18px rgba(0,0,0,.6);position:relative">
              <button onClick=${() => this.setState({ previewing: false })} style="position:absolute;top:20px;right:20px;background:none;border:none;font:28px sans-serif;cursor:pointer;color:#8a7a60">×</button>
              <div style="font:500 26px 'Newsreader',serif;color:#5e1620">Dear ${s.envTo || 'Menna'},</div>
              ${s.pages.filter(p => p.type === 'text' && p.text?.trim()).map((p, j) => html`<p key=${j} style="margin:16px 0 0;font-family:${fonts[p.font || 0].css};font-size:calc(${fonts[p.font || 0].size} + 3px);line-height:1.9;color:#3a2e28;white-space:pre-wrap">${p.text}</p>`)}
              ${s.pages.filter(p => p.type === 'draw' && p.drawData).map((p, j) => html`<div key=${j} style="background:#fff;padding:8px 8px 22px;box-shadow:0 6px 16px rgba(40,30,20,.25);transform:rotate(${j % 2 ? 1.6 : -1.8}deg);margin-top:20px;width:max-content">
                <img src=${p.drawData} style="display:block;width:190px;background:${papers[p.paper || 0].bg}" />
              </div>`)}
              <div style="margin-top:26px;text-align:right;font-family:${fonts[s.pages[0]?.font || 0]?.css || fonts[3].css};font-size:calc(${fonts[s.pages[0]?.font || 0]?.size || fonts[3].size} + 2px);color:#5e1620">XO, ${s.envFrom || 'a friend'}</div>
              ${s.attachSrc ? html`<img src=${s.attachSrc} style="display:block;width:150px;height:150px;object-fit:cover;margin-top:20px;transform:rotate(2deg);box-shadow:0 6px 16px rgba(0,0,0,.2)" />` : null}
            </div>
          </div>
        ` : null}
      </div>

    </div>
  </div>

</div>`;
  }
}

export { FriendsMessageSite, envelopes, papers, inks, stamps, fonts, stampArt, gradDate, gradLabel };

if (typeof document !== 'undefined') {
  const mount = document.getElementById('app');
  if (mount) render(h(FriendsMessageSite, null), mount);
}
