/**
 * Game Module - Core game logic, state machine and event wiring.
 * Depends on: TYPER_LINES (data), UI (rendering), Utils (calculations).
 * Load after ui.js and utils.js.
 */
const Game = (() => {
    'use strict';

    // --- Game state ---
    const state = {
        targetText: '',
        startTime: null,
        isPlaying: false,
        roundComplete: false,
        totalKeystrokes: 0,
        correctKeystrokes: 0
    };

    // --- Data validation (fallback) ---
    function isValidLines(lines) {
        return Array.isArray(lines) && lines.length > 0 &&
            lines.every(line => typeof line === 'string' && line.length > 0);
    }

    /**
     * Picks a random target text and resets state + UI for a new round.
     */
    function startNewRound() {
        // The previous line only leaves once the user moves on
        if (state.targetText) UI.archiveLine(state.targetText);
        state.targetText = TYPER_LINES[Math.floor(Math.random() * TYPER_LINES.length)];
        state.roundComplete = false;
        state.startTime = null;
        state.isPlaying = false;
        state.totalKeystrokes = 0;
        state.correctKeystrokes = 0;
        UI.renderTargetText(state.targetText);
        UI.resetUI();
        UI.elements.userInput.focus();
    }

    /**
     * Ends the round and displays the final stats.
     */
    function endGame() {
        state.roundComplete = true;
        state.isPlaying = false;
        const elapsed = (Date.now() - state.startTime) / 1000;
        const inputVal = UI.elements.userInput.value;
        UI.updateStats(
            Utils.calculateWPM(inputVal.length, elapsed),
            Utils.calculateAccuracy(state.correctKeystrokes, state.totalKeystrokes)
        );
        UI.showMessage('Press Space or Enter to restart');
    }

    /**
     * Handles character input: highlight, live stats, end conditions.
     */
    function handleInput() {
        if (state.roundComplete) return;

        const inputVal = UI.elements.userInput.value;
        UI.highlightInput(state.targetText, inputVal);

        // Live stats only while TYPING (startTime is set by the first keypress)
        if (!state.isPlaying) return;

        const elapsed = (Date.now() - state.startTime) / 1000;
        UI.updateStats(
            Utils.calculateWPM(inputVal.length, elapsed),
            Utils.calculateAccuracy(state.correctKeystrokes, state.totalKeystrokes)
        );

        // RESULTS: over-typed, or reached target length with a correct last char
        const lastCharCorrect = inputVal.length === state.targetText.length &&
            inputVal[inputVal.length - 1] === state.targetText[state.targetText.length - 1];
        if (inputVal.length > state.targetText.length || lastCharCorrect) {
            endGame();
        }
    }

    /**
     * Document keydown: restart, IDLE -> TYPING transition, keystroke counting.
     * @param {KeyboardEvent} e
     */
    function onKeyDown(e) {
        // Ignore modifier shortcuts (Ctrl+C, Cmd+A, ...) — they are not typing.
        // Exception: AltGr reports ctrlKey+altKey but still inserts a real
        // character on European layouts — let it through.
        if ((e.ctrlKey || e.metaKey || e.altKey) && !e.getModifierState?.('AltGraph')) return;

        // RESULTS: Space/Enter restarts the round
        if (state.roundComplete) {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                startNewRound();
            }
            return;
        }

        // IDLE -> TYPING on the first printable keypress
        if (!state.isPlaying && e.key.length === 1) {
            state.isPlaying = true;
            state.startTime = Date.now();
            UI.showMessage('');
        }

        // Count every keystroke (backspaces included)
        if (e.key === 'Backspace') {
            state.totalKeystrokes++;
            return;
        }
        if (e.key.length !== 1) return;

        state.totalKeystrokes++;
        const pos = UI.elements.userInput.value.length;
        if (pos < state.targetText.length && e.key === state.targetText[pos]) {
            state.correctKeystrokes++;
        }
    }

    /**
     * Wires DOM events and starts the first round. Runs at script load.
     */
    function init() {
        if (!isValidLines(typeof TYPER_LINES !== 'undefined' ? TYPER_LINES : undefined)) {
            UI.elements.targetText.textContent = 'Failed to load typing lines.';
            UI.showMessage('Error loading data.');
            return;
        }

        document.addEventListener('keydown', onKeyDown);
        UI.elements.userInput.addEventListener('input', handleInput);

        // Anti-cheat: stats must come from real keystrokes only
        for (const evt of ['paste', 'drop']) {
            UI.elements.userInput.addEventListener(evt, e => e.preventDefault());
        }

        // Focus management: keep the hidden input focused
        UI.elements.userInput.addEventListener('blur', () => {
            setTimeout(() => UI.elements.userInput.focus(), 0);
        });

        startNewRound();
    }

    /**
     * Returns current game state (for testing).
     */
    function getState() {
        return { ...state };
    }

    return { startNewRound, handleInput, onKeyDown, init, getState };
})();

window.Game = Game;
Game.init();
