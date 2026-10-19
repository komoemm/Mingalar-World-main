import { join } from 'node:path';

// Paths use the actual collision grid and the ordinary movement/update code.
// Only screenshot placement uses teleport; the walking tour never does.
export async function runFiveBayChecks({ page, scene, verify, evidenceRoot }) {
  const layouts = await page.evaluate(() => __game.world.refs.showroom.exhibits);
  const expected = { i: ['type-i', 'I-Type (Straight)'], ii: ['type-ii', 'II-Type (Parallel)'], l: ['type-l', 'L-Type (Corner)'], peninsula: ['face-to-face', 'Face to Face (Peninsula)'], island: ['island', 'Island (Center)'] };
  verify(layouts.length === 5 && new Set(layouts.map((l) => l.appLayoutId)).size === 5 && layouts.every((l) => expected[l.id]?.[0] === l.appLayoutId && expected[l.id]?.[1] === l.title), 'Five distinct canonical application mappings and display titles', layouts);
  const geometry = await page.evaluate(() => {
    const W = __game.world, bays = W.refs.showroom.exhibits;
    const inside = (p, b) => p.x > b.x0 && p.x < b.x1 && p.z > b.z0 && p.z < b.z1;
    const real = (b) => W.colliders.some((c) => Object.keys(c).every((k) => c[k] === b[k]));
    const touching = (a, b) => a.x0 <= b.x1 + .02 && a.x1 >= b.x0 - .02 && a.z0 <= b.z1 + .02 && a.z1 >= b.z0 - .02;
    const [i, ii, l, p, island] = bays;
    return {
      registered: bays.every((b) => [...b.counters, ...b.context].every(real)),
      i: i.counters.length === 1 && inside(i.sink, i.counters[0]) && inside(i.cooktop, i.counters[0]) && touching(i.counters[0], i.context[0]),
      ii: ii.counters.length === 2 && inside(ii.sink, ii.counters[1]) && inside(ii.cooktop, ii.counters[0]) && ii.counters[1].z0 - ii.counters[0].z1 > 1.2,
      l: l.counters.length === 2 && touching(...l.counters) && inside(l.sink, l.counters[0]) && inside(l.cooktop, l.counters[1]) && l.context.length === 2,
      peninsula: p.context.length === 1 && touching(p.counters[0], p.context[0]) && p.context[0].x1 <= p.counters[0].x0 + .02 && inside(p.sink, p.counters[0]) && inside(p.cooktop, p.counters[0]),
      island: island.context.length === 0 && inside(island.sink, island.counters[0]) && inside(island.cooktop, island.counters[0]) && !W.colliders.some((c) => c.y0 < 2.7 && c.y1 > 2 && touching(c, island.counters[0])),
      map: bays.every((b) => W.map.labels.some((label) => label.text.replace('\n', ' ') === b.title)),
    };
  });
  for (const [name, ok] of Object.entries(geometry)) verify(ok, `Actual registered geometry / minimap: ${name}`, geometry);

  await page.evaluate(() => {
    window.__walkShowroomTo = (tx, tz) => {
      const g = __game, W = g.world, a = W.refs.showroom.area;
      const blockers = W.colliders.filter((c) => c.y0 < 2.7 && c.y1 > .42 && c.x1 >= a.x0 && c.x0 <= a.x1 && c.z1 >= a.z0 && c.z0 <= a.z1);
      // Leave orbit room beside tall partitions/boards, beyond the avatar radius.
      const free = (x, z) => x > a.x0 + 1.8 && x < a.x1 - 1.8 && z > a.z0 + 1.8 && z < a.z1 - 1.8 && !blockers.some((c) => { const margin = c.y1 > 2.7 ? 1.65 : .8; return x > c.x0 - margin && x < c.x1 + margin && z > c.z0 - margin && z < c.z1 + margin; });
      const key = (x, z) => `${x},${z}`;
      const start = [Math.round(g.player.pos.x), Math.round(g.player.pos.z)], goal = [Math.round(tx), Math.round(tz)];
      if (!free(...start) || !free(...goal)) return { arrived: false, error: 'blocked endpoint', start, goal };
      const queue = [start], previous = new Map([[key(...start), null]]);
      for (let q = 0; q < queue.length && !previous.has(key(...goal)); q++) {
        const [x, z] = queue[q];
        for (const [dx, dz] of [[1,0],[-1,0],[0,1],[0,-1]]) {
          const next = [x + dx, z + dz], k = key(...next);
          if (previous.has(k) || !free(...next)) continue;
          previous.set(k, queue[q]); queue.push(next);
        }
      }
      if (!previous.has(key(...goal))) return { arrived: false, error: 'no walkable route', start, goal };
      const path = [];
      for (let p = goal; p; p = previous.get(key(...p))) path.unshift(p);
      // Collapse straight grid segments, retaining corners to avoid cutting walls.
      const route = path.filter((p, i) => i === path.length - 1 || (i && (p[0] - path[i-1][0] !== path[i+1][0] - p[0] || p[1] - path[i-1][1] !== path[i+1][1] - p[1])));
      route.push([tx, tz]);
      g.controls.clear(); g.view = 'third'; g.cam.dist = 8; g.cam.pitch = .3;
      let steps = 0, maxY = g.player.pos.y, distance = 0, blockedCameraFrames = 0;
      const cameraExamples = [];
      for (const [x, z] of route) {
        let frames = 0;
        while (Math.hypot(x - g.player.pos.x, z - g.player.pos.z) > .14 && frames++ < 1800) {
          const dx = x - g.player.pos.x, dz = z - g.player.pos.z;
          g.cam.yaw = Math.atan2(-dx, -dz); g.controls.keys.add('KeyW');
          const old = g.player.pos.clone(); g.update(1 / 60);
          distance += old.distanceTo(g.player.pos); maxY = Math.max(maxY, g.player.pos.y); steps++;
          const camera = g.camera.position;
          const blocker = W.near(camera.x, camera.z).find((c) => c.cam && camera.x > c.x0 && camera.x < c.x1 && camera.y > c.y0 && camera.y < c.y1 && camera.z > c.z0 && camera.z < c.z1);
          if (blocker) { blockedCameraFrames++; if (cameraExamples.length < 4) cameraExamples.push({ camera: camera.toArray(), player: g.player.pos.toArray(), blocker }); }
        }
        g.controls.clear(); g.player.vel.set(0, 0, 0);
        if (frames >= 1800) return { arrived: false, error: 'movement blocked', x, z, position: g.player.pos.toArray() };
      }
      g.update(1 / 60);
      return { arrived: Math.hypot(tx - g.player.pos.x, tz - g.player.pos.z) < .2, distance: +distance.toFixed(2), steps, maxY, blockedCameraFrames, cameraExamples, prompt: document.getElementById('prompt').textContent, position: g.player.pos.toArray() };
    };
  });
  const walk = async (x, z, label, zone) => {
    const result = await page.evaluate(([x, z]) => __walkShowroomTo(x, z), [x, z]);
    const labelText = zone ? await page.evaluate((id) => __game.world.zones.find((z) => z.id === id)?.label, zone) : null;
    verify(result.arrived && result.maxY < .42 && result.blockedCameraFrames === 0 && (!zone || result.prompt.includes(labelText)), `Walk without jumping / camera obstruction: ${label}`, result);
    if (!result.arrived) throw new Error(`${label}: ${JSON.stringify(result)}`);
  };
  const open = async (title) => {
    await page.evaluate(() => __game.update(1 / 60));
    await page.locator('#game').focus(); await page.keyboard.press('e');
    verify(await page.locator('#panel-title').textContent() === title, `E opens ${title}`);
  };
  const close = async () => { await page.keyboard.press('Escape'); };
  for (const bay of layouts) {
    await walk(bay.approach.x, bay.approach.z, bay.title, `showroom:layout:${bay.id}`);
    await open(`${bay.title} concept`);
    verify((await page.locator('#panel-body').innerText()).includes('Concept display only.'), `${bay.title}: full concept qualification is accessible`);
    await close();
    for (const [id, title] of [['sink','Sink'],['cooktop','Cooktop'],['hood','Range Hood']]) {
      const zone = await page.evaluate((id) => { const z = __game.world.zones.find((z) => z.id === id); return { x: z.x, z: z.z }; }, `showroom:product:${bay.id}:${id}`);
      await walk(zone.x, zone.z, `${bay.id} / ${title}`, `showroom:product:${bay.id}:${id}`);
      await open(title); await close();
    }
  }
  const peninsula = layouts.find((l) => l.id === 'peninsula');
  await walk(peninsula.x + 9, peninsula.z + 6, 'Peninsula free end');
  await walk(peninsula.x + 9, peninsula.z - 6, 'Peninsula open rear via free end');
  await scene('gallery/16-peninsula-open-side', `(() => { const g=__game; Object.assign(g.cam,{yaw:Math.atan2(g.player.pos.x-(${peninsula.x}),g.player.pos.z-(${peninsula.z})),pitch:.3,dist:8}); g.snapCamera(); })()`);
  await walk(peninsula.x, peninsula.z - 6, 'Peninsula living side');
  const island = layouts.find((l) => l.id === 'island');
  // An uninterrupted rectangle around the island: movement goes through all four sides.
  for (const [dx, dz, label] of [[-9,6,'front-left'],[9,6,'front'],[9,-6,'right end'],[-9,-6,'rear'],[-9,6,'left end']]) {
    await walk(island.x + dx, island.z + dz, `Island ${label}`);
    if (label === 'right end') await scene('gallery/17-island-all-around', `(() => { const g=__game; Object.assign(g.cam,{yaw:Math.atan2(g.player.pos.x-(${island.x}),g.player.pos.z-(${island.z})),pitch:.3,dist:8}); g.snapCamera(); })()`);
  }
  await walk(4222, 12.6, 'kiosk', 'showroom:kiosk');
  await open('S-CLASS Kitchen & Training'); await close();
  await walk(4178, 12.4, 'reception', 'showroom:reception');
  await open('Welcome to the showroom');
  verify(JSON.stringify(await page.locator('[data-showroom-layout]').allTextContents()) === JSON.stringify(layouts.map((l) => l.title)), 'Reception guide lists all five canonical concepts');
  await page.screenshot({ path: join(evidenceRoot, '10-five-layout-guide.png'), animations: 'disabled' });
  for (const bay of layouts) {
    await page.locator(`[data-showroom-layout="${bay.id}"]`).click();
    verify(await page.locator('#panel-title').textContent() === `${bay.title} concept`, `Reception opens ${bay.title} full description`);
    await close(); await open('Welcome to the showroom');
  }
  await close();
  await walk(4200, 23.5, 'marked exit', 'showroom-exit');

  // Standard 11-unit third-person distance and eye-level first-person views.
  for (const bay of layouts) {
    for (const view of ['third', 'first']) {
      if (await page.evaluate(() => __game.view) !== view) { await page.locator('#game').focus(); await page.keyboard.press('v'); }
      // Let the native pointer-lock request settle, then release it for deterministic
      // evidence framing. Dialog pointer-lock behavior is tested separately.
      await page.waitForTimeout(200);
      await page.evaluate(() => __game.controls.unlock());
      await page.waitForFunction(() => !document.pointerLockElement, null, { timeout: 5000 });
      verify(await page.locator('#btn-view').textContent().then((s) => s.includes(view === 'first' ? '1st' : '3rd')), `${bay.id}: native ${view}-person view and HUD agree`);
      await scene(`gallery/11-${bay.id}-${view}`, `(() => { const g=__game; g.controls.clear(); g.player.teleport(${bay.approach.x},0,${bay.approach.z},Math.PI); Object.assign(g.cam,{yaw:${view === 'first' ? .12 : 0},pitch:${view === 'first' ? -.04 : .26},dist:11}); g.snapCamera(); })()`);
      verify(await page.evaluate(({view})=>__game.view===view && Math.abs(__game.cam.pitch-(view==='first'?-.04:.26))<.02 && Math.abs(__game.cam.yaw-(view==='first'?.12:0))<.02,{view}), `${bay.id}: settled ${view}-person evidence preserves its intended framing`);
      verify(await page.evaluate(() => { const g=__game,p=g.camera.position; return !g.world.near(p.x,p.z).some(c=>c.cam && p.x>c.x0 && p.x<c.x1 && p.y>c.y0 && p.y<c.y1 && p.z>c.z0 && p.z<c.z1); }), `${bay.id}: settled ${view}-person camera clears all model/upper/Hood colliders`);
    }
  }
  await page.locator('#game').focus(); await page.keyboard.press('v');
  await scene('gallery/12-overview', `(() => { const g=__game; g.player.teleport(4192,0,-32,Math.PI); Object.assign(g.cam,{yaw:0,pitch:.35,dist:24}); g.snapCamera(); })()`);
  await scene('gallery/13-minimap-center', `(() => { const g=__game; g.player.teleport(4200,0,-28,Math.PI); Object.assign(g.cam,{yaw:0,pitch:.26,dist:8}); g.snapCamera(); })()`);
  await page.locator('#minimap-canvas').screenshot({ path: join(evidenceRoot, '13-five-bay-minimap.png') });
  await scene('gallery/14-first-row-overview', `(() => { const g=__game; g.player.teleport(4195,0,10,Math.PI); Object.assign(g.cam,{yaw:0,pitch:.28,dist:14}); g.snapCamera(); })()`);
}
