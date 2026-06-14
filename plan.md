# Plan: Speedtyper Project

### Goal
Create a minimalist, client-side speed typing web application.

### Specification
* Single page web app (HTML/CSS/JS).
* Visuals: Grey background, light grey text.
* Interactivity: Text turns white when typed correctly.
* Features: WPM/Accuracy stats, JSON word source, restart with Space/Enter.

### Steps / Phases

**Commit 1: Project Scaffolding & Data Setup**
* [x] Create `index.html`, `style.css`, `script.js`.
* [x] Create `typer_lines.json` with sample text.
* **Verification**: Open `index.html` in a browser and check DevTools Console for 404 errors or syntax issues.

**Commit 2: JSON Data Loading & Initial UI**
* [ ] Implement `fetch` for `typer_lines.json`.
* [ ] Render target text to the DOM.
* **Verification**: Check that the text from `typer_lines.json` is visible on the webpage upon loading.

**Commit 3: Core Typing Engine & Visual Feedback**
* [ ] Implement keyboard event listeners.
* [ ] Logic to compare input vs target text.
* [ ] Update character colors (Light Grey -> White) on correct match.
* **Verification**: Type characters and confirm they change color immediately upon a correct match.

**Commit 4: Statistics & Game Completion**
* [ ] Detect end of text segment.
* [ ] Calculate WPM and Accuracy.
* [ ] Display results on screen.
* **Verification**: Complete a word/sentence and check if the WPM and Accuracy numbers appear correctly.

**Commit 5: Restart Logic & Game Loop**
* [ ] Implement `Space`/`Enter` listener for the `RESULTS` state.
* [ ] Reset game state and fetch next text segment.
* **Verification**: Press `Space` or `Enter` after stats are displayed to ensure a new word is loaded and the UI resets.

**Commit 6: UI Polish & Styling**
* [ ] Apply minimalist CSS (centering, monospace font).
* [ ] Refine color palette.
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
