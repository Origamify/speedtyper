# speedtyper

Minimalist, distraction-free speed typing practice app — zero dependencies, zero build step.

## Purpose

Open `index.html` in any browser and type. The app picks a random text segment from an inline data file, tracks every keystroke against it with per-character visual feedback, and reports live WPM and accuracy. A thin, self-contained practice tool — not a platform.

## Scope

In:
- Single-page app: vanilla HTML/CSS/JS, no frameworks, no build tools, no server
- Works by opening `index.html` directly from the filesystem (no ES modules, no `fetch`)
- Inline text data (`src/typer_lines.js` → global `TYPER_LINES` array): pangrams, phrases, quotes
- Game states: IDLE → TYPING → RESULTS; restart via Space/Enter
- Live stats: WPM `(chars / 5) / minutes`, accuracy `(correct keystrokes / total keystrokes) * 100` (backspaces counted as keystrokes)
- Visual feedback: correct chars turn white, errors highlighted in red (missing space shows the typed char in red; extra space shows a red bar)

Out:
- Accounts, persistence, or score history
- Timed modes, leaderboards, or configurable text sets
- Backend of any kind
- i18n / theming beyond the fixed dark monospace palette

## Usage

1. Open `index.html` in a modern browser.
2. Start typing — the first printable key starts the round; progress and stats update live.
3. Complete the segment, then press **Space** or **Enter** to start a new round.