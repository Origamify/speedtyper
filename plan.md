# Plan: Speedtyper Project

### Goal
Create a minimalist, client-side speed typing web application.

### Specification
* Single page web app (HTML/CSS/JS).
* **Serverless**: Must work by opening `index.html` directly in a browser (no HTTP server required). No ES modules (`import`/`export`), no `fetch` for external files.
* Visuals: Grey background, light grey text.
* Interactivity: Text turns white when typed correctly.
* Features: WPM/Accuracy stats, inline word data, restart with Space/Enter.

### Steps / Phases

**Commit 1: Project Scaffolding & Data Setup**
* [x] Create `index.html`, `style.css`, `script.js`.
* [x] Create `typer_lines.json` with sample text.
* **Verification**: Open `index.html` in a browser and check DevTools Console for 404 errors or syntax issues.

**Commit 1b: Serverless Migration**
* [ ] Convert all ES modules (`import`/`export`) to IIFE pattern exposing globals on `window`.
* [ ] Inline word data from JSON into JS (replace `fetch` with inline array).
* [ ] Fix script load order in HTML (no module type needed).
* **Verification**: Open `index.html` directly from the filesystem — no server, no console errors.

**Commit 2: Initial UI & Inline Data Rendering**
* [x] Load inline word data into game state.
* [x] Render target text to the DOM.
* **Verification**: Check that the text from inline data is visible on the webpage upon loading.

**Commit 3: Core Typing Engine & Visual Feedback**
* [x] Implement keyboard event listeners.
* [x] Logic to compare input vs target text.
* [x] Update character colors (Light Grey -> White) on correct match.
* **Verification**: Type characters and confirm they change color immediately upon a correct match.

**Commit 4: Statistics & Game Completion**
* [x] Detect end of text segment.
* [x] Calculate WPM and Accuracy.
* [x] Display results on screen.
* **Verification**: Complete a word/sentence and check if the WPM and Accuracy numbers appear correctly.

**Commit 5: Restart Logic & Game Loop**
* [x] Implement `Space`/`Enter` listener for the `RESULTS` state.
* [x] Reset game state and fetch next text segment.
* **Verification**: Press `Space` or `Enter` after stats are displayed to ensure a new word is loaded and the UI resets.

**Commit 6: UI Polish & Styling**
* [x] Apply minimalist CSS (centering, monospace font).
* [x] Refine color palette.
* **Verification**: Visual check for centering, typography, and responsive behavior in different window sizes.

### Testing Strategy

* **Unit Testing**
    * Manual verification of WPM calculation: `(chars / 5) / time`.
    * Manual verification of Accuracy: `correct / total * 100`.
* **Integration Testing**
    * End-to-end flow: Load $\rightarrow$ Type $\rightarrow$ Results $\rightarrow$ Restart.
* **Visual Testing**
    * Check color transitions (Light Grey to White).
    * Verify centered layout and monospace font alignment.
