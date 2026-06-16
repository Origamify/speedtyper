# Requirements: Speedtyper

## Goal
A minimalist, client-side speed typing web application focused on distraction-free practice.

## Functional Requirements

### Word Management
* **Word Source**: Text content must be loaded from inline data (JavaScript array) — no external file loading.
* **Data Format**: The data shall contain an array of strings (e.g., `["word", "sentence"]`).
* **Error Handling**: If data is empty or invalid, the app should display a fallback message.

### Typing Engine
* **Input Tracking**: The engine must track user keystrokes in real-time against the target text.
* **Visual Feedback**: 
    * Correct characters: Change color from light grey to white immediately upon typing.
    * Incorrect characters: Remain light grey (or provide subtle visual feedback).
* **Case Sensitivity**: Input must match the case of the target text exactly.
* **Text Navigation**: Support for backspace/deletions to correct mistakes before completing a segment.

### Game States
* **IDLE/START**: The initial state, displaying the first word or a "Press any key to start" prompt.
* **TYPING**: The active state where input is recorded and WPM/Accuracy are being calculated in the background.
* **RESULTS**: The state triggered upon completing the current text segment, displaying statistics and restart instructions.

### Statistics Calculation
* **WPM (Words Per Minute)**: Calculated as `(Total Characters / 5) / Time in Minutes`.
* **Accuracy**: Calculated as `(Correct Keystrokes / Total Keystrokes) * 100%`. Every keystroke is counted, including backspaces and corrections. Example: typing `a`, backspacing, then typing `b` on target `ab` counts 3 total keystrokes (1 correct + 2 errors).
* **Display**: Results must be shown clearly on the screen once a segment is finished.

### Restart Mechanism
* **Input Trigger**: When in the `RESULTS` state, pressing `Space` or `Enter` resets the game and loads a new text segment.

## UI/UX Requirements

### Aesthetic & Theme
* **Style**: Minimalist, distraction-free design.
* **Color Palette**:
    * **Background**: Dark Grey (e.g., `#333333`).
    * **Default Text**: Light Grey (e.g., `#AAAAAA`).
    * **Correct Character**: White (`#FFFFFF`).
    * **Error Indication (Optional)**: Subtle Red (e.g., `#FF5555`) for incorrect characters.

### Typography & Layout
* **Typography**: Monospace font (e.g., `Courier New`, `monospace`) to ensure consistent character width and alignment.
* **Layout**: The typing area and statistics must be centered both vertically and horizontally on the viewport.

## Non-Functional Requirements
* **Platform**: Pure client-side implementation using vanilla HTML5, CSS3, and JavaScript. No ES modules (`import`/`export`) — all code uses IIFE/globals for compatibility.
* **Serverless**: Must work by opening `index.html` directly in a browser from the filesystem (no HTTP server required). No `fetch`, no external dependencies.
* **Performance**: Near-zero latency between keystroke and visual update.
* **Dependencies**: Zero external libraries or frameworks.

## Data Source (`typer_lines.js`)
External JS file defining `TYPER_LINES` as a global array of strings:
```js
const TYPER_LINES = [
    "the quick brown fox jumps over the lazy dog",
    "pack my box with five dozen liquor jugs",
    "minimalist design is key"
];
```

## Constraints
* Must run by opening `index.html` directly in any modern web browser — no HTTP server, no build step, no dependencies.
* No backend or database required.
