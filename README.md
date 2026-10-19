# Virtual World

This project is based on **Mingalar World** by **Tun-PS-Lin**. Original source: [Tun-PS-Lin/Mingalar-World](https://github.com/Tun-PS-Lin/Mingalar-World). The original project documentation and Roblox port are preserved below.

The current website includes the five-bay Panasonic S-CLASS concept showroom and Myanmar, English and Japanese visitor interfaces. The separate S-CLASS kitchen application opens in a new tab and is maintained independently. See [the language content guide](docs/VIRTUAL_WORLD_LANGUAGE_CONTENT.md) for translation coverage and review notes.

For a reproducible local setup, use Node.js compatible with the installed Vite version, run `npm ci`, then `npm run dev`. Run `npm run build` to generate `dist/`. Dependencies, build output, local configuration and generated test evidence are excluded from Git. The bundled fonts and their original license/source records are in `public/fonts/`.

## Original project overview

An explorable 3D town in the browser, styled after Roblox: smooth plastic parts, bright colours, blocky avatars. Walk (or look through your avatar's eyes), customise your character, shop the Virtual Mall, mod a car and race it around the city, visit the Virtual Office and test your aim at the Gun Range.

Built with [Three.js](https://threejs.org) and [Vite](https://vite.dev). There are no model or texture files: every building, car, product and texture is generated in code, so the whole site is about 220 kB gzipped.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173  (add ?debug for an FPS / draw-call readout)
```

## Test it

```bash
npm run build
npm test           # headless smoke + performance test, screenshots in tests/out/
```

The test serves `dist/`, drives every area in headless Chromium (mall, garage mods, a full race lap, office corners and links, gun range, customiser, first person, minimap) and fails on any console error, more than 400 draw calls, more than 3 M triangles or more than 4 ms of simulation per frame. It uses the Chromium that ships with Playwright; set `CHROME=/path/to/chrome` to use another one.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com choose **Add New → Project** and import the repository.
3. Vercel detects Vite automatically (build command `npm run build`, output `dist`). Click **Deploy**.

## Controls

| | Desktop | Touch |
|---|---|---|
| Move | W A S D / arrows | Left thumb (floating joystick) |
| Run | Shift | Run button (toggle) |
| Jump | Space | Jump button |
| Look | Drag the mouse (third person) · mouse (first person, pointer lock) | Drag anywhere else |
| Zoom | Scroll wheel | Pinch |
| Interact | E | Tap the prompt |
| First / third person | V or the 🎥 button (top right) | 🎥 button |
| Customise avatar | C or the 👕 button (top right) | 👕 button |
| Minimap | M or the – button | – button |
| Close / leave | Esc | ✕ or Leave |

Your avatar always faces where the camera looks, in both views. In third person, drag to swing the camera around; in first person, click the scene to capture the mouse.

## What you can do

| Place | Interaction |
|---|---|
| Virtual Mall | A big walk-in hall with a **Tech** floor (laptops, phones, tablets, cameras, speakers, headphones, TVs, desktops, gaming, drones) and a **Fashion** floor (tees, hoodies, jackets, jeans, dresses, skirts, handbags, shoes, hats, sunglasses, backpacks, mannequins, fitting rooms). Press E at any display to browse it, add to the cart, or try clothes on your avatar. |
| Virtual Garage | Five cars on turntables. Press E at a car to change paint, finish, wheels, rim colour, spoiler, body kit, underglow, stripes, window tint, engine, tyres and nitro, then **Race this car**. |
| Mingalar Raceway | A circuit around the outside of the city. Three laps against three AI rivals, with lap times, best laps (saved), chase and cockpit cameras (V), handbrake drifts (Space) and nitro (Shift). |
| Virtual Office | Press E at the door to go inside. Three business corners: Alacrity Research's holographic city map (→ map.alacrityresearch.xyz), the Mingalar News studio (→ mingalar.news) and a developer desk (→ github.com/Tun-PS-Lin). |
| Gun Range | Pick a pistol, revolver, SMG, assault rifle, shotgun or sniper rifle and score as many points as you can in 60 seconds on pop-up dummies and bullseye boards. R reloads, right-click / Q scopes the sniper. |
| Luxury Home | Room-by-room gallery tour, and switch the house lights on. Pool in the back garden: walk in to swim. |
| Mini Golf · Gym | Three holes of mini golf; jumping jacks on the gym mat. |

## Project layout

```
index.html        HUD markup (top-right buttons, minimap, prompt, panel, touch buttons, start screen)
src/main.js       Renderer, lights, camera rig (first/third person), game loop, interaction wiring
src/gfx.js        Material library + procedural textures, sky, clouds, static batching
src/kit.js        World container (colliders, zones, map shapes) and props: trees, lamps, benches...
src/world.js      City layout: blocks, roads, wall, home, pool, gym, golf course, parks
src/avatar.js     Roblox-style avatar builder (body, face, hair, clothes, accessories)
src/customize.js  Avatar editor panel
src/player.js     Movement, collision and animation
src/controls.js   Keyboard, mouse, pointer lock and touch input
src/minimap.js    Minimap
src/mall.js       Mall building, displays and catalogue (DISPLAYS), cart
src/products.js   3D product models (clothes, bags, shoes, laptops, cameras, speakers...)
src/garage.js     Garage showroom, workshop, parking, mod panel
src/cars.js       Car models (MODELS) and mods
src/race.js       Race track, driving physics, AI rivals, lap timing, race cameras
src/office.js     Office tower, interior and the three business corners (LINKS)
src/gunrange.js   Gun range building, weapons (WEAPONS), targets and shooting
src/golf.js       Mini golf
src/panels.js     Home gallery and office reception panels
src/ui.js         DOM overlay helpers (panel, toasts, prompt, fade)
src/builders.js   box / cylinder / sign helpers
tests/smoke.mjs   Headless smoke + performance test
```

## Editing content

- **Shop products**: `DISPLAYS` in `src/mall.js`; the 3D displays are built further down the same file.
- **Cars**: `MODELS` in `src/cars.js`; showroom line-up in `LINEUP` in `src/garage.js`.
- **Office links**: `LINKS` in `src/office.js`.
- **Weapons**: `WEAPONS` in `src/gunrange.js`.
- **Avatar options**: `OPTIONS` and the colour lists in `src/avatar.js`.
- **Sound effects**: every sound-worthy moment calls `game.sfx(name)` (`jump`, `buy`, `checkout`, `shot:<weapon>`, `hit`, `bump`). It is a no-op today; plug an audio player in there.

## Performance notes

- Static parts are merged into a few big meshes at load (`bakeStatic` in `src/gfx.js`). Plain-coloured materials of the same kind share one material with the colour stored per vertex, so hundreds of colours cost one draw call.
- Trees, bushes and flowers are instanced.
- Textures are drawn on canvases and mapped in world space, so a brick wall and a planter share the same texture without stretching.
- The renderer caps the pixel ratio at 1.75 (1.5 on touch); add `?dpr=1` to the URL on slow machines.

## Roblox version

A full Roblox port lives in [`roblox/`](roblox/README.md). Open `roblox/MingalarWorld.rbxl` in Roblox Studio and press Play.

## Panasonic S-CLASS Showroom V0.1

The concept showroom is north of the Virtual Office, beside the northern sidewalk. Find **S-CLASS / Showroom** on the minimap, then press **E** at its door or tap the prompt. Inside, browse I-Type, II-Type and L-Type displays, visit the product signs, reception and kitchen kiosk, and use the marked exit to return to town. Information panels support Tab, Escape and touch, and pause avatar movement while open.

These procedural exhibits demonstrate layout relationships; they are not exact product models or installation specifications. The kiosk opens the existing S-CLASS kitchen application in another tab. Its URL is configured in `src/showroomConfig.js`. The separate kitchen application is maintained independently.

`src/panasonicShowroom.js` builds the exterior/interior and handles showroom visits and information. `tests/showroom.mjs` extends the production smoke test with showroom, accessibility, tab-return and phone/tablet checks. Evidence is generated in ignored `tests/out/showroom-v01/`; implementation findings are in `outputs/Virtual-World-Panasonic-Showroom-V0.1.md`.

For Windows validation using installed Chrome:

```powershell
$env:CHROME = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
npm run build
npm test
```

## Panasonic S-CLASS Showroom V0.2

The current gallery has five concept bays: **I-Type (Straight)**, **II-Type (Parallel)**, **L-Type (Corner)**, **Face to Face (Peninsula)** and **Island (Center)**. Reception and the interior minimap identify all five. Follow the side aisles past the first three bays to the Peninsula and Island row. The Peninsula connects at one end; the Island can be walked around on all four sides. These gallery arrangements remain conceptual, with no installation dimensions or new approved product claims.

The existing kiosk opens [S-CLASS Kitchen & Training](https://game-s-class-kitchen.iida-mm.com/) in another tab. Choose a layout inside that configurator; no layout is passed from the gallery. Its current Peninsula/Island studio previews differ from the gallery room contexts. The separate application is unchanged.

`tests/showroomV02.mjs` adds a tour driven by normal avatar movement and collision updates, plus first/third-person evidence for all five bays. `npm test` now writes separate V0.2 evidence into ignored `tests/out/showroom-v02/`. The previous V0.1 report and screenshots are preserved. See `outputs/Virtual-World-Panasonic-Showroom-V0.2.md` for the implementation report and validation limits.

## Panasonic S-CLASS Showroom V0.3

The five bays now use shared procedural architectural models: pale modular cabinets, drawer/door seams, finished ends/rears, thin worktops, recessed sinks, dark Cooktops and grey Hoods. I, II and L have wall cabinetry; Peninsula and Island retain open rear access and suspended Hoods. The L gallery places its Sink on the long leg and cooking on the shorter perpendicular leg, following the supplied references. These are conceptual exhibit proportions, not catalog or installation dimensions.

`src/showroomKitchenModels.js` builds the reusable model parts and world-space fixture data. `tests/showroomV03.mjs` checks actual baked surfaces, mounting, current footprints and reference views, alongside the preserved world/input/walking tests. `npm test` writes new ignored evidence to `tests/out/showroom-v03/`. See `outputs/Virtual-World-Panasonic-Showroom-V0.3.md` for reference comparisons, validation and limits. V0.1/V0.2 reports and evidence and the separate kitchen application remain preserved.
