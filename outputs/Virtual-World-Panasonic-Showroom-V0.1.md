# Virtual World — Panasonic S-CLASS Showroom V0.1

Implemented and validated locally on 12 October 2026. This milestone adds one procedural concept showroom to the existing world. Visitors can enter, browse three layouts and product information, launch the existing kitchen application in another tab, return and leave. Build, final production smoke, all 54 showroom extension checks and the retained performance gates **PASS**.

Local game: <http://127.0.0.1:5173/>. Find **S-CLASS / Showroom** on the minimap, north of the Virtual Office, beside the northern sidewalk. Use **E** or tap the prompt to enter. The marked interior exit returns to town.

## 1. Source baseline and preserved work

- Project: `C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main` (existing extracted ZIP).
- Read the requested master brief completely; inspected README, package/lockfile and the specified world, Office, builder, batching, input, player, minimap, UI and smoke-test sections. No applicable AGENTS.md was found.
- Git 2.47.1, Node v24.21.0 and npm 11.6.4 are available. Existing dependencies installed successfully with `npm ci`; no new package was added.
- The folder has no independent Git repository. Git resolves to an existing parent repository at `C:/Users/OE-DKP-20-006`, branch `master`, where this project is untracked. No Git initialization, branch operation, commit, push, reset or deployment was performed.
- Before implementation, copied source, tests and root configuration to ignored `dev/showroom-v01-baseline/`. Baseline smoke passed after the documented Windows test-path correction.
- Preserved visible Virtual World, Virtual Raceway and Virtual News naming. Legacy folder/package names and the real `https://mingalar.news/` destination remain as they were. Existing garage, race, Office, panels, avatar and other gameplay modules are unchanged against the saved source snapshot; only the world integration and shared input/UI owners received scoped changes.
- The separate kitchen reference was read only. SHA-256 comparison found **0 changed/missing files across 48 recorded reference files**, excluding `.git`, dependency and build directories. Neither kitchen working copy nor Roblox source was edited.

## 2. Files changed and added

| File | Change |
|---|---|
| `src/panasonicShowroom.js` — new | Procedural exterior/interior, I/II/L exhibits, zones, visit snapshots and information/kiosk panels. |
| `src/showroomConfig.js` — new | One kitchen URL setting with URL validation. |
| `src/world.js` | Builds the new showroom within the current world. |
| `src/main.js` | Existing interaction wiring, third minimap region, modal/transition guards, shared visibility-loop ownership. |
| `src/controls.js` | Suspend/restore input, clear pointer/keyboard state, allow Tab, guard late pointer-lock completion. |
| `src/ui.js` | Opt-in modal panel ownership, named dialog, focus trapping/return and Escape. |
| `src/style.css` | Scoped showroom panel spacing, immediate modal presentation, 48px targets, focus styles and prompt wrapping. |
| `index.html` | Focusable named game canvas; existing Virtual branding retained. |
| `tests/smoke.mjs` | Windows file-URL portability, extension integration and performance evidence output. |
| `tests/showroom.mjs` — new | Showroom, keyboard/touch, return-state, repeated-visit and golf/gym checks. |
| `README.md` | Local showroom instructions, configuration location and Windows test command. |
| This report — new | Scope, validation and evidence for independent review. |

Generated `dist/`, screenshots, JSON results, logs, baseline copies and diff-summary helper files remain in existing ignored folders. `.gitignore`, package.json, package-lock.json and vite.config.js are unchanged.

## 3. Exterior placement and occupied plots

Shell: **x 26–58, z −120–−100**, height 9. Entrance interaction: **(42, −123)**, radius 2.8. North-facing frontage connects to the sidewalk by an 8×6 approach slab. Base paving spans x 24–60, z −122–−98; canopy/roof stay within the open frontage.

Checked current geometry and colliders, including the Office at x 22–62/z −92–−52, garden beginning x 68, northern road around z −132, roadside trees and the distant race route. The new plot is north of the Office, with space between them, and does not require moving an attraction. The occupied-plot browser assertion finds exactly one above-floor blocker in the shell footprint: the newly registered shell itself. Exterior screenshot verifies the approach and neighboring buildings. Minimap identifies **S-CLASS** and **Showroom**.

## 4. Interior coordinates and entrance/exit

Interior center **(4200, 0)**, width 72, depth 54, height 10: x 4164–4236, z −27–27. Existing Office interior remains around x 3000. Showroom minimap region: x 4158–4242, z −33–33, range 36.

- Entrance uses the existing fade, saves outside position/heading/camera/view, teleports to **(4200, 0, 18)** facing the gallery, and clears transition input.
- Exit zone **(4200, 23.5)**, radius 2.6, restores the saved outside visit. Fallback location is the showroom door if no visit snapshot exists.
- Reception **(4178, 12.4)**; kiosk **(4222, 12.6)**; layout prompts **(4177/4200/4223, 3.8)**. Nine separate product zones provide E/tap information.
- Counters and walls use the existing collision grid. The central gallery promenade is clear. Layout distances represent gallery exhibits, not validated installation dimensions.

## 5. Exact reused systems

`buildWorld()` / `finishWorld()` build and bake the addition. `ACTIONS`, `interact()` and `updateZones()` route existing E/tap interactions. `game.fadeTo()` → `ui.fade()`, `Player.teleport()` and `snapCamera()` provide the Office-style transition. `updateAreas()` / `updateLighting()` retain area visibility and interior lighting. `Minimap` receives another region through its existing constructor.

Geometry uses `box()`, `rbox()`, `cyl()` and `sign()`, with existing `m()` / `neon()` materials. Registration uses `W.zone()`, `W.solid()`, `W.mapRect()`, `W.mapLabel()`, `W.beginArea()` and `W.endArea()`. Information uses `ui.openPanel()` / `ui.closePanel()`. Existing `Controls` is extended with `clear()` / `suspend()`. The existing `renderer.setAnimationLoop()` owner is retained; no new renderer, scene, camera or game loop is introduced.

## 6. Layouts and information provenance

Read-only sources: `docs/S_CLASS_GAME_CONTENT.md`, `docs/V1.0.1_CONTENT_APPROVAL_MATRIX.md`, `outputs/Game-Mode-V1.0.1-Release-Fixes.md` in `C:/Users/OE-DKP-20-006/Documents/GitHub/Panasonic-S-Class-Kitchen-Game-Mode`.

| Display | Implemented relationship |
|---|---|
| I-Type, x 4177 | One straight row at z −17; sink and cooking zone share it. |
| II-Type, x 4200 | Two parallel rows at z −17 and −6; sink on the front row, cooking/hood on the other. |
| L-Type, x 4223 | Sink and cooking on the main row at z −17; connected return at x 4228.8 provides preparation space. |

Sink information derives from the accepted Raku-Suru low-step/gapless cleaning summary. Cooktop information derives from Flat Wide horizontal zones and front preparation/plating access. Hood information preserves the distinction between reduced fan maintenance and routine plate/surface cleaning; model-specific guidance remains in the kitchen experience. No maintenance intervals, warranty, prices, endorsement or new specifications were added.

Each bay and panel is explicitly a concept/layout demonstration. Geometry is simple procedural gallery representation, with no catalog photographs, external models, purported exact AI products, detailed kitchen viewport imports or scoring integration. Previously accepted knowledge summaries and layout mappings do **not** imply approval of this new public-facing wording; customer/public wording, manufacturer claims and rights review remain pending.

## 7. Kiosk configuration and verification

`src/showroomConfig.js` sets `KITCHEN_EXPERIENCE_URL` to the user-supplied **https://game-s-class-kitchen.iida-mm.com/**. Only HTTP(S) URLs without credentials are accepted, and the current world origin is rejected. Invalid/missing configuration renders a disabled action and neutral unavailable message.

The one visitor action is **Open S-CLASS Kitchen & Training**: a normal anchor with `target="_blank"` and `rel="noopener noreferrer"`. Copy explains opening another tab and returning to this world tab. No iframe, assumed local port, guessed production URL or unverified separate Explore/Training deep links are used.

HTTP verification returned **200** with title **Panasonic S-CLASS System Kitchen 3D Configurator**. Production-browser testing opened the actual link, loaded the S-CLASS application, observed its training/game entry and verified `window.opener === null`. The deployed application's precise build/version and all 1200-point training tasks were **NOT TESTED**; the reference development candidate's version is not inferred from the live page.

## 8. Input, pointer lock and focus

Showroom panels opt into the existing panel as a named modal dialog. HUD and game canvas become inert, Close receives focus, Tab/Shift+Tab wrap within visible actions, Escape closes, and focus returns to a connected opener or the game canvas. Controls have visible focus and at least 48px panel touch targets. Showroom modal dialogs appear immediately, making focus/touch targets visible and stationary from entry. This scoped rule does not change the presentation of existing nonmodal world panels.

`Controls.suspend()` saves prior enabled/pointer-lock intent/run-toggle state, disables world input, releases lock, clears keys, joystick/pointer captures, look/zoom, queued jump/fire and touch action. Closing restores the saved input owner once, without automatically recapturing the pointer. Late pointer-lock requests are rejected if a dialog has suspended input. Camera updates pause while a modal panel owns input, and transition guards prevent overlapping actions. Tab is no longer prevented by enabled world controls; interactive DOM elements do not trigger world hotkeys.

## 9. Area grouping and batching

Street shell attaches to the existing global static group. Interior geometry explicitly uses the current static group returned after `W.beginArea('panasonic-showroom', ...)`; `W.block()` / `W.slab()` were deliberately not used because they capture the original global group. A local `solidBox()` pairs explicit geometry with existing collider registration. `W.endArea()` and `finishWorld()` retain static batching and area visibility.

Signs/exhibits may be merged safely: interaction uses registered zones, not original mesh identity or a parent-only `userData.keep` flag. Nothing movable or detailed kitchen-specific is imported. Culling is visibility control, not lazy loading/unloading. Shared geometries/materials are not individually disposed. No global helper refactor or new dependency was needed.

## 10. World/tab return preservation

Opening the kiosk does not navigate the world tab. Browser assertions compare position, heading, first/third-person view, mode, camera yaw/pitch/distance/target/actual position and avatar appearance before and after the actual external tab visit. A separate visibility emulation checks that the existing loop stops, rendered frame stays unchanged and pending RAF count reaches zero, then resumes through the same owner. Hidden/return handling clears transient input and resets frame timing.

Repeated visits open/close the kiosk and enter/exit three times, with stable global listener registrations, one `#game` world canvas, one minimap canvas and at most one pending animation frame. Showroom exit additionally restores the saved exterior visit state. Headless visibility emulation is recorded separately from the actual external-tab opening; physical OS tab behavior is not claimed from emulation.

## 11. Build, tests and whitespace

- **PASS:** `npm run build`, Vite 8.3.4, 32 modules. Final build approximately 946.36kB JavaScript (264.46kB gzip), CSS 14.68kB (3.82kB gzip) and HTML 3.49kB (1.34kB gzip).
- **PASS:** pre-change `npm test` baseline, retaining the original performance thresholds.
- **PASS:** final rebuilt-production `npm test`, exit 0: all 54 showroom extension checks, original gameplay smoke, performance gates and application console checks. No extension FAIL or NOT TESTED entries. Out-of-scope physical devices/full kitchen scoring remain explicitly NOT TESTED below.
- **PASS:** `git diff --check -- .` produced no output. Because project files are untracked in the parent Git repository, this alone cannot inspect the implementation. Snapshot-based `git diff --no-index --check` found no whitespace diagnostics for modified files; its exit 1 indicates that differences exist. New source/test files have no trailing whitespace.
- Test-only Windows correction uses `fileURLToPath()` for output/Vite paths, preventing `/C:/...` path construction, and hides the preview subprocess window. Runtime configuration and performance gates are unchanged.
- First extended attempt found the asynchronous pointer-lock assertion and empty-attribute focus-test error, then hit a phone navigation timeout under concurrent software rendering. Fixed the assertion, added the late-lock guard, and paused the headless desktop page through the tested visibility owner while mobile contexts load. No failed checks were silently removed.

Validation logs: `dev/showroom-v01-baseline/smoke.log`, `dev/showroom-v01-test-attempt-1.log`, `dev/showroom-v01-test-attempt-2.log`, `dev/showroom-v01-test-attempt-3.log`, `dev/showroom-v01-test.log`. Machine-readable evidence: `tests/out/showroom-v01/results.json`, `performance.json`, `panel-capture.json`. Local source comparison: `dev/showroom-diff-summary.json`.

The second full run passed all 52 extension checks and original smoke/performance gates. Visual review then found panel captures at animation time zero: software headless compositing had not started the finite CSS slide animation, despite working controls. Screenshot capture finishes finite animations using Playwright's `animations: 'disabled'` and checks rendered opacity. A separate production capture verified visible desktop product/kiosk panels, 390px phone and tablet panels, with no overflow or application exceptions. The next run exposed an intermittent tablet Close tap during the slide animation; showroom modal presentation was changed to appear immediately, and touch checks now wait for confirmed closure before continuing. The final rebuilt production smoke run includes these fixes and **PASSes all 54 extension checks**, including visible panels and complete tablet kiosk/exit flows.

## 12. Screenshots, device scope and performance

Production `dist/` was tested through the existing Vite preview smoke test on port 4179; that test server stops after completion. The development server remains at port 5173. Browser: installed Google Chrome, Playwright-core 1.56.1, ANGLE/SwiftShader software WebGL. Profiles: desktop 1280×720; touch phone 390×844; touch tablet 768×1024. **NOT TESTED:** physical mobile devices or hardware GPU frame rates.

Screenshots are in ignored `tests/out/showroom-v01/`:

| Evidence | File |
|---|---|
| Exterior | [01-exterior.png](../tests/out/showroom-v01/01-exterior.png) |
| Reception | [02-reception.png](../tests/out/showroom-v01/02-reception.png) |
| I-Type | [03-layout-i.png](../tests/out/showroom-v01/03-layout-i.png) |
| II-Type | [04-layout-ii.png](../tests/out/showroom-v01/04-layout-ii.png) |
| L-Type | [05-layout-l.png](../tests/out/showroom-v01/05-layout-l.png) |
| Product information | [06-product-panel.png](../tests/out/showroom-v01/06-product-panel.png) |
| Kiosk | [07-kiosk-panel.png](../tests/out/showroom-v01/07-kiosk-panel.png) |
| 390px phone | [08-phone-panel.png](../tests/out/showroom-v01/08-phone-panel.png), [09-phone-gallery.png](../tests/out/showroom-v01/09-phone-gallery.png) |
| Tablet | [08-tablet-panel.png](../tests/out/showroom-v01/08-tablet-panel.png), [09-tablet-gallery.png](../tests/out/showroom-v01/09-tablet-gallery.png) |

**PASS:** desktop, phone and tablet E/tap entry/exit; I/II/L information; product/kiosk controls; named dialog, Tab/Shift+Tab/Escape/focus return; frozen player/camera input; first/third person; collision clearance; actual external kitchen opening/return; rendering pause emulation; repeated visits with stable canvas/loop/listeners; no horizontal overflow or new application errors. Both touch profiles report 48px product targets, visible panels, suspended movement and zero application errors. Screenshots were visually inspected after capture; panel text/actions fit the tested viewports.

| Showroom production view | Draws | Triangles | Simulation ms/update |
|---|---:|---:|---:|
| Exterior | 308 | 832,230 | 0.57 |
| Reception | 44 | 46,886 | 0.06 |
| I-Type | 44 | 46,856 | 0.04 |
| II-Type | 45 | 46,892 | 0.03 |
| L-Type | 45 | 46,892 | 0.03 |

| Comparable existing view | Baseline draws / tris(k) / sim ms | Final draws / tris(k) / sim ms |
|---|---|---|
| Spawn | 258 / 806 / 0.06 | 259 / 806 / 0.51 |
| Mall fashion | 284 / 970 / 0.27 | 285 / 970 / 0.14 |
| Garage front | 335 / 820 / 0.18 | 335 / 820 / 0.04 |

Final maxima across all recorded production views: **337 draws** at race grid, **970,184 triangles** at mall fashion, **1.78ms simulation/update** at city overview. Baseline maxima: 335 draws, about 970k triangles, 0.48ms simulation/update. The retained test enforces strict **<400 draws, <3M triangles, <4ms simulation/update**. Timing varies with load and sampling; these software measurements are not physical-device frame-rate guarantees. Full samples are in `performance.json`.

## 13. Existing-world regression results

**PASS:** start-up and retained Virtual branding; mall try-on/cart; garage modifications; race start, player/AI driving, a full lap (39.4s), camera modes and return to walking; Office entry/exit and existing business links; gun-range round and hits (1/6 test shots); avatar hair/body customization; first-person walking; minimap minimize/reopen; active mini-golf charge/putt/Escape exit; gym repetitions and E stop. Home/pool/golf/gym locations remain visible in the existing screenshot scenes; dedicated home-light/pool-swimming interactions were **NOT TESTED**. No changes were made to these gameplay implementations.

## 14. Remaining issues and approvals

No kitchen connection URL is missing after the user's reply. Physical device QA, exact live-kitchen build identification and full training/scoring verification remain outside the completed connection checks. Public/customer copy, product/manufacturer claims, brand/asset rights and installation-content approval remain pending as documented by the reference matrix. This report does **not** declare public-release readiness. The unavailable-URL fallback exists but was not exercised against a deliberately altered production URL in this run.

## 15. Diff size and next milestone

Snapshot comparison excluding this report: approximately **674 added / 21 removed lines**, including runtime, tests and README. Runtime/new showroom code accounts for approximately 383 added lines; tests account for 275; README 16. This report and ignored evidence/helpers are additional. Eight existing files changed, three source/test files added, plus this report. The snapshot allows reviewing the ZIP source without mutating the parent Git repository.

Recommended next milestone: independent review of V0.1 placement, copy and screenshots, followed by physical phone/tablet testing and customer approval of showroom wording. Detailed native kitchen models or training integration require a separately scoped later review. No later showroom implementation was started.
