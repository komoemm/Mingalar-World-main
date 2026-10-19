// Production-browser extension to smoke.mjs. Evidence remains under ignored tests/out/.
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { runFiveBayChecks } from './showroomV02.mjs';
import { runReferenceModelChecks } from './showroomV03.mjs';

export async function installShowroomProbe(page) {
  await page.addInitScript(() => {
    const evidence = window.__showroomEvidence = { texts: new Set(), raf: new Set(), listeners: new Map() };
    const drawText = CanvasRenderingContext2D.prototype.fillText;
    CanvasRenderingContext2D.prototype.fillText = function(text, ...args) {
      if (evidence.texts.size < 1000) evidence.texts.add(String(text));
      return drawText.call(this, text, ...args);
    };
    const raf = window.requestAnimationFrame.bind(window), cancel = window.cancelAnimationFrame.bind(window);
    window.requestAnimationFrame = (fn) => {
      const id = raf((t) => { evidence.raf.delete(id); fn(t); });
      evidence.raf.add(id); return id;
    };
    window.cancelAnimationFrame = (id) => { evidence.raf.delete(id); cancel(id); };
    const add = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      if (this === window || this === document) {
        const key = `${this === window ? 'window' : 'document'}:${type}`;
        evidence.listeners.set(key, (evidence.listeners.get(key) || 0) + 1);
      }
      return add.call(this, type, listener, options);
    };
  });
}

export async function runShowroomChecks({ browser, page, scene, check, out }) {
  const evidenceRoot = join(out, 'gallery');
  mkdirSync(evidenceRoot, { recursive: true });
  const checks = [], profiles = [], remote = {};
  const verify = (ok, text, detail = null) => { checks.push({ status: ok ? 'PASS' : 'FAIL', text, detail }); check(ok, text); if (!ok && detail) console.log('    ' + JSON.stringify(detail)); };
  const state = () => page.evaluate(() => {
    const g = __game;
    return { pos: g.player.pos.toArray(), heading: g.player.heading, view: g.view, mode: g.mode, cam: { yaw: g.cam.yaw, pitch: g.cam.pitch, dist: g.cam.dist, target: g.cam.target.toArray() }, camera: g.camera.position.toArray(), look: g.player.av.look };
  });
  const locate = async (target, x, z, yaw = 0, pitch = 0.35, dist = 11) => {
    await target.evaluate(({ x, z, yaw, pitch, dist }) => {
      const g = __game;
      g.controls.clear(); g.player.teleport(x, 0.2, z, yaw + Math.PI);
      Object.assign(g.cam, { yaw, pitch, dist }); g.snapCamera();
      for (let i = 0; i < 30; i++) g.update(1 / 60);
    }, { x, z, yaw, pitch, dist });
  };
  const useE = async () => { await page.locator('#game').focus(); await page.keyboard.press('e'); };
  const enter = async (target = page, touch = false) => {
    await locate(target, 42, -123, Math.PI);
    if (touch) await target.locator('#prompt').tap(); else await useE();
    await target.waitForFunction(() => __game.player.pos.x > 4150 && !__game.transitioning);
    await target.waitForTimeout(500);
  };
  const leave = async (target = page, touch = false) => {
    await locate(target, 4200, 23.5, Math.PI);
    if (touch) await target.locator('#prompt').tap(); else await useE();
    await target.waitForFunction(() => __game.player.pos.x < 100 && !__game.transitioning);
    await target.waitForTimeout(500);
  };
  const listenerBaseline = await page.evaluate(() => [...__showroomEvidence.listeners]);
  verify(await page.title() === 'Virtual World', 'Virtual World browser title is preserved');
  verify(await page.evaluate(() => [...__showroomEvidence.texts].some((s) => s === 'VIRTUAL WORLD') && ![...__showroomEvidence.texts].some((s) => /mingalar/i.test(s))), 'Virtual canvas branding is preserved');
  const plot = await page.evaluate(() => {
    const { world: W } = __game, b = W.refs.showroom.exterior;
    const blockers = W.colliders.filter((c) => c.y1 > 0.6 && c.x1 > b.x0 && c.x0 < b.x1 && c.z1 > b.z0 && c.z0 < b.z1);
    return { blockers: blockers.length, bounds: b, labels: W.map.labels.filter((l) => ['S-CLASS', 'Showroom'].includes(l.text)).map((l) => l.text) };
  });
  verify(plot.blockers === 1 && plot.labels.length === 2, 'Exterior plot has only its new shell blocker and minimap identification', plot);
  await scene('gallery/01-exterior', `(() => { const g = __game; g.view = 'third'; g.player.teleport(42, 0.2, -126, 0); Object.assign(g.cam, { yaw: Math.PI, pitch: 0.22, dist: 18 }); g.snapCamera(); })()`);
  await enter();
  verify(await page.evaluate(() => __game.world.refs.showroom.area.static.visible && document.body.classList.contains('in-showroom')), 'E enters the dedicated showroom interior');
  const layouts = await page.evaluate(() => __game.world.refs.showroom.exhibits);
  await runFiveBayChecks({ page, scene, verify, evidenceRoot });
  await runReferenceModelChecks({ page, verify, evidenceRoot });
  verify(await page.evaluate(() => __game.minimap.regions.length === 3 && __game.minimap.regions[2].labels.some((l) => l.text === 'Kiosk')), 'Separate interior minimap region includes bays, reception, exit and kiosk');

  await scene('gallery/02-reception', `(() => { const g = __game; g.player.teleport(4180, 0, 10, 0); Object.assign(g.cam, { yaw: Math.PI, pitch: 0.22, dist: 10 }); g.snapCamera(); })()`);
  await locate(page, 4200, 12);
  await page.locator('#game').focus();
  await page.keyboard.down('w');
  const walking = await page.evaluate(() => {
    const g = __game, z = g.player.pos.z;
    for (let i = 0; i < 60; i++) g.update(1 / 60);
    const p = g.camera.position;
    return { distance: z - g.player.pos.z, cameraBlocked: g.world.near(p.x, p.z).some((c) => c.cam && p.x > c.x0 && p.x < c.x1 && p.y > c.y0 && p.y < c.y1 && p.z > c.z0 && p.z < c.z1) };
  });
  await page.keyboard.up('w');
  verify(walking.distance > 5 && !walking.cameraBlocked, 'Third-person navigation has a clear promenade and camera clearance', walking);
  const wall = await page.evaluate(() => {
    const g = __game; g.player.teleport(4159.5, 0, 8, 0);
    g.cam.yaw = Math.PI / 2; g.controls.keys.add('KeyW');
    for (let i = 0; i < 120; i++) g.update(1 / 60);
    g.controls.clear(); return g.player.pos.x;
  });
  verify(wall >= 4158.8, 'Interior collision walls prevent walking out of the showroom', wall);
  const straight = layouts.find((bay) => bay.id === 'i');
  await locate(page, straight.approach.x, straight.approach.z);
  await page.locator('#game').focus();
  await page.keyboard.press('v');
  verify(await page.evaluate(() => __game.view === 'first'), 'Existing V control switches to first-person in the showroom');
  await page.evaluate(() => { __game.controls.keys.add('KeyW'); __game.controls.joy.x = 0.5; __game.controls.look.dx = 100; __game.controls.jumpQueued = true; });
  await useE();
  await page.waitForFunction(() => document.getElementById('panel-title').textContent === 'I-Type (Straight) concept');
  await page.waitForFunction(() => !document.pointerLockElement, null, { timeout: 5000 });
  const frozen = await state();
  const panelInput = await page.evaluate(() => ({ enabled: __game.controls.enabled, pointerLock: !!document.pointerLockElement, keys: [...__game.controls.keys], joystick: __game.controls.joy.x, look: __game.controls.look.dx, jump: __game.controls.jumpQueued }));
  verify(!panelInput.enabled && !panelInput.pointerLock && panelInput.keys.length === 0 && panelInput.joystick === 0 && panelInput.look === 0 && !panelInput.jump, 'Information panel releases pointer lock and clears held keyboard/joystick/look input', panelInput);
  await page.keyboard.down('w');
  await page.mouse.wheel(0, 300);
  await page.evaluate(() => { for (let i = 0; i < 120; i++) __game.update(1 / 60); });
  await page.keyboard.up('w');
  verify(JSON.stringify(frozen) === JSON.stringify(await state()), 'Player, heading, avatar, mode and camera stay fixed while the panel owns input');
  verify(await page.evaluate(() => document.activeElement.id === 'panel-close' && document.getElementById('panel').getAttribute('aria-modal') === 'true'), 'Named dialog receives entry focus');
  await page.keyboard.press('Shift+Tab');
  verify(await page.evaluate(() => document.activeElement.hasAttribute('data-showroom-kiosk')), 'Shift+Tab wraps to the last showroom action');
  await page.keyboard.press('Tab');
  verify(await page.evaluate(() => document.activeElement.id === 'panel-close'), 'Tab wraps back to Close');
  for (const [id, title] of [['sink','Sink'], ['cooktop','Cooktop'], ['hood','Range Hood']]) {
    await page.locator(`[data-showroom-product="${id}"]`).click();
    verify(await page.locator('#panel-title').textContent() === title, `${title} information opens through accessible product buttons`);
  }
  await page.waitForTimeout(350); // Capture the visible panel after its existing slide animation.
  await page.screenshot({ path: join(evidenceRoot, '06-product-panel.png'), animations: 'disabled' });
  verify(await page.locator('#panel').evaluate((el) => getComputedStyle(el).opacity === '1' && !el.hidden), 'Product dialog renders visibly in the production screenshot');
  await page.keyboard.press('Escape');
  verify(await page.evaluate(() => document.getElementById('panel').hidden && __game.controls.enabled && document.activeElement.id === 'game' && __game.controls.keys.size === 0), 'Escape closes the panel and returns clean input/focus to the world');
  await page.locator('#game').focus(); await page.keyboard.press('v');
  await locate(page, straight.sink.station.x, straight.sink.station.z);
  await useE();
  verify(await page.locator('#panel-title').textContent() === 'Sink', 'E at a physical product station opens its information');
  await page.locator('#panel-close').click();
  await locate(page, 4178, 12.4, Math.PI);
  await useE();
  verify(await page.locator('#panel-title').textContent() === 'Welcome to the showroom', 'Reception guide works through E');
  await page.keyboard.press('Escape');

  await locate(page, 4222, 12.6, Math.PI);
  await useE();
  await page.waitForTimeout(350);
  await page.screenshot({ path: join(evidenceRoot, '07-kiosk-panel.png'), animations: 'disabled' });
  verify(await page.locator('#panel').evaluate((el) => getComputedStyle(el).opacity === '1' && !el.hidden), 'Kiosk dialog renders visibly in the production screenshot');
  const link = page.locator('#showroom-kitchen-link');
  const attrs = await link.evaluate((a) => ({ href: a.href, target: a.target, rel: a.rel }));
  verify(attrs.href === 'https://game-s-class-kitchen.iida-mm.com/' && attrs.target === '_blank' && attrs.rel === 'noopener noreferrer', 'Kiosk uses one normal accessible link to the supplied kitchen URL', attrs);
  const beforeTab = await state();
  const [popup] = await Promise.all([page.waitForEvent('popup'), link.click()]);
  try {
    await popup.bringToFront();
    await popup.waitForLoadState('domcontentloaded', { timeout: 60000 });
    await popup.waitForFunction(() => document.body.innerText.length > 80, null, { timeout: 45000 });
    remote.url = popup.url(); remote.title = await popup.title();
    remote.bodySample = (await popup.locator('body').innerText()).slice(0, 3000);
    remote.opener = await popup.evaluate(() => window.opener === null);
    remote.trainingVisible = /training|game mode|トレーニング|ゲーム/i.test(remote.bodySample);
    await popup.screenshot({ path: join(evidenceRoot, '15-kitchen-destination.png'), animations: 'disabled' });
    verify(/S-CLASS/i.test(remote.title) && remote.opener, 'Actual kiosk destination loads the S-CLASS app with no opener', remote);
    verify(remote.trainingVisible, 'Kitchen destination exposes its existing training/game entry');
  } catch (error) {
    remote.error = error.message;
    checks.push({ status: 'NOT TESTED', text: 'Remote kitchen UI verification', detail: error.message });
    console.log('  Remote kitchen UI verification incomplete: ' + error.message);
  } finally { await popup.close(); await page.bringToFront(); }
  verify(JSON.stringify(beforeTab) === JSON.stringify(await state()), 'Returning from the actual kitchen tab preserves the world visit state');
  const hidden = await page.evaluate(async () => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
    document.dispatchEvent(new Event('visibilitychange'));
    const start = __game.renderer.info.render.frame;
    await new Promise((r) => setTimeout(r, 250));
    const result = { stopped: !__game.loopActive, frameUnchanged: start === __game.renderer.info.render.frame, pendingRaf: __showroomEvidence.raf.size };
    delete document.hidden; document.dispatchEvent(new Event('visibilitychange'));
    return result;
  });
  verify(hidden.stopped && hidden.frameUnchanged && hidden.pendingRaf === 0, 'Visibility emulation pauses rendering without replacing the renderer', hidden);
  await page.keyboard.press('Escape');
  const savedVisit = await page.evaluate(() => { const s = __game.showroomVisit; return { pos: s.position.toArray(), heading: s.heading, view: s.view, yaw: s.cam.yaw, pitch: s.cam.pitch, dist: s.cam.dist, look: __game.player.av.look }; });
  await leave();
  verify(await page.evaluate(() => Math.abs(__game.player.pos.x - 42) < 0.1 && Math.abs(__game.player.pos.z + 123) < 0.1 && !document.body.classList.contains('in-showroom')), 'E exit returns to the original outside entrance position');
  const restored = await state();
  verify(restored.pos.every((v, i) => Math.abs(v - savedVisit.pos[i]) < .001) && Math.abs(restored.heading - savedVisit.heading) < .001 && restored.view === savedVisit.view && restored.cam.yaw === savedVisit.yaw && restored.cam.pitch === savedVisit.pitch && restored.cam.dist === savedVisit.dist && JSON.stringify(restored.look) === JSON.stringify(savedVisit.look), 'Exit restores saved exterior heading, view, camera settings and avatar appearance', { savedVisit, restored });
  for (let i = 0; i < 3; i++) {
    await enter(); await locate(page, 4222, 12.6, Math.PI); await useE();
    await page.locator('#panel-close').click(); await leave();
  }
  verify(await page.evaluate((before) => JSON.stringify([...__showroomEvidence.listeners]) === JSON.stringify(before) && document.querySelectorAll('#game').length === 1 && document.querySelectorAll('canvas').length === 2 && __showroomEvidence.raf.size <= 1, listenerBaseline), 'Repeat visits/kiosk panels keep one world canvas, one loop and stable global listeners');

  // Exercise the nearby activities, rather than only photographing their buildings.
  await page.evaluate(() => __game.debug.zone('golf'));
  verify(await page.evaluate(() => __game.mode === 'golf' && __game.golf.active), 'Existing mini golf still starts after showroom visits');
  const putt = await page.evaluate(() => {
    const g = __game, x = g.golf.ball.position.x;
    g.controls.keys.add('Space');
    for (let i = 0; i < 30; i++) g.update(1 / 60);
    g.controls.clear();
    for (let i = 0; i < 15; i++) g.update(1 / 60);
    return { strokes: g.golf.strokes, moved: g.golf.ball.position.x - x };
  });
  verify(putt.strokes === 1 && putt.moved > 1, 'Existing mini golf charges and rolls a putt', putt);
  await page.locator('#game').focus(); await page.keyboard.press('Escape');
  verify(await page.evaluate(() => __game.mode === 'walk' && !__game.golf.active), 'Escape still leaves mini golf');
  await page.evaluate(() => {
    const g = __game; g.debug.zone('gym');
    for (let i = 0; i < 120; i++) g.update(1 / 60);
  });
  verify(await page.evaluate(() => __game.mode === 'workout' && __game.player.reps > 0), 'Existing gym still animates and counts repetitions');
  await useE();
  verify(await page.evaluate(() => __game.mode === 'walk' && __game.player.pose === null), 'E still stops the gym workout');

  const origin = new URL(page.url()).origin;
  // Headless contexts can all remain visible. Use the tested visibility owner so
  // the desktop page does not compete with phone/tablet software WebGL rendering.
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  for (const [name, viewport] of [['phone', { width: 390, height: 844 }], ['tablet', { width: 768, height: 1024 }]]) {
    const context = await browser.newContext({ viewport, hasTouch: true, isMobile: true, deviceScaleFactor: 1 });
    const mobile = await context.newPage();
    await mobile.addInitScript(() => localStorage.setItem('vw-language', 'en'));
    const errors = [];
    mobile.on('pageerror', (error) => errors.push(error.message));
    mobile.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    await installShowroomProbe(mobile);
    try {
      await mobile.goto(`${origin}/?debug`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await mobile.waitForFunction(() => __game?.player && !document.getElementById('start-btn').disabled, null, { timeout: 60000 });
      verify(await mobile.locator('#start h1').textContent() === 'Virtual World', `${name}: existing start branding is preserved`);
      await mobile.locator('#start-btn').tap(); await mobile.waitForTimeout(500);
      await enter(mobile, true);
      verify(await mobile.evaluate(() => __game.touch && __game.player.pos.x > 4150), `${name}: native touch prompt enters the showroom`);
      await locate(mobile, straight.approach.x, straight.approach.z);
      await mobile.locator('#prompt').tap();
      await mobile.locator('[data-showroom-product="sink"]').tap();
      await mobile.waitForTimeout(350);
      await mobile.screenshot({ path: join(evidenceRoot, `08-${name}-panel.png`), animations: 'disabled' });
      const profile = await mobile.evaluate(() => ({ width: innerWidth, overflow: document.documentElement.scrollWidth > innerWidth || document.getElementById('panel-body').scrollWidth > document.getElementById('panel-body').clientWidth, panel: document.getElementById('panel-title').textContent, panelVisible: getComputedStyle(document.getElementById('panel')).opacity === '1', movementLocked: !__game.controls.enabled, targetHeight: document.querySelector('[data-showroom-product]').getBoundingClientRect().height, worldCanvases: document.querySelectorAll('#game').length }));
      profile.name = name; profile.errors = errors; profiles.push(profile);
      verify(profile.panelVisible && !profile.overflow && profile.targetHeight >= 48 && profile.movementLocked && !errors.length, `${name}: usable touch panel, no overflow or application errors`, profile);
      await mobile.locator('#panel-close').tap();
      verify(await mobile.evaluate(() => __game.controls.enabled && __game.controls.joy.x === 0 && __game.controls.keys.size === 0), `${name}: tap Close restores clean movement input`);
      for (const bay of layouts.filter((l) => l.id !== 'i')) {
        await locate(mobile, bay.approach.x, bay.approach.z);
        await mobile.locator('#prompt').tap();
        verify(await mobile.locator('#panel-title').textContent() === `${bay.title} concept`, `${name}: ${bay.title} information opens by touch`);
        await mobile.locator('#panel-close').tap();
        await mobile.waitForFunction(() => document.getElementById('panel').hidden && __game.controls.enabled, null, { timeout: 5000 });
      }
      await locate(mobile, 4222, 12.6, Math.PI);
      await mobile.locator('#prompt').tap();
      verify(await mobile.evaluate(() => document.querySelector('#showroom-kitchen-link')?.tagName === 'A' && document.documentElement.scrollWidth <= innerWidth && document.getElementById('panel-body').scrollWidth <= document.getElementById('panel-body').clientWidth), `${name}: kiosk link is accessible without horizontal overflow`);
      await mobile.locator('#panel-close').tap();
      await mobile.locator('#btn-view').tap();
      verify(await mobile.evaluate(() => __game.view === 'first'), `${name}: first-person control still works`);
      await mobile.locator('#btn-view').tap();
      await locate(mobile, 4200, 10);
      await mobile.waitForTimeout(1500); // Let camera-switch toasts leave the gallery evidence.
      await mobile.screenshot({ path: join(evidenceRoot, `09-${name}-gallery.png`) });
      await leave(mobile, true);
      verify(await mobile.evaluate(() => __game.player.pos.x < 100), `${name}: native touch prompt leaves the showroom`);
    } finally { await context.close(); }
  }
  await page.bringToFront();
  await page.evaluate(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });
  await enter();
  await locate(page, 4190, 8);
  await page.locator('#game').focus(); await page.keyboard.press('w');
  verify(await page.evaluate(() => __game.controls.enabled), 'Ordinary world controls remain enabled after repeat/return flows');
  verify(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Desktop viewport has no horizontal overflow');
  writeFileSync(join(evidenceRoot, 'results.json'), JSON.stringify({ checks, profiles, remote, environment: 'Installed Chrome headless; ANGLE/SwiftShader software WebGL. Touch/browser emulation; no physical devices tested.' }, null, 2));
}
