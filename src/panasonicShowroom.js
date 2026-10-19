// S-CLASS concept gallery, using the world's existing scene, collision and UI.
import { box, sign } from './builders.js';
import { m, neon } from './gfx.js';
import { ui, h } from './ui.js';
import { kitchenExperienceUrl } from './showroomConfig.js';
import { buildKitchenModel, showroomFloor } from './showroomKitchenModels.js';
import { t, msg, localizeFields } from './i18n/i18n.js';

export const SHOWROOM = { x0: 26, x1: 58, z0: -120, z1: -100, h: 9 };
export const SHOWROOM_DOOR = { x: 42, z: -123 };
export const SHOWROOM_INTERIOR = { x: 4200, z: -20, w: 84, d: 94, h: 10 };
export const SHOWROOM_SPAWN = { x: 4200, z: 18, heading: Math.PI };
export const SHOWROOM_REGION = { x0: 4152, x1: 4248, z0: -73, z1: 33, range: 50, bg: '#c6bba9' };

// Provenance: accepted V0.6 summaries and V0.7 I/II/L mappings in the read-only
// kitchen repo's docs/S_CLASS_GAME_CONTENT.md. Public/customer copy review is pending.
const CONCEPT_NOTE = 'Concept display only. These simplified exhibits and walkways are not installation specifications or exact product models.';
export const SHOWROOM_LAYOUTS = [
  { id: 'i', appLayoutId: 'type-i', title: 'I-Type (Straight)', heading: 'I-Type\n(Straight)', x: 4177, z: -17, caption: 'One wall row\nSink + cooking together', text: 'One straight working row against a local wall. The Sink and cooking zone share the same run.' },
  { id: 'ii', appLayoutId: 'type-ii', title: 'II-Type (Parallel)', heading: 'II-Type\n(Parallel)', x: 4200, z: -17, caption: 'Two parallel rows\nSink / cooking separated', text: 'Two parallel working rows with a walkable gallery aisle. The front row holds the Sink; the rear row holds the Cooktop and Range Hood. These are display walkways, not verified installation clearances.' },
  { id: 'l', appLayoutId: 'type-l', title: 'L-Type (Corner)', heading: 'L-Type\n(Corner)', x: 4223, z: -17, caption: 'Connected corner\nSink / cooking on two legs', text: 'A connected L-shaped worktop in a local corner. The Sink sits on the longer leg; the Cooktop and Range Hood sit on the perpendicular shorter leg. Upper cabinets follow the corner. This is a representative concept arrangement.' },
  { id: 'peninsula', appLayoutId: 'face-to-face', title: 'Face to Face (Peninsula)', heading: 'Face to Face\n(Peninsula)', x: 4180, z: -48, caption: 'One end connected\nLong rear side open', text: 'A deeper counter with one end connected to a short side partition. The Sink and Cooktop share the run, with a suspended Range Hood above cooking. Its long rear side opens toward the living display space; walk around the free end to visit that side.' },
  { id: 'island', appLayoutId: 'island', title: 'Island (Center)', heading: 'Island\n(Center)', x: 4220, z: -48, caption: 'Freestanding counter\nWalk around all four sides', text: 'A freestanding counter with the Sink and Cooktop together, a suspended Range Hood and gallery access around all four sides. Finished panels close its ends and rear. Neither end connects to a wall, and no rear backsplash blocks the open side.' },
];
const PRODUCTS = {
  sink: { title: 'Sink', text: 'The Raku-Suru Sink’s low-step, gapless construction supports easier wiping and cleaning.' },
  cooktop: { title: 'Cooktop', text: 'The Flat Wide series has horizontal cooking zones, easier access to pots, and a front area for preparation and plating.' },
  hood: { title: 'Range Hood', text: 'Reduced fan maintenance still requires routine plate and surface cleaning. Consult the kitchen experience for qualified, model-specific guidance.' },
};
SHOWROOM_LAYOUTS.forEach(layout => localizeFields(layout, ['title', 'heading', 'caption', 'text']));
Object.values(PRODUCTS).forEach(product => localizeFields(product, ['title', 'text']));

export function buildPanasonicShowroom(W) {
  const S = W.static;
  const { x0, x1, z0, z1, h: H } = SHOWROOM;
  const white = m('concrete', 0xf1eee7), navy = m(0x17364d), wood = m('wood', 0xc39a70);
  // North-facing frontage on the vacant plot between the Office and northern sidewalk.
  box(S, 36, 0.16, 24, 42, 0.04, -110, m('tiles', 0xded8cd));
  box(S, 8, 0.06, 6, 42, 0.15, -123, m('tiles', 0xece7dc));
  box(S, x1 - x0, H, z1 - z0, 42, 0.2, -110, white);
  W.solid(x0, x1, z0, z1, 0, H + 0.2, true);
  box(S, 34, 0.45, 22, 42, H + 0.2, -110, navy);
  box(S, 32, 2.8, 0.3, 42, 5.7, z0 - 0.18, navy);
  for (const x of [31, 53]) box(S, 9, 4.4, 0.18, x, 0.4, z0 - 0.22, m('window', 0x9dbdd0));
  for (const x of [26.3, 36, 48, 57.7]) box(S, 0.35, 5.4, 0.4, x, 0.2, z0 - 0.28, wood);
  box(S, 7.4, 4.8, 0.25, 42, 0.2, z0 - 0.25, m('window', 0x668ca6));
  box(S, 0.12, 4.8, 0.18, 42, 0.2, z0 - 0.43, navy);
  for (const x of [41.1, 42.9]) box(S, 0.09, 1, 0.1, x, 1.5, z0 - 0.5, m('metal', 0xcdd3d4));
  box(S, 11, 0.25, 3, 42, 5.15, z0 - 1.2, navy);
  sign(S, 'Panasonic S-CLASS', 27, 1.6, 42, 7.5, z0 - 0.36, Math.PI, { bg: null, fg: '#ffffff', glow: true });
  sign(S, 'Concept Showroom', 14, 0.8, 42, 6.1, z0 - 0.37, Math.PI, { bg: null, fg: '#d5e4eb', glow: true });
  sign(S, 'E / TAP TO ENTER', 5.4, 0.6, 42, 3.3, z0 - 0.51, Math.PI, { bg: '#17364d', fg: '#ffffff' });
  W.zone('showroom-enter', SHOWROOM_DOOR.x, SHOWROOM_DOOR.z, 2.8, 'Enter S-CLASS showroom');
  W.mapRect(x0, x1, z0, z1, '#17364d', 'S-CLASS');
  W.mapLabel(42, -123, 'Showroom');
  buildInterior(W);
}

function buildInterior(W) {
  const { x: X, z: Z, w, d, h: H } = SHOWROOM_INTERIOR;
  const xa = X - w / 2, xb = X + w / 2, za = Z - d / 2, zb = Z + d / 2;
  const area = W.beginArea('panasonic-showroom', { x0: xa, x1: xb, z0: za, z1: zb }, 6);
  const S = W.static;
  const ivory = m('smooth', 0xf1eee6), timber = m('wood', 0xc9a77b), navy = m(0x17364d), steel = m('metal', 0xbdc7cc);
  // Explicit current-area geometry: W.block/slab capture the original global group.
  const solidBox = (ww, hh, dd, x, y, z, mat, cam = true) => {
    box(S, ww, hh, dd, x, y, z, mat);
    return W.solid(x - ww / 2, x + ww / 2, z - dd / 2, z + dd / 2, y, y + hh, cam);
  };
  box(S, w, 0.3, d, X, -0.3, Z, m('tiles', 0xe4ded3));
  W.solid(xa, xb, za, zb, -0.5, 0);
  for (const x of [xa, xb]) solidBox(0.6, H, d, x, 0, Z, ivory);
  for (const z of [za, zb]) solidBox(w, H, 0.6, X, 0, z, ivory);
  solidBox(w, 0.35, d, X, H, Z, ivory);
  box(S, w - 1, 1, 0.1, X, 0, za + 0.36, timber);

  // Reception, kiosk, entrance and exit retain their V0.1 positions.
  solidBox(8, 1.2, 2, X - 22, 0, 16, timber);
  box(S, 8.3, 0.12, 2.2, X - 22, 1.2, 16, ivory);
  sign(S, 'Reception', 5, 0.65, X - 22, 0.7, 14.94, Math.PI, { bg: null, fg: '#17364d' });
  sign(S, 'Panasonic S-CLASS\nConcept Showroom', 20, 2.4, X - 19, 5.6, zb - 0.4, Math.PI, { bg: null, fg: '#17364d' });
  sign(S, 'Five layouts · Two gallery rows', 19, 0.7, X - 19, 3.8, zb - 0.41, Math.PI, { bg: null, fg: '#5a665f' });
  W.zone('showroom:reception', X - 22, 12.4, 2.5, 'Read the showroom guide');
  W.mapRect(X - 26, X - 18, 15, 17, '#b79469', 'Reception');
  box(S, 6, 4.7, 0.14, X, 0, zb - 0.36, navy);
  sign(S, 'EXIT\nReturn to Virtual World', 5.4, 1.4, X, 4, zb - 0.45, Math.PI, { bg: '#17364d', fg: '#ffffff', glow: true });
  W.zone('showroom-exit', X, 23.5, 2.6, 'Leave S-CLASS showroom');
  W.mapLabel(X, 24, 'Exit');

  const exhibits = SHOWROOM_LAYOUTS.map((layout, i) => {
    const { x, z } = layout, open = ['peninsula', 'island'].includes(layout.id);
    const model = buildKitchenModel(W, layout, H);
    showroomFloor(S, open ? 27 : 20, open ? 23 : 24, x, open ? z : -13);
    if (layout.id === 'peninsula') {
      // A low rug supplies living-side context without enclosing the rear.
      box(S, 18, .025, 7, x + 1, .045, z - 9, m(0xb7beb7));
      sign(S, 'OPEN LIVING SIDE', 9, .6, x + 1, 1.1, za + .42, 0, { bg: null, fg: '#485b65' });
    }
    box(S, open ? 24 : 18, .08, .45, x, H - .9, open ? z + 3 : -10, neon(0xfff3d8, .6));
    box(S, .3, .08, open ? 21 : 20, x - (open ? 13 : 10), H - .9, open ? z : -12, neon(0xfff3d8, .6));

    // Boards sit beside the new model extent, clear of its front/return.
    const boardX = x - 10, boardZ = z + 1;
    solidBox(6.8, 5.6, .25, boardX, 0, boardZ, ivory);
    box(S, 6.9, .12, .3, boardX, 5.6, boardZ, timber);
    sign(S, msg('sign.bayHeading', { number: `0${i + 1}`, heading: msg(layout.headingKey) }), 6.4, 1.7, boardX, 4.55, boardZ + .14, 0, { bg: '#17364d', fg: '#ffffff', glow: true });
    sign(S, msg(layout.captionKey), 6.4, 1.45, boardX, 2.9, boardZ + .15, 0, { bg: null, fg: '#17364d' });
    sign(S, 'CONCEPT DISPLAY\nE / TAP FOR DETAILS', 6.4, .95, boardX, 1.45, boardZ + .15, 0, { bg: null, fg: '#485b65' });
    const approach = { x, z: open ? z + 14 : -1 };
    W.zone(`showroom:layout:${layout.id}`, approach.x, approach.z, 2.4, msg('showroom.explore', { layout: msg(layout.titleKey) }));
    W.mapRect(x - (open ? 13.5 : 10), x + (open ? 13.5 : 10), open ? z - 11.5 : -25, open ? z + 11.5 : -1, '#cbb393');
    W.mapLabel(x, layout.id === 'ii' ? -8 : z - (open ? 8 : 4), msg(layout.headingKey), { compact: ['01 I', '02 II', '03 L', '04', '05'][i], priority: 2 });
    for (const row of model.counters) W.mapRect(row.x0, row.x1, row.z0, row.z1, '#ecebe5');
    for (const wall of model.context) W.mapRect(wall.x0, wall.x1, wall.z0, wall.z1, '#68777c');

    // Fixture/run transforms supply world coordinates before static baking.
    for (const [id, fixture] of Object.entries(model.fixtures)) {
      const { label, station } = fixture;
      sign(S, msg(PRODUCTS[id].titleKey), id === 'hood' ? 2.1 : 1.8, .33, label.x, .88, label.z, label.yaw, { bg: '#17364d', fg: '#ffffff' });
      W.zone(`showroom:product:${layout.id}:${id}`, station.x, station.z, 1.1, msg('showroom.learn', { product: msg(PRODUCTS[id].titleKey) }));
    }
    return { id: layout.id, appLayoutId: layout.appLayoutId, get title() { return layout.title; }, x, z, rows: model.counters.length, approach, board: { x: boardX, z: boardZ }, mainZ: z, ...model };
  });

  // Wayfinding is geometry in this same area, not another interaction system.
  for (const [x, yaw] of [[xa + 0.42, Math.PI / 2], [xb - 0.42, -Math.PI / 2]]) {
    sign(S, 'SECOND GALLERY\n04 Peninsula · 05 Island', 12, 1.5, x, 4.8, -30, yaw, { bg: '#17364d', fg: '#ffffff', glow: true });
  }
  W.mapLabel(X, -30, 'Gallery 2');
  solidBox(4.5, 1.1, 2.2, X + 22, 0, 16, navy);
  box(S, 4.6, 0.1, 2.3, X + 22, 1.1, 16, timber);
  box(S, 0.25, 1.5, 0.25, X + 22, 1.2, 16.5, steel);
  box(S, 4.2, 2.1, 0.22, X + 22, 2.3, 16.5, navy);
  sign(S, 'S-CLASS\nKitchen & Training', 3.8, 1.6, X + 22, 3.35, 16.35, Math.PI, { bg: '#17364d', fg: '#ffffff', glow: true });
  sign(S, 'Continue in the kitchen experience', 17, 0.8, X + 19, 5.6, zb - 0.41, Math.PI, { bg: null, fg: '#17364d' });
  sign(S, 'Concept gallery · Not installation guidance', 26, 0.7, X, 6.9, zb - 0.42, Math.PI, { bg: null, fg: '#485b65' });
  W.zone('showroom:kiosk', X + 22, 12.6, 2.5, 'Open the S-CLASS kiosk');
  W.mapRect(X + 19.7, X + 24.3, 14.9, 17.1, '#17364d', 'Kiosk');
  W.indoors.push({ x0: xa, x1: xb, z0: za, z1: zb, h: H, interior: true });
  W.refs.showroom = { exterior: SHOWROOM, interior: SHOWROOM_INTERIOR, area, exhibits };
  W.endArea();
}

function visitSnapshot(game) {
  return { position: game.player.pos.clone(), heading: game.player.heading, cam: { ...game.cam, target: game.cam.target.clone() }, view: game.view };
}

function transition(game, mid) {
  if (game.transitioning || ui.modalOpen) return;
  game.transitioning = true;
  const resume = game.controls.suspend();
  game.player.vel.set(0, 0, 0);
  if (!game.fadeTo(() => { try { mid(); } finally { game.transitioning = false; resume(); } })) {
    game.transitioning = false;
    resume();
  }
}

export function enterShowroom(game) {
  const outside = visitSnapshot(game);
  transition(game, () => {
    game.showroomVisit = outside;
    game.player.teleport(SHOWROOM_SPAWN.x, 0, SHOWROOM_SPAWN.z, SHOWROOM_SPAWN.heading);
    Object.assign(game.cam, { yaw: 0, pitch: 0.25, dist: 11 });
    game.snapCamera();
    document.body.classList.add('in-showroom');
    ui.toast('Welcome to the S-CLASS showroom');
  });
}

export function leaveShowroom(game) {
  transition(game, () => {
    const saved = game.showroomVisit;
    const p = saved?.position || { ...SHOWROOM_DOOR, y: 0.2 };
    game.player.teleport(p.x, p.y, p.z, saved?.heading ?? Math.PI);
    if (saved) { Object.assign(game.cam, saved.cam); game.view = saved.view; }
    else game.snapCamera();
    game.showroomVisit = null;
    document.body.classList.remove('in-showroom');
    ui.toast('Back in Virtual World');
  });
}

export function openShowroomInfo(game, id, zone) {
  if (game.transitioning) return;
  ui.closePanel();
  const resume = game.controls.suspend();
  game.player.vel.set(0, 0, 0);
  const layout = id.startsWith('layout:') ? SHOWROOM_LAYOUTS.find(l => l.id === id.slice(7)) : null;
  const product = PRODUCTS[id.split(':').at(-1)];
  if (!['kiosk', 'reception'].includes(id) && !layout && !product) { resume(); return; }
  const body = h('');
  const render = () => {
    let title, copy;
    if (id === 'kiosk') {
      const url = kitchenExperienceUrl();
      title = t('showroom.kioskTitle');
      copy = `<p>${t('showroom.kioskCopy')}</p><p>${t('showroom.chooseLayout')}</p><p>${t('showroom.chooseLanguage')}</p>`;
      const action = url ? `<a class="btn wide link" id="showroom-kitchen-link" href="${url}" target="_blank" rel="noopener noreferrer">${t('showroom.launch')}</a>` : `<button class="btn wide" disabled>${t('showroom.launch')}</button><p role="status">${t('showroom.unavailable')}</p>`;
      body.innerHTML = `<div class="showroom-panel"><p class="showroom-eyebrow">${t('showroom.continueVisit')}</p>${copy}${action}<p class="showroom-notice">${t('showroom.concept')}</p></div>`;
    } else {
      if (id === 'reception') { title = t('showroom.receptionTitle'); copy = ['purpose', 'route', 'how', 'return'].map(key => `<p>${t(`showroom.${key}`)}</p>`).join(''); }
      else if (layout) { title = t('showroom.layoutTitle', { layout: layout.title }); copy = `<p>${layout.text}</p>`; }
      else { title = product.title; copy = `<p>${product.text}</p><p>${t('showroom.more')}</p>`; }
      const guide = id === 'reception' ? `<div class="showroom-product-links" aria-label="${t('showroom.five')}">${SHOWROOM_LAYOUTS.map(l => `<button class="btn ghost" data-showroom-layout="${l.id}">${l.title}</button>`).join('')}</div>` : '';
      body.innerHTML = `<div class="showroom-panel"><p class="showroom-eyebrow">${t('showroom.eyebrow')}</p>${copy}${guide}<div class="showroom-product-links" aria-label="${t('showroom.products')}">${Object.entries(PRODUCTS).map(([key, p]) => `<button class="btn ghost" data-showroom-product="${key}">${p.title}</button>`).join('')}</div><button class="btn wide" data-showroom-kiosk>${t('showroom.kioskAction')}</button><p class="showroom-notice">${t('showroom.concept')}</p></div>`;
    }
    return { kicker: 'Panasonic S-CLASS', title };
  };
  body.addEventListener('click', (e) => {
    const product = e.target.closest('[data-showroom-product]');
    const layout = e.target.closest('[data-showroom-layout]');
    if (product) openShowroomInfo(game, `product:${product.dataset.showroomProduct}`, zone);
    else if (layout) openShowroomInfo(game, `layout:${layout.dataset.showroomLayout}`, zone);
    else if (e.target.closest('[data-showroom-kiosk]')) openShowroomInfo(game, 'kiosk', zone);
  });
  ui.prompt(null);
  ui.openPanel({ ...render(), body, zone, modal: true, onClose: resume, render });
}
