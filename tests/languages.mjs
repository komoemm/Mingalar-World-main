import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { dictionaries, content, sourceKeys } from '../src/i18n/translations.js';
import { validateDictionaries } from './i18n.mjs';
import { installShowroomProbe } from './showroom.mjs';

export async function runLanguageChecks({ browser, check, out, url }) {
  const evidence = join(out, 'languages'); mkdirSync(evidence, { recursive: true });
  const rows = [], errors = [], profileRows = [];
  const verify = (ok, name, details) => { rows.push({ name, pass: !!ok, details }); check(ok, `Language: ${name}`); };
  const unit = validateDictionaries(); verify(unit.keys > 500, 'dictionary, interpolation, default/storage and option coverage', unit);
  const expected = (locale, key) => dictionaries[locale][key];
  const state = page => page.evaluate(() => {
    const g = __game;
    return { pos: g.player.pos.toArray(), heading: g.player.heading, view: g.view, mode: g.mode, cam: { yaw: g.cam.yaw, pitch: g.cam.pitch, dist: g.cam.dist }, avatar: JSON.stringify(g.player.av.look), visit: JSON.stringify(g.showroomVisit), map: { min: g.minimap.min, range: g.minimap.range } };
  });
  const report = () => writeFileSync(join(evidence, 'validation.json'), JSON.stringify({ unit, checks: rows, profiles: profileRows, applicationErrors: errors, browser: 'Chromium / software WebGL; viewport and touch emulation, not physical devices' }, null, 2));
  const start = async page => { await page.bringToFront(); await page.waitForFunction(() => window.__game?.world && !document.querySelector('#start-btn').disabled, null, { timeout: 30000, polling: 100 }); };
  const navigate = async page => { await page.bringToFront(); await page.goto(url, { waitUntil: 'domcontentloaded' }); };
  const screenshot = async (page, name) => {
    // Architectural framing for evidence only; pause frames and restore live state.
    const framing = await page.evaluate(name => {
      const g=window.__game,area=g?.world?.refs.showroom?.area;
      const debug=document.getElementById('debug');
      const saved={debug:debug?.style.display,hidden:document.hidden,architectural:false};
      if(debug)debug.style.display='none';
      if(!g?.showroomVisit||g.player.pos.x<4100||!area)return saved;
      if(!saved.hidden){Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));}
      Object.assign(saved,{architectural:true,position:g.camera.position.toArray(),quaternion:g.camera.quaternion.toArray(),static:area.static.visible,dyn:area.dyn.visible});
      area.static.visible=area.dyn.visible=true;
      const l=name.includes('corrected-l');
      g.camera.position.fromArray(l?[4215,4,-1]:name.includes('signs-map')?[4196,6,18]:[4177,4,-1]);
      g.camera.lookAt(...(l?[4221,2.8,-14]:name.includes('signs-map')?[4196,2.8,-15]:[4173,2.8,-17]));
      g.camera.updateMatrixWorld();g.renderer.render(g.scene,g.camera);return saved;
    },name);
    try{await page.screenshot({ path: join(evidence, `${name}.png`), animations: 'disabled' });}
    finally{await page.evaluate(saved=>{const debug=document.getElementById('debug');if(debug)debug.style.display=saved.debug||'';if(!saved.architectural)return;const g=__game,area=g.world.refs.showroom.area;g.camera.position.fromArray(saved.position);g.camera.quaternion.fromArray(saved.quaternion);area.static.visible=saved.static;area.dyn.visible=saved.dyn;g.camera.updateMatrixWorld();if(!saved.hidden){delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));}},framing);}
  };
  const set = async (page, locale, selector = '#hud-language') => { await page.selectOption(selector, locale); await page.waitForFunction(locale => document.documentElement.lang === locale, locale); };
  const freeze = page => page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); document.dispatchEvent(new Event('visibilitychange')); });
  const resume = page => page.evaluate(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });
  const clickPlay = async page => { await page.click('#start-btn'); await page.waitForTimeout(450); };
  const zone = async (page, id) => page.evaluate(id => __game.debug.zone(id), id);

  // Verify real browser startup, including a throwing localStorage getter.
  for (const [name, saved, languages, result, blocked] of [
    ['saved', 'my', ['ja-JP'], 'my', false], ['browser', 'invalid', ['ja-JP'], 'ja', false],
    ['unsupported', null, ['fr-FR'], 'en', false], ['storage-failure', null, ['my-MM'], 'my', true],
  ]) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on('pageerror', error => errors.push(`${name}: ${error.message}`));
    try {
      await page.addInitScript(({ saved, languages, blocked }) => {
        if (saved) localStorage.setItem('vw-language', saved); else localStorage.removeItem('vw-language');
        Object.defineProperty(navigator, 'languages', { get: () => languages });
        if (blocked) Object.defineProperty(window, 'localStorage', { get() { throw new Error('Unavailable storage'); } });
      }, { saved, languages, blocked });
      await navigate(page); await start(page);
      verify(await page.locator('html').getAttribute('lang') === result && await page.locator('#welcome-language').inputValue() === result, `actual ${name} startup`);
      if (blocked) { await set(page, 'ja', '#welcome-language'); await clickPlay(page); verify(await page.evaluate(() => !!__game.world && __game.controls.enabled), 'blocked storage still permits language selection and play'); }
    } catch (error) { await screenshot(page, `startup-${name}-failure`); errors.push(`${name}: ${error.message}; ${JSON.stringify(await page.evaluate(()=>({lang:document.documentElement.lang,world:!!window.__game?.world,fonts:window.__game?.debug.language.fonts})))}`); report(); throw error; } finally { await page.close(); }
  }

  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await installShowroomProbe(page);
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', event => { if (event.type() === 'error') errors.push(event.text()); });
  try {
    await page.addInitScript(() => localStorage.setItem('vw-language', 'en'));
    await navigate(page); await start(page);
    for (const locale of ['my', 'en', 'ja']) {
      await set(page, locale, '#welcome-language');
      verify(await page.locator('#start-btn').textContent() === expected(locale, 'welcome.play'), `${locale}: welcome controls and synchronized selectors`);
      await screenshot(page, `desktop-${locale}-welcome`);
    }
    await clickPlay(page);
    // Actual movement first; switching without world reconstruction preserves the stopped pose.
    await page.locator('#game').focus(); await page.keyboard.down('w'); await page.waitForTimeout(120); await page.keyboard.up('w');
    await freeze(page);
    await page.evaluate(() => { window.__languageObjects = { world: __game.world, renderer: __game.renderer, areas: __game.world.areas, player: __game.player, camera: __game.camera, minimap: __game.minimap, golf: __game.golf, range: __game.range, race: __game.race }; });
    const before = await state(page);
    for (const locale of ['my', 'en', 'ja', 'my']) await set(page, locale);
    verify(JSON.stringify(before) === JSON.stringify(await state(page)), 'my → en → ja → my while walking preserves location, view, avatar, map and mode');
    verify(await page.evaluate(() => Object.entries(__languageObjects).every(([key, value]) => __game[key] === value || key === 'areas' && __game.world.areas === value)), 'world, renderer, areas, player, camera, activities and minimap retain identity');
    await resume(page);
    await page.reload({ waitUntil: 'domcontentloaded' }); await start(page);
    verify(await page.locator('#welcome-language').inputValue() === 'en', 'deterministic initializer re-runs on its test page');
    // A separate context has no forcing initializer; persisted preference survives reload.
    await freeze(page);
    const persistence = await browser.newPage();
    try { await navigate(persistence); await start(persistence); await set(persistence, 'ja', '#welcome-language'); await persistence.reload({ waitUntil: 'domcontentloaded' }); await start(persistence); verify(await persistence.locator('#welcome-language').inputValue() === 'ja', 'reload remembers vw-language'); } finally { await persistence.close(); }
    await resume(page);
    await page.bringToFront(); await clickPlay(page);
    await zone(page, 'showroom-enter'); await page.waitForTimeout(700);
    await page.evaluate(() => { __game.player.teleport(4178, 0, 12.4, Math.PI); __game.snapCamera(); });
    await zone(page, 'showroom:reception'); await freeze(page);
    const modalBefore = await state(page);
    for (const locale of ['my', 'en', 'ja', 'my']) {
      await page.locator('#panel-language').focus(); await set(page, locale, '#panel-language');
      verify(await page.evaluate(() => document.activeElement.id === 'panel-language' && !__game.controls.enabled && document.getElementById('hud').inert && document.getElementById('game').inert), `${locale}: modal owns input and keeps selector focus`);
      verify((await page.locator('#panel-body').innerText()).includes(expected(locale, 'showroom.purpose')), `${locale}: complete purpose and route explanation`);
    }
    verify(JSON.stringify(modalBefore) === JSON.stringify(await state(page)), 'reading an explanation never resumes or resets the visit/camera');
    await page.locator('#panel-close').focus(); await page.keyboard.press('Shift+Tab');
    verify(await page.evaluate(() => document.activeElement.hasAttribute('data-showroom-kiosk')), 'modal Shift+Tab loops to last action with select in focusable set');
    await page.keyboard.press('Tab'); verify(await page.evaluate(() => document.activeElement.id === 'panel-close'), 'modal Tab loops to Close');
    await page.keyboard.press('Tab'); verify(await page.evaluate(() => document.activeElement.id === 'panel-language'), 'native select reachable by keyboard');
    // Scroll and focus use stable controls; layout changes through ordinary owner navigation.
    await page.evaluate(() => { document.getElementById('panel-body').scrollTop = 130; document.querySelector('[data-showroom-product="hood"]').focus({ preventScroll: true }); });
    const scroll = await page.locator('#panel-body').evaluate(node => node.scrollTop);
    await page.evaluate(() => __game.debug.language.set('ja'));
    const scrollAfter=await page.evaluate(()=>{const body=document.getElementById('panel-body');return{focus:document.activeElement.dataset.showroomProduct,scroll:body.scrollTop,max:body.scrollHeight-body.clientHeight};});
    verify(scrollAfter.focus==='hood'&&Math.abs(scrollAfter.scroll-Math.min(scroll,scrollAfter.max))<2, 'explanation refresh preserves equivalent action focus and scroll', {before:scroll,after:scrollAfter});
    await page.keyboard.press('Escape'); verify(await page.evaluate(() => document.getElementById('panel').hidden && __game.controls.enabled), 'Escape restores modal input');
    await resume(page);

    // Every promised layout and product prose, in every locale.
    for (const locale of ['my', 'en', 'ja']) {
      await set(page, locale);
      for (const id of ['i', 'ii', 'l', 'peninsula', 'island']) {
        await zone(page, `showroom:layout:${id}`);
        const body = await page.locator('#panel-body').innerText();
        verify(body.includes(expected(locale, `showroom.${id}.text`)) && body.includes(expected(locale, 'showroom.concept')), `${locale}: ${id} full qualified explanation`);
        if (id === 'l') await screenshot(page, `desktop-${locale}-corrected-l`);
        await page.keyboard.press('Escape');
      }
      for (const id of ['sink', 'cooktop', 'hood']) {
        await zone(page, `showroom:product:i:${id}`);
        verify((await page.locator('#panel-body').innerText()).includes(expected(locale, `showroom.${id}.text`)), `${locale}: ${id} full product explanation`);
        await screenshot(page, `desktop-${locale}-product-${id}`); await page.keyboard.press('Escape');
      }
      await zone(page, 'showroom:reception'); await screenshot(page, `desktop-${locale}-guide`); await page.keyboard.press('Escape');
    }
    await zone(page, 'showroom:kiosk');
    await set(page, 'my', '#panel-language');
    verify((await page.locator('#panel-body').innerText()).includes(expected('my', 'showroom.chooseLanguage')), 'kiosk explains independent app language selection');
    verify(await page.locator('#showroom-kitchen-link').evaluate(node => node.href === 'https://game-s-class-kitchen.iida-mm.com/' && node.target === '_blank' && node.rel.includes('noopener') && node.rel.includes('noreferrer')), 'existing safe new-tab kitchen URL has no invented parameters');
    await page.keyboard.press('Escape'); await zone(page, 'showroom-exit'); await page.waitForTimeout(700);

    // All visitor modules render using the same selection; existing IDs/state remain.
    const open = async (id, x, z) => { await page.evaluate(({ x, z }) => { __game.player.teleport(x, .25, z, Math.PI); __game.player.vel.set(0,0,0); __game.snapCamera(); }, { x, z }); await zone(page, id); await freeze(page); };
    const panelCheck = async (name, key, locale) => {
      const text = await page.locator('#panel-body').innerText();
      verify(text.includes(expected(locale, key)), `${locale}: ${name} visitor prose`);
      await screenshot(page, `world-${locale}-${name}`);
    };
    for (const locale of ['my', 'en', 'ja']) {
      await set(page, locale);
      await open('home', 116, -41); await page.locator('[data-step="1"]').click();
      await panelCheck('home', 'home.kitchenText', locale); const homeHtml = await page.locator('.slide .count').textContent();
      await page.evaluate(() => __game.debug.language.set('en')); await page.evaluate(locale => __game.debug.language.set(locale), locale);
      verify(await page.locator('.slide .count').textContent() === homeHtml, `${locale}: home gallery index retained`);
      await page.keyboard.press('Escape'); await resume(page);
      await open('mall:laptops', -42, -97); await panelCheck('mall', 'catalog.laptops0', locale);
      await page.locator('[data-add="laptops:0"]').click(); await page.locator('[data-cart]').click();
      const countBefore = await page.locator('#cart-chip').textContent(); await page.evaluate(() => __game.debug.language.set('en')); await page.evaluate(locale => __game.debug.language.set(locale), locale);
      verify(await page.locator('#cart-chip').textContent() === countBefore, `${locale}: cart quantity survives refresh`);
      await panelCheck('cart', 'mall.note', locale); await page.keyboard.press('Escape'); await resume(page);
      await open('car:apex', -118, 36); await page.locator('[data-k="finish"][data-v="matte"]').click();
      const carBefore = await page.evaluate(() => JSON.stringify(__game.world.refs.garage.cars[0].mods));
      await page.evaluate(() => __game.debug.language.set('en')); await page.evaluate(locale => __game.debug.language.set(locale), locale);
      verify(await page.evaluate(before => JSON.stringify(__game.world.refs.garage.cars[0].mods) === before && document.querySelector('[data-k="finish"][data-v="matte"]').classList.contains('on'), carBefore), `${locale}: car modifications/selection retained`);
      await panelCheck('garage', 'garage.reset', locale); await page.keyboard.press('Escape'); await resume(page);
      await page.evaluate(() => __game.debug.customize()); await freeze(page); await page.locator('[data-tab="hair"]').click(); await page.locator('[data-k="hair"][data-v="curly"]').click();
      const avatarBefore = await page.evaluate(() => JSON.stringify(__game.player.av.look));
      await page.evaluate(() => __game.debug.language.set('en')); await page.evaluate(locale => __game.debug.language.set(locale), locale);
      verify(await page.evaluate(before => JSON.stringify(__game.player.av.look) === before && document.querySelector('[data-tab="hair"]').classList.contains('on'), avatarBefore), `${locale}: avatar editor keeps selected tab and look`);
      await panelCheck('avatar', 'avatar.note', locale); await page.keyboard.press('Escape'); await resume(page);
      await open('range', 40, 30); await panelCheck('range-picker', 'range.note', locale); await page.keyboard.press('Escape'); await resume(page);
      await page.evaluate(() => __game.range.start('pistol')); await freeze(page);
      await page.evaluate(() => { __game.range.score=75; __game.range.shots=3; __game.range.hits=2; __game.range.ammo=9; __game.range.phase='play'; __game.range.time=42; __game.range._hud(); });
      await page.evaluate(() => __game.debug.language.set('en')); await page.evaluate(locale => __game.debug.language.set(locale), locale);
      verify(await page.evaluate(() => __game.range.score===75 && __game.range.shots===3 && __game.range.ammo===9 && __game.range.time===42), `${locale}: range progress survives language refresh`);
      await screenshot(page, `world-${locale}-range-hud`); await page.evaluate(() => __game.range._end()); await panelCheck('range-results','range.again',locale); await page.keyboard.press('Escape'); await page.evaluate(() => __game.range.exit()); await resume(page);
      await page.evaluate(() => __game.golf.start()); await freeze(page); await page.evaluate(() => { __game.golf.strokes=2; __game.golf._hud(); });
      await page.evaluate(() => __game.debug.language.set('en')); await page.evaluate(locale => __game.debug.language.set(locale), locale);
      verify(await page.evaluate(() => __game.golf.strokes===2 && __game.golf.hole===0 && __game.golf.state==='aim'), `${locale}: golf strokes/hole unchanged`);
      await screenshot(page, `world-${locale}-golf-hud`); await page.evaluate(() => { __game.golf.card=[2,3,4]; __game.golf._finish(); }); await panelCheck('golf-card','golf.again',locale); await page.keyboard.press('Escape'); await resume(page);
      await page.evaluate(() => __game.race.start(__game.world.refs.garage.cars[0])); await freeze(page);
      await page.evaluate(() => { __game.race.phase='race'; __game.race.timer=17; __game.race.me.lap=1; __game.race._hud(); });
      await page.evaluate(() => __game.debug.language.set('en')); await page.evaluate(locale => __game.debug.language.set(locale), locale);
      verify(await page.evaluate(() => __game.race.timer===17 && __game.race.me.lap===1 && __game.race.active), `${locale}: race time/lap/car retained`);
      await screenshot(page, `world-${locale}-race-hud`); await page.evaluate(() => { const r=__game.race; r.me.lapTimes=[30,31,32];r.me.finishT=93;r.me.place=1;r.best[r.entry.kind]=30;r._finish(); }); await panelCheck('race-results','race.again',locale); await page.keyboard.press('Escape'); await page.evaluate(() => __game.race.exit()); await resume(page);
      await open('office-reception', 2972, 0); await panelCheck('office-reception','office.intro',locale); await page.keyboard.press('Escape'); await resume(page);
      for (const [id, key, x, z] of [['map','office.mapText',2981,-11.5],['news','office.newsText',3020,-7.4],['github','office.devText',3020,11.5]]) {
        await open(`link:${id}`, x, z); await panelCheck(`office-${id}`,key,locale); await page.keyboard.press('Escape'); await resume(page);
      }
      await open('gym',92,86); await resume(page); await page.waitForTimeout(120); await freeze(page);
      const reps = await page.evaluate(() => __game.player.reps); await page.evaluate(() => __game.debug.language.set('en')); await page.evaluate(locale => __game.debug.language.set(locale), locale);
      verify(await page.evaluate(before => __game.mode==='workout' && __game.player.reps===before, reps), `${locale}: gym progress retained`); await screenshot(page, `world-${locale}-gym`);
      await page.locator('#game').focus(); await page.keyboard.press('e'); await resume(page);
    }

    // Full catalog/options coverage is checked from implementation records, including offscreen descriptions.
    const inventory = await page.evaluate(async () => {
      // The debug API exposes only actual runtime records, not a second UI state.
      return { missing: [...__game.debug.language.missing], resources: __game.debug.language.resources(), fonts: __game.debug.language.fonts };
    });
    verify(inventory.missing.length === 0, 'no lookup falls back during whole-world coverage', inventory);
    verify(Object.values(inventory.fonts).every(value => value==='loaded'), 'all local font faces load successfully', inventory.fonts);

    await page.evaluate(() => { __game.player.teleport(42,.25,-123,Math.PI); __game.snapCamera(); }); await zone(page,'showroom-enter'); await page.waitForTimeout(700);
    await page.evaluate(() => { __game.player.teleport(4200,0,-28,Math.PI); __game.snapCamera(); }); await freeze(page);
    const resourceState = () => page.evaluate(() => { const g=__game; g.minimap.update(.06,g.player.pos.x,g.player.pos.z,g.player.heading);g.renderer.render(g.scene,g.camera);return {text:g.debug.language.resources(),memory:{...g.renderer.info.memory},geometries:g.renderer.info.memory.geometries,canvases:document.querySelectorAll('canvas').length,regions:g.minimap.regions.length,listeners:JSON.stringify([...__showroomEvidence.listeners])}; });
    const stableBefore = await resourceState();
    for (let i=0;i<30;i++) await page.evaluate(locale => __game.debug.language.set(locale), ['my','en','ja'][i%3]);
    const stableAfter = await resourceState();
    verify(JSON.stringify(stableBefore)===JSON.stringify(stableAfter), '30 repeated toggles keep texture/geometry/canvas/region/listener counts stable', {before:stableBefore,after:stableAfter});
    const sign = await page.evaluate(() => { const g=__game;const list=[];g.world.refs.showroom.area.static.traverse(o=>{for(const material of Array.isArray(o.material)?o.material:[o.material])if(material?.map?.image?.getContext)list.push(material.map);});return {count:list.length,versions:list.map(texture=>texture.version)}; });
    await page.evaluate(() => __game.debug.language.set('my'));
    verify(await page.evaluate(versions=>{const list=[];__game.world.refs.showroom.area.static.traverse(o=>{for(const material of Array.isArray(o.material)?o.material:[o.material])if(material?.map?.image?.getContext)list.push(material.map);});return list.length===versions.length&&list.some((texture,index)=>texture.version>versions[index]);},sign.versions), 'actual static-baked materials reuse and update their canvas textures');
    for(const locale of ['my','en','ja']){await page.evaluate(locale=>__game.debug.language.set(locale),locale);await page.evaluate(()=>{const g=__game;g.minimap.update(.1,4200,-28,Math.PI);g.renderer.render(g.scene,g.camera);});await screenshot(page,`desktop-${locale}-baked-signs-map`);}
    await resume(page);
    verify(errors.length===0,'no application console or page errors',errors);
  } finally { await page.close(); report(); }

  // Touch/tablet views use all three languages and real modal selectors.
  for (const [name, viewport] of [['phone',{width:390,height:844}],['tablet',{width:768,height:1024}]]) {
    const context=await browser.newContext({viewport,isMobile:true,hasTouch:true,deviceScaleFactor:1});const page=await context.newPage();
    try {
      page.on('pageerror',error=>errors.push(`${name}: ${error.message}`));
      await navigate(page);await start(page);
      for(const locale of ['my','en','ja']){await set(page,locale,'#welcome-language');await screenshot(page,`${name}-${locale}-welcome`);}
      await clickPlay(page);await zone(page,'showroom-enter');await page.waitForTimeout(700);
      await page.evaluate(()=>{__game.player.teleport(4200,0,-28,Math.PI);__game.snapCamera();});
      for(const locale of ['my','en','ja']){
        await set(page,locale);await page.waitForTimeout(100);await screenshot(page,`${name}-${locale}-signs-map`);
        await page.evaluate(()=>__game.player.teleport(4178,0,12.4,Math.PI));await zone(page,'showroom:reception');await set(page,locale,'#panel-language');await screenshot(page,`${name}-${locale}-guide`);
        await page.locator('[data-showroom-product="sink"]').click();await screenshot(page,`${name}-${locale}-product`);
        const profile=await page.evaluate(()=>{const p=document.getElementById('panel-body'),selector=document.getElementById('panel-language');return {locale:document.documentElement.lang,width:innerWidth,overflow:p.scrollWidth>p.clientWidth||document.documentElement.scrollWidth>innerWidth,selectorHeight:selector.getBoundingClientRect().height,inputSuspended:!__game.controls.enabled,fonts:__game.debug.language.fonts};});
        profileRows.push({name,...profile});verify(!profile.overflow&&profile.selectorHeight>=44&&profile.inputSuspended,`${name} ${locale}: usable touch selector, complete wrapping and isolated input`,profile);
        await page.locator('#panel-close').click();await page.evaluate(()=>{__game.player.teleport(4200,0,-28,Math.PI);__game.snapCamera();});
      }
    }finally{await context.close();report();}
  }

  // Delayed fonts: build with fallback, switch rapidly, then redraw the same baked resources.
  const delayed=await browser.newPage();let release;const gate=new Promise(resolve=>{release=resolve;});
  try {
    await delayed.route('**/fonts/*.woff2',async route=>{await gate;await route.continue();});
    await navigate(delayed);await start(delayed);
    verify(await delayed.evaluate(()=>!!__game.world),'font delay does not block world startup beyond bounded wait');
    await clickPlay(delayed);await freeze(delayed);
    const before=await delayed.evaluate(()=>__game.debug.language.resources());
    for(const locale of ['my','en','ja','my'])await set(delayed,locale);
    release();await delayed.waitForFunction(()=>Object.values(__game.debug.language.fonts).length===3&&Object.values(__game.debug.language.fonts).every(value=>value==='loaded'),null,{timeout:20000});
    // Present the updated GPU textures even though this state test pauses frames.
    await delayed.evaluate(()=>{const g=__game;g.minimap.update(.1,g.player.pos.x,g.player.pos.z,g.player.heading);g.renderer.render(g.scene,g.camera);});
    verify(await delayed.evaluate(before=>document.documentElement.lang==='my'&&JSON.stringify(__game.debug.language.resources())===JSON.stringify(before),before),'delayed fonts preserve last selection and redraw without resource growth');
    await screenshot(delayed,'font-delayed-final-my');
  }finally{release();await delayed.close();report();}
  const fallback=await browser.newPage();
  try {
    await fallback.route('**/fonts/*.woff2',route=>route.abort());await navigate(fallback);await start(fallback);
    await set(fallback,'my','#welcome-language');await screenshot(fallback,'font-failure-my-fallback');await set(fallback,'ja','#welcome-language');await screenshot(fallback,'font-failure-ja-fallback');await clickPlay(fallback);
    verify(await fallback.evaluate(()=>!!__game.world&&Object.values(__game.debug.language.fonts).every(value=>value==='fallback')),'font failure falls back and permits play');
  }finally{await fallback.close();report();}
  // Character-subset coverage: requested font characters include all currently shipped copy.
  const fonts=JSON.parse(readFileSync(new URL('../public/fonts/sources.json',import.meta.url),'utf8'));
  for(const font of fonts){const included=new Set(new URL(font.cssURL).searchParams.get('text'));const needed=[...new Set(Object.values(dictionaries[font.locale]).join(''))];verify(needed.every(char=>included.has(char)),`${font.locale}: local subset covers every dictionary character`,{bytes:font.bytes});}
  report();
  return rows;
}
