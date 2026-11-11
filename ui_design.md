# UI Design — speedtyper

Rendering rules for the typing area, stats, and game-state flow. Source of truth: `src/ui.js` (`renderTargetText`, `highlightInput`, `resetUI`) + `src/game.js` (round lifecycle) + `style.css`.

## Theme

- **Style**: minimalist, distraction-free; fixed dark monospace palette
- **Background**: `#333333` (body)
- **Default text**: light grey `#AAAAAA`
- **Correct character**: white `#FFFFFF`
- **Error indication**: red `#FF5555`
- **Typography**: monospace (`'Courier New', Courier, monospace`) for consistent char width/alignment
- **Layout**: `#game-container` centered vertically + horizontally on the viewport; `max-width: 600px`, `width: 90%`

## Layout structure

```
#game-container
├─ #history          completed lines crawling up, gradient fade by age (last 20)
├─ #typing-area      #target-text (one span per char) + hidden #user-input overlay
├─ #stats            WPM: <n>   Accuracy: <n>%   (below the phrase, space-around)
└─ #message          "Press any key to start" / "Press Space or Enter to restart"
```

- `#user-input` is a hidden text field (`opacity: 0`, `pointer-events: none`) absolutely positioned over `#target-text`; it stays focused via a blur listener.
- Target text renders as one `<span>` per character in `#target-text`. Untyped chars show the target char at low opacity (`0.3`); typed-correct chars turn white; errors turn red.

## Per-character feedback

On every `input` event, `updateHighlight(inputVal)` re-evaluates **all** positions 0..target-length (deterministic, no clearing logic — earlier errors persist as typing advances):

| Case | Rendering |
|---|---|
| Untyped (`i >= inputVal.length`) | Restore target char, no class (opacity 0.3) |
| `typed === expected` | `.correct` → white |
| Missing space (`expected === ' '` but typed a char) | Show the typed char in red: set `span.textContent = typed`, `.incorrect` |
| Extra space (`typed === ' '` but not expected) | Red bar instead of invisible space: `span.textContent = ''`, `.incorrect .space-bar` |
| Other mismatch | `.incorrect` → red |

- **Space errors** (the two tricky cases): missing space shows the typed letter in red at its position; extra space renders a red baseline bar via `.space-bar` (`display: inline-block`, `width: 1ch`, `height: 0.2em`, `background-color: #FF5555`) — visually distinct from text, one monospace cell wide.

## Stats display

- Shown live in `#stats` while TYPING, and finalized on RESULTS.
- **WPM** = `(chars / 5) / minutes`; `calculateWPM(inputLength, elapsedMs)` → `Math.round((len/5)/(elapsedMs/60000))`, returns 0 if `elapsedMs <= 0`.
- **Accuracy** = `(correct keystrokes / total keystrokes) * 100` (rounded). Every keystroke counts, including backspaces and corrections. Example: typing `a`, backspace, then `b` on target `ab` = 3 keystrokes (1 correct + 2 errors).
- `calculateAccuracy()` returns 100 when no keystrokes yet.

## Game-state flow

| State | Trigger | UI |
|---|---|---|
| IDLE | Initial load / after restart | Random segment rendered, message "Press any key to start"; first printable key starts the round |
| TYPING | First printable keypress (starts timer) | Live per-char feedback + live stats |
| RESULTS | Reached target length with correct last char, or over-typed | Final WPM/accuracy shown, message "Press Space or Enter to restart" |

- Restart: in RESULTS, **Space** or **Enter** calls `startNewRound()` (new random segment, resets state/stats).
- Round ends on the last-correct character *or* when input exceeds target length.

## Data validation

- If `TYPER_LINES` is missing/invalid (not a non-empty array of strings), the app renders "Failed to load typing lines." and stops — no game loop.
