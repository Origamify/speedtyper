# speedtyper — project.md

For agents. Human-facing purpose/usage: `about.md`. UI/rendering rules: `ui_design.md`.

## Status

Active. No related projects. Static site — host anywhere (or open `index.html` directly); no deploy pipeline.

- No known broken things.

## Scope

- Does: typing practice in the browser — random target line, live per-character feedback, WPM + accuracy, restart on Space/Enter. Serverless static page; works opened directly from the filesystem.
- Doesn't: no server, no persistence/history, no accounts, no custom text input, no timed modes.

## File map

| Path | Role | To change X → look in Y |
|---|---|---|
| `index.html` | Single page: stats bar, typing area (target text + hidden input), message line. Loads `src/` scripts in order: `typer_lines.js` → `utils.js` → `ui.js` → `game.js` | page structure → here |
| `style.css` | Dark monospace theme, hidden input overlay, `.correct`/`.incorrect`/`.space-bar` styles | colors/theme → here |
| `src/typer_lines.js` | Data: global `TYPER_LINES` array of strings | practice text → here only |
| `src/utils.js` | Pure math: `calculateWPM`, `calculateAccuracy` (global `Utils`) | stats formulas → here |
| `src/ui.js` | All DOM manipulation: span rendering, `highlightInput`, stats/messages, `resetUI` (global `UI`) | rendering/feedback → here + `style.css` |
| `src/game.js` | Game logic + event wiring: state, round lifecycle (IDLE → TYPING → RESULTS), keystroke counting, `init()` self-start (global `Game`) | game loop/behavior → here |
| `tests/harness.js` | Stub-DOM harness: evals the `src/` scripts offline into a fake `document` | test infrastructure → here |
| `tests/app.test.js` | Bun tests: round lifecycle, keystroke counting, stats, restart | test cases → here |
| `test.sh` | Runs `bun test` | — |
| `.gitignore` | `node_modules/` | — |
| `about.md` | Purpose/scope for humans | — |
| `ui_design.md` | UI/rendering spec | — |
| `README.md` | Public GitHub README (mirrors about.md + demo link) | — |

