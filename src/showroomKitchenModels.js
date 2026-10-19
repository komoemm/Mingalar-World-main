// Closed architectural exhibits. Dimensions are internal world units, not catalog data.
import * as THREE from 'three';
import { box, rbox, cyl, drawTexture, seeded } from './builders.js';
import { m, mergeable } from './gfx.js';

export const KITCHEN_SCALE = Object.freeze({ width: 9.6, depth: 2.1, openDepth: 3.3, top: 1.54, slab: .10, plinth: .18, upperBase: 3.1, upperHeight: 1.35, upperDepth: .85 });
let palette;
export function showroomMaterials() {
  if (palette) return palette;
  // Each batching class has exactly one roughness/metalness/map combination.
  const material = (color, roughness, metalness, cls) => mergeable(m('smooth', color, { roughness, metalness }), `showroom-v03-${cls}`);
  const oak = drawTexture(256, 256, (g, w, h) => {
    const random = seeded(303);
    g.fillStyle = '#f1eee8'; g.fillRect(0, 0, w, h);
    for (let p = 0; p < 8; p++) {
      const shade = 236 + Math.floor(random() * 10), x = p * 32;
      g.fillStyle = `rgb(${shade},${shade},${shade})`; g.fillRect(x, 0, 32, h);
      g.fillStyle = 'rgba(100,90,70,.08)'; g.fillRect(x, 0, .7, h);
      g.fillRect(x, Math.floor(random() * h), 32, .6);
      g.strokeStyle = 'rgba(100,90,70,.045)'; g.lineWidth = .5;
      for (let i = 0; i < 12; i++) { const xx = x + random() * 32; g.beginPath(); g.moveTo(xx, 0); g.bezierCurveTo(xx + 1.5, 80, xx - 1.5, 160, xx, h); g.stroke(); }
    }
  });
  oak.wrapS = oak.wrapT = THREE.RepeatWrapping;
  palette = {
    front: material(0xe9e9e4, .72, 0, 'matte'), carcass: material(0xd1d3d0, .72, 0, 'matte'),
    wall: material(0xefede7, .72, 0, 'matte'), worktop: material(0xf5f2e8, .38, 0, 'stone'),
    steel: material(0x949c9f, .42, .65, 'steel'), handle: material(0x49535a, .42, .65, 'steel'),
    glass: material(0x17212a, .16, .25, 'glass'), zone: material(0x52616a, .42, .65, 'steel'),
    recess: material(0x424b50, .82, 0, 'recess'), floor: material(0xd7bd96, .8, 0, 'oak'),
  };
  palette.floor.map = oak;
  return palette;
}

export function localPoint(run, dx = 0, dz = 0) {
  return { x: run.x + dx * Math.cos(run.yaw) + dz * Math.sin(run.yaw), z: run.z - dx * Math.sin(run.yaw) + dz * Math.cos(run.yaw) };
}

export function showroomFloor(S, width, depth, x, z) {
  const mesh = box(S, width, .035, depth, x, .005, z, showroomMaterials().floor);
  mesh.geometry = mesh.geometry.clone();
  const uv = mesh.geometry.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * width / 4, uv.getY(i) * depth / 4);
  return mesh;
}

export function buildKitchenModel(W, layout, ceiling = 10) {
  const S = W.static, M = showroomMaterials(), K = KITCHEN_SCALE;
  const isL = layout.id === 'l', isII = layout.id === 'ii', open = ['peninsula', 'island'].includes(layout.id);
  const depth = open ? K.openDepth : K.depth;
  const counters = [], runs = [], uppers = [], tops = [], context = [], fixtures = {};
  const groupFor = (run) => { const g = new THREE.Group(); g.position.set(run.x, 0, run.z); g.rotation.y = run.yaw; S.add(g); return g; };
  const bounds = (run, width, dd, y0, y1) => {
    const sideways = Math.abs(Math.sin(run.yaw)) > .5, w = sideways ? dd : width, d = sideways ? width : dd;
    return W.solid(run.x - w / 2, run.x + w / 2, run.z - d / 2, run.z + d / 2, y0, y1, true);
  };
  const panel = (g, width, height, x, y, z) => {
    box(g, width - .035, height, .055, x, y, z, M.front);
    box(g, Math.min(.72, width * .55), .035, .06, x, y + height - .12, z + .058, M.handle);
  };
  const cabinet = (g, left, width, dd, kind = 'drawers') => {
    const x = left + width / 2;
    // Hollow carcass leaves room below the actual open sink basin.
    box(g, width, .07, dd - .1, x, K.plinth, 0, M.carcass);
    for (const side of [left + .04, left + width - .04]) box(g, .08, 1.19, dd - .08, side, .25, 0, M.carcass);
    const heights = kind === 'drawers' ? [.25, .45, .45] : [1.19];
    let y = 1.44;
    for (const height of heights) { y -= height; panel(g, width, height, x, y, dd / 2 + .022); y -= .025; }
  };
  const slab = (run, g, left, right, back, front) => {
    if (right - left < .001 || front - back < .001) return;
    rbox(g, right - left, K.slab, front - back, (left + right) / 2, K.top - K.slab, (back + front) / 2, M.worktop, .022);
    const a = localPoint(run, left, back), b = localPoint(run, right, front);
    tops.push({ x0: Math.min(a.x, b.x), x1: Math.max(a.x, b.x), z0: Math.min(a.z, b.z), z1: Math.max(a.z, b.z), y: K.top, run: run.id });
  };
  const sink = (run, g, dx) => {
    const ww = 2.35, dd = 1.40, wall = .065, bottom = K.top - .43;
    // Worktop is assembled around this opening, with no slab under its rim.
    for (const xx of [-ww / 2, ww / 2]) box(g, wall, .39, dd, dx + xx, bottom, 0, M.steel);
    for (const zz of [-dd / 2, dd / 2]) box(g, ww, .39, wall, dx, bottom, zz, M.steel);
    rbox(g, ww, .055, dd, dx, bottom, 0, M.steel, .018);
    for (const xx of [-ww / 2, ww / 2]) box(g, .10, .025, dd + .1, dx + xx, K.top, 0, M.steel);
    for (const zz of [-dd / 2, dd / 2]) box(g, ww + .1, .025, .10, dx, K.top, zz, M.steel);
    cyl(g, .12, .012, dx, bottom + .056, 0, M.recess, 12);
    cyl(g, .075, .015, dx, bottom + .068, 0, M.steel, 10);
    cyl(g, .055, .57, dx, K.top, -.88, M.steel, 10);
    box(g, .075, .075, .52, dx, K.top + .51, -.63, M.steel);
    cyl(g, .045, .12, dx, K.top + .41, -.40, M.steel, 8);
    box(g, .24, .035, .045, dx + .10, K.top + .22, -.88, M.handle);
    fixtures.sink = { ...localPoint(run, dx), yaw: run.yaw, run: run.id, bottom: bottom + .055, rim: K.top + .025, opening: { width: ww - wall, depth: dd - wall }, label: { ...localPoint(run, dx, run.depth / 2 + .10), yaw: run.yaw }, station: localPoint(run, dx, run.depth / 2 + 2.2) };
  };
  const cooking = (run, g, dx, hoodKind) => {
    rbox(g, 2.5, .065, 1.45, dx, K.top + .012, 0, M.glass, .028);
    for (const xx of [-.78, 0, .78]) {
      cyl(g, .29, .010, dx + xx, K.top + .078, -.12, M.zone, 16);
      cyl(g, .266, .011, dx + xx, K.top + .088, -.12, M.glass, 16);
      cyl(g, .025, .012, dx + xx, K.top + .079, .53, M.steel, 8);
    }
    const canopyY = 3.08;
    box(g, 2.7, .12, 1.65, dx, canopyY, -.16, M.steel);
    box(g, 2.36, .035, 1.34, dx, canopyY - .035, -.13, M.recess);
    for (const zz of [-.58, -.28, .02, .32]) box(g, 1.85, .018, .025, dx, canopyY - .05, zz, M.steel);
    const hood = { ...localPoint(run, dx, -.16), yaw: run.yaw, kind: hoodKind, bottom: canopyY - .05 };
    if (hoodKind === 'wall') {
      box(g, 2.35, 1.25, .88, dx, canopyY + .12, -run.depth / 2 + .44, M.steel);
      hood.collider = bounds({ ...run, ...localPoint(run, dx, -.38) }, 2.7, 1.65, canopyY - .05, 4.45);
    } else {
      box(g, .38, ceiling - canopyY - .12, .44, dx, canopyY + .12, -.35, M.steel);
      box(g, .95, .10, 1, dx, ceiling - .10, -.35, M.steel);
      hood.collider = bounds({ ...run, ...localPoint(run, dx, -.16) }, 2.7, 1.65, canopyY - .05, canopyY + .12);
      hood.support = { base: canopyY + .12, top: ceiling };
    }
    fixtures.cooktop = { ...localPoint(run, dx), yaw: run.yaw, run: run.id, label: { ...localPoint(run, dx, run.depth / 2 + .10), yaw: run.yaw }, station: localPoint(run, dx, run.depth / 2 + 2.2) };
    fixtures.hood = { ...hood, run: run.id, label: { ...localPoint(run, dx - 2.7, run.depth / 2 + .10), yaw: run.yaw }, station: localPoint(run, dx - 2.7, run.depth / 2 + 2.2) };
  };
  const upperBank = (run, g, left, right) => {
    const count = Math.max(1, Math.round((right - left) / 1.3)), width = (right - left) / count;
    for (let i = 0; i < count; i++) {
      const x = left + (i + .5) * width, z = -run.depth / 2 + K.upperDepth / 2;
      box(g, width - .025, K.upperHeight, K.upperDepth, x, K.upperBase, z, M.carcass);
      panel(g, width, K.upperHeight - .035, x, K.upperBase + .018, z + K.upperDepth / 2 + .015);
      uppers.push(bounds({ ...run, ...localPoint(run, x, z) }, width, K.upperDepth + .12, K.upperBase, K.upperBase + K.upperHeight));
    }
  };
  const run = (id, x, z, width, dd, yaw, sinkX = null, cookX = null, wall = false, faceLength = width, frontTop = dd / 2 + .05) => {
    const data = { id, x, z, width, depth: dd, yaw, finishedEnds: true, finishedRear: true }, g = groupFor(data);
    const collider = bounds(data, width + .10, dd + .10, 0, K.top);
    counters.push(collider); runs.push(data);
    box(g, width - .12, K.plinth, dd - .30, 0, 0, -.05, M.recess);
    box(g, width, 1.26, .065, 0, K.plinth, -dd / 2, M.front);
    for (const xx of [-width / 2, width / 2]) box(g, .065, 1.26, dd, xx, K.plinth, 0, M.front);
    const modules = faceLength === K.width ? [3.6, 2.6, 3.4] : isL && id === 'main' ? [3.6, faceLength - 3.6] : Array(Math.max(1, Math.round(faceLength / 2))).fill(faceLength / Math.max(1, Math.round(faceLength / 2)));
    let left = -width / 2;
    modules.forEach((ww, i) => { cabinet(g, left, ww, dd, i === 1 ? 'door' : 'drawers'); left += ww; });
    // Close the blind corner without adding doors/handles hidden by the return.
    if (faceLength < width) box(g, width - faceLength, 1.19, .055, width / 2 - (width - faceLength) / 2, .25, dd / 2, M.carcass);
    const back = -dd / 2 - .05;
    if (sinkX !== null) {
      const l = sinkX - 1.19, r = sinkX + 1.19;
      slab(data, g, -width / 2 - .05, l, back, frontTop); slab(data, g, r, width / 2 + .05, back, frontTop);
      slab(data, g, l, r, back, -.72); slab(data, g, l, r, .72, frontTop);
      sink(data, g, sinkX);
    } else slab(data, g, -width / 2 - .05, width / 2 + .05, back, frontTop);
    if (wall) {
      // Local rear wall and calm, flat backsplash; no global material mutation.
      const cornerExtension = isL && id === 'return' ? K.depth + .05 : 0;
      box(g, width + .45 + cornerExtension, 4.65, .25, -cornerExtension / 2, 0, -dd / 2 - .175, M.wall);
      context.push(bounds({ ...data, ...localPoint(data, -cornerExtension / 2, -dd / 2 - .175) }, width + .45 + cornerExtension, .25, 0, 4.65));
      box(g, width, 1.47, .035, 0, K.top, -dd / 2 + .008, M.worktop);
      if (cookX === null) upperBank(data, g, -width / 2, isL ? width / 2 - K.upperDepth : width / 2);
      else {
        if (cookX - 1.38 > -width / 2 + .2) upperBank(data, g, -width / 2 - (isL && id === 'return' ? K.depth + .10 : 0), cookX - 1.38);
        if (cookX + 1.38 < width / 2 - .2) upperBank(data, g, cookX + 1.38, width / 2);
      }
    }
    if (cookX !== null) cooking(data, g, cookX, wall ? 'wall' : 'suspended');
    return data;
  };
  run('main', layout.x, layout.z, K.width, depth, 0, isII ? null : -2.7, isL ? null : 2.55, !open, isL ? K.width - K.depth : K.width);
  if (isII) run('sink-row', layout.x, -6, K.width, K.depth, Math.PI, -2.7);
  if (isL) {
    // Return starts exactly at the main slab's front edge; no overlapping tops.
    const length = 6.4, x = layout.x + (K.width - K.depth) / 2, z = layout.z + K.depth / 2 + .05 + (length + .10) / 2;
    run('return', x, z, length, K.depth, -Math.PI / 2, null, 1.25, true, length, K.depth / 2 + .05);
  }
  if (layout.id === 'peninsula') {
    const wallX = layout.x - (K.width + .10) / 2 - .20;
    box(S, .4, 4.65, 5.5, wallX, 0, layout.z, M.wall);
    context.push(W.solid(wallX - .20, wallX + .20, layout.z - 2.75, layout.z + 2.75, 0, 4.65, true));
  }
  return { counters, context, runs, uppers, tops, fixtures, sink: fixtures.sink, cooktop: fixtures.cooktop, hood: fixtures.hood, scale: K };
}
