# Virtual World — Panasonic S-CLASS Showroom V0.2

Local implementation and validation: 12 October 2026. Project: `C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main`.

## Result and preserved baseline

Implemented all five concept bays, a five-entry reception guide, regional minimap labels, clearer approach-side headings/captions, small cabinet product labels, and visible ceiling connections for the hoods. The street frontage and existing reception/kiosk/entrance/exit positions remain unchanged. The original Virtual World naming and town gameplay are preserved. No commit, push, branch change, deployment, dependency installation or kitchen application modification was performed.

The V0.2 implementation brief was read completely before editing. README.md, package.json, current showroom/config, main interaction/camera code, world kit, builders, batching, minimap, input/UI and existing browser tests were inspected. No applicable AGENTS.md was found in the project or its ancestors. Tools available: Git 2.47.1.windows.2, Node.js 24.21.0, npm 11.6.4; existing dependencies were reused.

V0.1 was captured in ignored `dev/showroom-v02-baseline/`: 32 project files, including the original V0.1 report. All 40 existing test evidence files retain their original hashes. The V0.1 report is byte-for-byte unchanged. A fresh V0.2 audit found no changes to the 26 reference kitchen source/document/package/index files recorded before this work; a second comparison also matched all 48 kitchen reference files recorded by V0.1. See `tests/out/showroom-v02/kitchen-preservation.json` and `preservation.json`.

The project is a ZIP extraction without its own Git repository. Git resolves to the parent user directory and reports this project as untracked. `git diff --check -- .` returned cleanly but does not cover these untracked files; meaningful whitespace checks used the saved V0.1 baseline and `git -c core.autocrlf=false diff --no-index --check`, plus new-file trailing-whitespace checks.

## Files and scope

| File | Change |
| --- | --- |
| `src/panasonicShowroom.js` | Extend the existing builder/helpers to five bays, add canonical app IDs, room context, reachable zones, titles/captions, hood supports, guide actions and explicit configurator layout-choice wording. |
| `src/minimap.js` | Draw newline-separated label lines. Existing one-line city/Office labels use the same font, position and outline. |
| `tests/showroom.mjs` | Reuse the V0.1 input, tab-return, repeat-visit and touch tests; test all five concepts and fuller exterior-state restoration; save V0.2 evidence. |
| `tests/showroomV02.mjs` (new) | Actual collision-aware walking tour, canonical mappings/geometry checks, all-five first/third-person captures, guide, open-side/Island circuit and camera checks. |
| `tests/smoke.mjs` | Keep original world checks and strict performance gates; route evidence to a separate V0.2 folder. |
| `README.md` | Add current V0.2 navigation and validation information, retaining historical V0.1 documentation. |
| `outputs/Virtual-World-Panasonic-Showroom-V0.2.md` (new) | This report. |

Approximate implementation/test/README diff, excluding this report and ignored audit helpers: **268 added / 78 removed lines**. Package files, lockfile, index.html, showroomConfig.js, main.js, controls.js, ui.js, gfx.js, kit.js, other world modules and Roblox files were not edited. No new assets, libraries, renderer, scene, Raycaster, animation-loop owner, physics, audio, backend, multiplayer or native training was introduced.

## Five bays and exact procedural arrangements

Coordinates and sizes below describe software display geometry in world units. They are not Panasonic dimensions, installation plans or verified access clearances. Counter bodies are 1.65 high with a 0.15 worktop, retaining V0.1 exhibit scale.

| Gallery ID → application ID | Visible title and caption | Procedural arrangement |
| --- | --- | --- |
| `i` → `type-i` | **I-Type (Straight)**. “One wall row / Sink + cooking together.” | Main 14 × 2.4 row at (4177, -17), against a local wall. Sink x=4173 and Cooktop/Hood x=4178.8 share z=-17. |
| `ii` → `type-ii` | **II-Type (Parallel)**. “Two parallel rows / Sink / cooking separated.” | Rear 14 × 2.4 cooking row at (4200, -17); front 14 × 2.4 Sink row at (4200, -6). Sink x=4196, z=-6; Cooktop/Hood x=4201.8, z=-17. Front drawers/faucet face toward the intervening walkable aisle. No Dual Island claim. |
| `l` → `type-l` | **L-Type (Corner)**. “Connected corner / Return for preparation.” | Main row at (4223, -17); connected perpendicular 2.4 × 10 preparation return at (4228.8, -10.8). Sink x=4219 and Cooktop/Hood x=4224.8 stay on the main row. Local rear/side walls establish a corner. |
| `peninsula` → `face-to-face` | **Face to Face (Peninsula)**. “One end connected / Long rear side open.” | Deeper 14 × 4.2 row at (4180, -48). Sink x=4176 and Cooktop/Hood x=4181.8 share that row. A 0.4 × 7 short partition at x=4172.8 touches only the left end. No long rear wall/backsplash; a low rug behind the counter marks the open living display side. The right end and rear remain accessible. |
| `island` → `island` | **Island (Center)**. “Freestanding counter / Walk around all four sides.” | Deeper 14 × 4.2 row at (4220, -48). Sink x=4216 and Cooktop/Hood x=4221.8 share the row. No local wall contact or rear backsplash. Both ends and both long sides have actual gallery routes around them. |

I/II/L IDs are retained. All five `appLayoutId` values are unique. Counter colliders and context walls are registered in the existing collision grid; their exact footprints also drive minimap shapes. Product zone IDs are `showroom:product:<bay>:sink|cooktop|hood`. The L-Type hood prompt is on the accessible inner face of its return, rather than inside the counter.

### Separate kitchen studio limits

Read-only reference: `C:/Users/OE-DKP-20-006/Documents/GitHub/Panasonic-S-Class-Kitchen-Game-Mode`. Inspected `src/types.ts`, `src/data/configOptions.ts`, the relevant complete layout-construction sections of `src/components/KitchenViewport3D.tsx`, Japanese/English/Myanmar layout labels in `src/i18n/translations.ts`, `docs/S_CLASS_GAME_CONTENT.md`, and `docs/V1.0.1_CONTENT_APPROVAL_MATRIX.md`.

The kitchen's five canonical IDs exist already. Its current `face-to-face` and `island` share the deeper `isPeninsula` counter construction and retain the nearby studio rear wall/backsplash. Those previews do not establish an open facing-room relationship or four-sided access. The showroom intentionally supplies visibly different room contexts to explain the broad Peninsula/Island concepts. The new panels explicitly disclose this difference. No accepted kitchen scenarios, scoring, installation, transforms, products, translations, prices or scene lifecycle were changed, and no new approved catalog subtype or equipment combination is asserted.

Existing accepted Sink, Cooktop and qualified Range Hood information is retained verbatim. No prices, specifications, maintenance intervals, warranties or manufacturer endorsement were added to the world.

## Interior, wayfinding and readability

The remote interior grows from 72 × 54 to **84 × 94**, centered at (4200, -20), height 10. Bounds: x=4158…4242, z=-67…27. Floor, four collision walls, ceiling, light strips, area bounds and indoor registration all use these dimensions. The frontage remains x=26…58, z=-120…-100; Office remains around x=3000. Reception (4178,16), kiosk (4222,16), spawn (4200,18) and exit prompt (4200,23.5) are preserved.

The layout is 3+2: I/II/L in the first row and Peninsula/Island in the second. Reception lists all five canonical titles as accessible buttons with full descriptions. Side-wall wayfinding directs visitors to the second gallery. Large central hanging wayfinding was removed because it obscured exhibits from the gallery overview.

The showroom minimap region is x=4152…4248, z=-73…33, range=50. Five two-line titles separate concept name and subtype; the II label is staggered to prevent overlap. Reception, kiosk, exit and Gallery 2 remain mapped. All five locations are visible together in the central minimap capture; the map naturally pans with the visitor elsewhere.

Titles and captions are on approach-side boards offset ten units left of each bay center, away from hood/chimney silhouettes. Headings are centered at y=4.55, captions at y=2.9; full explanations remain in accessible modal panels. Small product labels on cabinet faces replace foreground signposts. Standard approach captures use the existing 11-unit third-person camera and eye-level first person, with a small first-person look adjustment. All five expected titles/captions were visually inspected in both modes. Neighboring bays can extend beyond the viewport without hiding the expected bay title.

Each hood stays above its Cooktop and has a chimney reaching the ceiling plus a modest ceiling mounting plate. These are simplified visual connections, without installation height claims. Neutral ivory/navy/wood materials and the existing lighting system are retained.

## Movement, input and scene preservation

The automated tour starts from the showroom entrance, finds routes through actual world colliders, and drives ordinary KeyW/camera-yaw input through `game.update(1/60)`. It uses no teleportation during the walking tour and no jumping. Generous routes leave orbit room beside tall boards/partitions. Every bay prompt, all fifteen physical product prompts, reception, kiosk and the marked exit were reached. Recorded player height stayed on the floor and sampled third-person camera positions remained outside solid camera colliders.

Peninsula access was walked from (4189,-42) around its free end to (4189,-54), then onto the open rear at (4180,-54). The Island circuit visited (4211,-42) → (4229,-42) → (4229,-54) → (4211,-54) → (4211,-42), using movement/collision updates throughout. The side-view screenshots were captured after walking there. Dedicated layout/overview screenshot setup uses teleportation for reproducible framing; it is not used as navigation proof.

Reused paths: `buildPanasonicShowroom`, `enterShowroom`, `leaveShowroom`, `openShowroomInfo`, existing ACTIONS/interact/updateZones, `W.beginArea/endArea`, explicit current-area `W.static`, `W.solid`, `W.zone`, regional Minimap, `bakeStatic`, `controls.suspend/clear`, shared `ui.openPanel/closePanel`, `fadeTo`, `snapCamera`, and the existing visibility pause/resume and renderer loop. Local counter/sink/cooking helpers support position, rotation and depth. Static visibility culling is retained; it does not unload geometry/materials.

E/tap, Tab/Shift+Tab wrapping, Escape/Close focus return, pointer-lock release, held-input clearing and clean restoration passed. Panels freeze player/heading/camera/avatar state. Exit restores saved exterior position, heading, view, camera settings and avatar appearance. Three repeated visits/panels retain one world canvas, one animation-loop owner and stable global listener counts. Visibility emulation pauses the renderer and restores the same loop.

## Kiosk and deployed-version limits

The kiosk keeps the normal link to [S-CLASS Kitchen & Training](https://game-s-class-kitchen.iida-mm.com/), `target="_blank"`, `rel="noopener noreferrer"`. The actual destination loaded with title **Panasonic S-CLASS System Kitchen 3D Configurator**, a visible training entry, and `window.opener === null`. Returning to the world retained the visit position, heading, view, mode, camera and appearance. No network failure occurred in the final check.

No layout query parameters, iframe or same-tab navigation were added. The kiosk explicitly tells visitors to choose a layout inside the configurator. Deployed selected-layout routing is unverified and no per-bay launch behavior is claimed.

The deployed page still exposed legacy dimensional/commercial/layout wording that differs from the local review candidate. No deployed commit/version fingerprint was verified; do not equate it with local V1.0.1 or treat those visible values as approved gallery facts. The full live 1200-point training flow is **NOT TESTED**; a visible training entry is not evidence of that progression. The separate application was left unchanged.

## Validation and performance

Environment: installed Chrome headless on Windows, 1280 × 720 desktop, ANGLE/SwiftShader software WebGL. Phone 390 × 844 and tablet 768 × 1024 use touch/browser emulation at DPR 1. These are not physical-device results.

| Check | Result |
| --- | --- |
| `npm run build` | PASS; existing Vite 8.3.4, 32 transformed modules. JS gzip approximately 266.01 kB; no dependency changes. |
| `$env:CHROME='C:/Program Files/Google/Chrome/Application/chrome.exe'; npm test` | PASS; 145 showroom checks, zero failures, plus original world smoke checks. |
| Baseline/no-index whitespace checks | PASS; zero issues in modified/new implementation, tests and README; report checked after generation. |
| Existing world regression | Mall browse/try-on/cart; garage mods; player/AI race and full lap; Office enter/links/exit; gun-range hits; avatar customizer; first-person walk; home/pool scenes; minimap toggle; actual golf putt and gym repetitions/exit. |
| Desktop/touch/tablet | All five panels reachable; touch enter/exit/kiosk; clean focus/input ownership; no horizontal document/panel overflow; minimum 48px product controls; zero phone/tablet application errors. |
| Application diagnostics | PASS; no application console errors/warnings in the final smoke run. Software-WebGL driver diagnostics are treated separately by the unchanged smoke filter. |
| Strict budgets | PASS; max 337 draws (10-race-grid), 970,184 triangles (05-mall-fashion), 0.22 ms/update (gallery/17-island-all-around). Thresholds remain strictly below 400 draws, 3M triangles and 4 ms simulation/update per frame. |

| Comparable view | V0.1 draws | V0.2 draws | V0.1 triangles | V0.2 triangles | Median update ms: V0.1 / V0.2 |
| --- | --- | --- | --- | --- | --- |
| exterior | 284 | 284 | 811,044 | 811,044 | 0.077 / 0.067 |
| reception | 44 | 42 | 45,686 | 49,148 | 0.032 / 0.045 |
| i | 44 | 48 | 45,656 | 49,150 | 0.037 / 0.271 |
| ii | 45 | 50 | 45,692 | 49,188 | 0.087 / 0.031 |
| l | 45 | 47 | 45,692 | 49,182 | 0.059 / 0.032 |
| city | 224 | 224 | 808,590 | 808,590 | 0.396 / 0.109 |
| mall | 263 | 263 | 915,870 | 915,870 | 0.132 / 0.197 |

Comparable V0.1/V0.2 measurements use a separate, identical seven-view benchmark: fresh default avatar, same installed Chrome/SwiftShader, 1280 × 720, same coordinates/yaw/pitch/distance, 1500ms settling, fully reset renderer counters, and median of five 120-update batches. This avoids confusing customized-avatar smoke screenshots with fresh-avatar baseline samples. Samples are local software-renderer measurements, not a hardware FPS guarantee. Timing is noisy; draw/triangle counts are more repeatable. Raw samples: `tests/out/showroom-v02/comparison.json`.

## Screenshots and evidence

Evidence is separate from V0.1, ignored by Git and excluded from production imports: `tests/out/showroom-v02/`. `test.log`, `performance.json`, `gallery/results.json`, `comparison.json`, `preservation.json`, `kitchen-preservation.json` and `diff-summary.json` document the final results. The original V0.1 report/evidence remain unchanged.

| Bay | Third person | First person |
| --- | --- | --- |
| I-Type (Straight) | [View](C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/tests/out/showroom-v02/gallery/11-i-third.png) | [View](C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/tests/out/showroom-v02/gallery/11-i-first.png) |
| II-Type (Parallel) | [View](C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/tests/out/showroom-v02/gallery/11-ii-third.png) | [View](C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/tests/out/showroom-v02/gallery/11-ii-first.png) |
| L-Type (Corner) | [View](C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/tests/out/showroom-v02/gallery/11-l-third.png) | [View](C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/tests/out/showroom-v02/gallery/11-l-first.png) |
| Face to Face (Peninsula) | [View](C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/tests/out/showroom-v02/gallery/11-peninsula-third.png) | [View](C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/tests/out/showroom-v02/gallery/11-peninsula-first.png) |
| Island (Center) | [View](C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/tests/out/showroom-v02/gallery/11-island-third.png) | [View](C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/tests/out/showroom-v02/gallery/11-island-first.png) |



Gallery overviews: [first row](C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/tests/out/showroom-v02/gallery/14-first-row-overview.png), [second row](C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/tests/out/showroom-v02/gallery/18-second-gallery-overview.png).

Actual walking-route evidence: [Peninsula open side and connected end](C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/tests/out/showroom-v02/gallery/16-peninsula-open-side.png), [Island rear and free end](C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/tests/out/showroom-v02/gallery/17-island-all-around.png).

Wayfinding: [five-bay minimap](C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/tests/out/showroom-v02/gallery/13-five-bay-minimap.png), [five-entry reception guide](C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/tests/out/showroom-v02/gallery/10-five-layout-guide.png), [reception](C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/tests/out/showroom-v02/gallery/02-reception.png), [exterior](C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/tests/out/showroom-v02/gallery/01-exterior.png).

Panels and kiosk: [product information](C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/tests/out/showroom-v02/gallery/06-product-panel.png), [kiosk](C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/tests/out/showroom-v02/gallery/07-kiosk-panel.png), [actual kitchen destination](C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/tests/out/showroom-v02/gallery/15-kitchen-destination.png).

Emulated touch: [phone panel](C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/tests/out/showroom-v02/gallery/08-phone-panel.png), [phone gallery](C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/tests/out/showroom-v02/gallery/09-phone-gallery.png), [tablet panel](C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/tests/out/showroom-v02/gallery/08-tablet-panel.png), [tablet gallery](C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/tests/out/showroom-v02/gallery/09-tablet-gallery.png).

Visual QA inspected every bay in first/third person, the two gallery overviews, Peninsula connection/open rear, Island rear/end access, central minimap, guide, product/kiosk panels, and phone/tablet presentation. Expected bay headings remain separate from hoods, foreground boards do not cover the visitor or products from the expected station, and ceiling supports visibly connect the hoods.

## Remaining review items

- **NOT TESTED:** physical phones/tablets and hardware-GPU performance.
- **NOT TESTED:** deployed kitchen commit/version, selected-layout routes and complete 1200-point training progression.
- **PENDING:** customer/public wording approval for the five concept presentations, translations if later added, and final brand/product/market presentation. Existing accepted content does not grant new manufacturer endorsement or rights approval.
- This is the scoped local five-layout milestone for independent review. Public release, approved installation guidance, commercial pricing and later integration require separate work/decisions.

Local development remains available at [Virtual World](http://127.0.0.1:5173/). Run `npm run dev -- --host 127.0.0.1` from the project folder if the server is stopped later.
