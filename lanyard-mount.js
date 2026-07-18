/** Self-contained mount of the React Bits <Lanyard/> (JS+CSS variant). Runs in its OWN React root via a custom element <lanyard-card> so it can never clash with the host page's renderer. All 3D deps load from esm.sh (pinned to one React instance); the card.glb model + lanyard.png band come from the react-bits repo via jsDelivr. */
import React, { useEffect, useMemo, useRef, useState, Suspense } from 'https://esm.sh/react@18.3.1';
import { createRoot } from 'https://esm.sh/react-dom@18.3.1/client';
import htm from 'https://esm.sh/htm@3.1.1';
import * as THREE from 'https://esm.sh/three@0.160.0';
import { Canvas, extend, useFrame } from 'https://esm.sh/@react-three/fiber@8.17.10?deps=react@18.3.1,react-dom@18.3.1,three@0.160.0';
import { useGLTF, useTexture, Environment, Lightformer } from 'https://esm.sh/@react-three/drei@9.114.0?deps=react@18.3.1,react-dom@18.3.1,three@0.160.0,@react-three/fiber@8.17.10';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from 'https://esm.sh/@react-three/rapier@1.5.0?deps=react@18.3.1,react-dom@18.3.1,three@0.160.0,@react-three/fiber@8.17.10';
import { MeshLineGeometry, MeshLineMaterial } from 'https://esm.sh/meshline@3.3.1?deps=three@0.160.0';

const html = htm.bind(React.createElement);
extend({ MeshLineGeometry, MeshLineMaterial });

const cardGlbUrl = 'https://cdn.jsdelivr.net/gh/DavidHDev/react-bits@main/src/assets/lanyard/card.glb';
const bandTextureUrl = 'https://cdn.jsdelivr.net/gh/DavidHDev/react-bits@main/src/assets/lanyard/lanyard.png';

/** A runtime-generated transparent PNG. drei's useTexture (ImageLoader) rejects some hand-written base64 data URLs; a canvas-produced one always decodes. */
const blankPixel = (() => {
  const c = document.createElement('canvas');
  c.width = c.height = 2;
  return c.toDataURL('image/png');
})();
const frontUvRect = { x: 0, y: 0, w: 0.5, h: 0.755 };
const backUvRect = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false, frontImage = null, backImage = null, backPhoto = null, imageFit = 'cover', lanyardImage = null, lanyardWidth = 1 }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  const { nodes, materials } = useGLTF(cardGlbUrl);
  const texture = useTexture(lanyardImage || bandTextureUrl);
  const frontTex = useTexture(frontImage || blankPixel);
  const backTex = useTexture(backImage || blankPixel);
  const backPhotoTex = useTexture(backPhoto || blankPixel);

  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    if (!frontImage && !backImage) return baseMap;
    const baseImg = baseMap.image, W = baseImg.width, H = baseImg.height;
    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;
    ctx.drawImage(baseImg, 0, 0, W, H);
    const drawFitted = (img, rect) => {
      const rx = rect.x * W, ry = rect.y * H, rw = rect.w * W, rh = rect.h * H;
      const pick = imageFit === 'contain' ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale, dh = img.height * scale;
      const dx = rx + (rw - dw) / 2, dy = ry + (rh - dh) / 2;
      ctx.save(); ctx.beginPath(); ctx.rect(rx, ry, rw, rh); ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh); ctx.restore();
    };
    if (frontImage && frontTex.image) drawFitted(frontTex.image, frontUvRect);
    if (backImage && backTex.image) drawFitted(backTex.image, backUvRect);
    if (backPhoto && backPhotoTex.image) {
      const frect = {
        x: backUvRect.x + (20 / 512) * backUvRect.w,
        y: backUvRect.y + (20 / 768) * backUvRect.h,
        w: (472 / 512) * backUvRect.w,
        h: (728 / 768) * backUvRect.h
      };
      drawFitted(backPhotoTex.image, frect);
    }
    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, backPhoto, imageFit, frontTex, backTex, backPhotoTex, materials.base.map]);

  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return html`
    <${React.Fragment}>
      <group position=${[0, 4, 0]}>
        <${RigidBody} ref=${fixed} ...${segmentProps} type="fixed" />
        <${RigidBody} position=${[0.5, 0, 0]} ref=${j1} ...${segmentProps}>
          <${BallCollider} args=${[0.1]} />
        <//>
        <${RigidBody} position=${[1, 0, 0]} ref=${j2} ...${segmentProps}>
          <${BallCollider} args=${[0.1]} />
        <//>
        <${RigidBody} position=${[1.5, 0, 0]} ref=${j3} ...${segmentProps}>
          <${BallCollider} args=${[0.1]} />
        <//>
        <${RigidBody} position=${[2, 0, 0]} ref=${card} ...${segmentProps} type=${dragged ? 'kinematicPosition' : 'dynamic'}>
          <${CuboidCollider} args=${[0.8, 1.125, 0.01]} />
          <group scale=${2.25} position=${[0, -1.2, -0.05]}
            onPointerOver=${() => hover(true)}
            onPointerOut=${() => hover(false)}
            onPointerUp=${e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown=${e => (e.target.setPointerCapture(e.pointerId), drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))}>
            <mesh geometry=${nodes.card.geometry}>
              <meshPhysicalMaterial map=${cardMap} map-anisotropy=${16} clearcoat=${isMobile ? 0 : 1} clearcoatRoughness=${0.15} roughness=${0.9} metalness=${0.8} />
            </mesh>
            <mesh geometry=${nodes.clip.geometry} material=${materials.metal} material-roughness=${0.3} />
            <mesh geometry=${nodes.clamp.geometry} material=${materials.metal} />
          </group>
        <//>
      </group>
      <mesh ref=${band}>
        <meshLineGeometry />
        <meshLineMaterial color="white" depthTest=${false} resolution=${isMobile ? [1000, 2000] : [1000, 1000]} useMap map=${texture} repeat=${[-4, 1]} lineWidth=${lanyardWidth} />
      </mesh>
    <//>`;
}

function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true, frontImage = null, backImage = null, backPhoto = null, imageFit = 'cover', lanyardImage = null, lanyardWidth = 1 }) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  useEffect(() => {
    const onR = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onR);
    return () => window.removeEventListener('resize', onR);
  }, []);
  return html`
    <div style=${{ position: 'relative', zIndex: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <${Canvas} camera=${{ position, fov }} dpr=${[1, isMobile ? 1.5 : 2]} gl=${{ alpha: transparent, preserveDrawingBuffer: true }} onCreated=${({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}>
        <ambientLight intensity=${Math.PI} />
        <${Suspense} fallback=${null}>
          <${Physics} gravity=${gravity} timeStep=${isMobile ? 1 / 30 : 1 / 60}>
            <${Band} isMobile=${isMobile} frontImage=${frontImage} backImage=${backImage} backPhoto=${backPhoto} imageFit=${imageFit} lanyardImage=${lanyardImage} lanyardWidth=${lanyardWidth} />
          <//>
        <//>
        <${Environment} blur=${0.75}>
          <${Lightformer} intensity=${2} color="white" position=${[0, -1, 5]} rotation=${[0, 0, Math.PI / 3]} scale=${[100, 0.1, 1]} />
          <${Lightformer} intensity=${3} color="white" position=${[-1, -1, 1]} rotation=${[0, 0, Math.PI / 3]} scale=${[100, 0.1, 1]} />
          <${Lightformer} intensity=${3} color="white" position=${[1, 1, 1]} rotation=${[0, 0, Math.PI / 3]} scale=${[100, 0.1, 1]} />
          <${Lightformer} intensity=${10} color="white" position=${[-10, 0, 14]} rotation=${[0, Math.PI / 2, Math.PI / 3]} scale=${[100, 10, 1]} />
        <//>
      <//>
    </div>`;
}

useGLTF.preload(cardGlbUrl);

/** Build an on-brand front texture for the card face — vertical staff-ID layout (wordmark, vertical role label, framed photo, plate number, name + department). */
function makeFrontTexture() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 768;
  const x = c.getContext('2d');
  const navy = '#2e0c12', burgundy = '#7a1e2a', gold = '#cfa15c', cream = '#efe6d2';

  const spaced = (str, cx, y, font, color, gap, align) => {
    x.font = font; x.fillStyle = color; x.textAlign = 'left';
    const widths = [...str].map(ch => x.measureText(ch).width + gap);
    const total = widths.reduce((a, b) => a + b, 0) - gap;
    let sx = align === 'left' ? cx : cx - total / 2;
    for (let i = 0; i < str.length; i++) { x.fillText(str[i], sx, y); sx += widths[i]; }
    x.textAlign = 'center';
  };

  x.fillStyle = '#faf7ef'; x.fillRect(0, 0, 512, 768);
  x.strokeStyle = navy; x.lineWidth = 3; x.strokeRect(20, 20, 472, 728);

  x.textAlign = 'center'; x.fillStyle = navy;
  x.font = '700 50px Georgia, serif';
  x.fillText('HALFWAY', 256, 148);
  x.fillText('POINT', 256, 206);

  x.strokeStyle = gold; x.lineWidth = 2; x.beginPath(); x.moveTo(48, 232); x.lineTo(464, 232); x.stroke();

  /** Vertical role label (left) and plate number (right), both stacked char-by-char. */
  const letters = [...'STUDENT'];
  letters.forEach((ch, i) => { x.font = '700 40px Georgia, serif'; x.fillStyle = navy; x.fillText(ch, 78, 300 + i * 42); });
  const idChars = [...'NO. A02028'];
  idChars.forEach((ch, i) => { x.font = '700 26px Georgia, serif'; x.fillStyle = burgundy; x.fillText(ch, 432, 288 + i * 32); });

  /** Photo frame. */
  x.strokeStyle = navy; x.lineWidth = 3; x.fillStyle = cream;
  x.fillRect(150, 268, 212, 252); x.strokeRect(150, 268, 212, 252);
  x.beginPath(); x.arc(256, 394, 72, 0, Math.PI * 2); x.fillStyle = burgundy; x.fill();
  x.fillStyle = '#f4eede'; x.font = '400 82px "Newsreader", serif'; x.fillText('J', 256, 424);

  x.fillStyle = navy; x.font = '700 46px Georgia, serif'; x.fillText('Julia W.', 256, 593);
  x.strokeStyle = navy; x.lineWidth = 1.5; x.beginPath(); x.moveTo(140, 611); x.lineTo(372, 611); x.stroke();
  spaced('SENTIMENTAL STUDIES DEPT.', 256, 645, '600 20px Georgia, serif', burgundy, 3, 'center');

  return c.toDataURL('image/png');
}

function makeBackTexture() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 768;
  const x = c.getContext('2d');
  x.fillStyle = '#faf7ef'; x.fillRect(0, 0, 512, 768);
  x.strokeStyle = '#2e0c12'; x.lineWidth = 3; x.strokeRect(20, 20, 472, 728);
  return c.toDataURL('image/png');
}

/** Custom lanyard strap texture — black webbing, camel edge stripes, repeated wordmark. */
function makeLanyardTexture() {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 128;
  const x = c.getContext('2d');
  x.fillStyle = '#101010'; x.fillRect(0, 0, 1024, 128);
  x.fillStyle = '#cfa15c';
  x.fillRect(0, 12, 1024, 5);
  x.fillRect(0, 111, 1024, 5);
  x.font = '700 32px Georgia, serif';
  x.textBaseline = 'middle';
  const label = 'HALFWAY POINT   •   ';
  const w = x.measureText(label).width;
  const reps = Math.ceil(1024 / w) + 2;
  let sx = 0;
  for (let i = 0; i < reps; i++) { x.fillText(label, sx, 64); sx += w; }
  return c.toDataURL('image/png');
}

class LanyardCard extends HTMLElement {
  connectedCallback() {
    if (this._mounted) return;
    this._mounted = true;
    this.style.display = 'block';
    const attr = (n, d) => (this.getAttribute(n) ?? d);
    const arr = (n, d) => { try { return JSON.parse(this.getAttribute(n)); } catch (e) { return d; } };
    const props = {
      position: arr('position', [0, 0, 20]),
      gravity: arr('gravity', [0, -40, 0]),
      fov: Number(attr('fov', 20)),
      transparent: attr('transparent', 'true') !== 'false',
      frontImage: this.hasAttribute('branded') ? makeFrontTexture() : (this.getAttribute('front-image') || null),
      backImage: this.hasAttribute('branded') ? makeBackTexture() : null,
      backPhoto: this.getAttribute('back-image') || null,
      imageFit: attr('image-fit', 'cover'),
      lanyardImage: this.getAttribute('lanyard-image') || makeLanyardTexture(),
      lanyardWidth: Number(attr('lanyard-width', 1))
    };
    this._root = createRoot(this);
    this._root.render(React.createElement(Lanyard, props));
  }
  disconnectedCallback() {
    if (this._root) { const r = this._root; this._root = null; setTimeout(() => r.unmount(), 0); }
  }
}
if (!customElements.get('lanyard-card')) customElements.define('lanyard-card', LanyardCard);
