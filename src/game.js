/**
 * Game Module - Core game logic.
 */
const Game = (() => {
    'use strict';

    // Game state
    let state = {
        targetText: '',
        words: [],
        startTime: null,
        errors: 0,
        totalTyped: 0,
        isPlaying: false,
        roundComplete: false
    };

    /**
     * Loads words from the JSON file.
     */
    function loadWords() {
        state.words = TYPER_LINES;
        if (state.words.length === 0) {
            console.error('No words found');
            UI.elements.targetText.textContent = 'Failed to load words. Please try again later.';
            UI.showMessage('Error loading data.');
            return;
        }
        startNewRound();
    }

    /**
     * Starts a new round of typing.
     */
    function startNewRound() {
        if (state.words.length === 0) return;

        state.roundComplete = false;
        // Pick a random word/sentence from the array
        state.targetText = state.words[Math.floor(Math.random() * state.words.length)];
        UI.renderTargetText(state.targetText);
        resetGameState();
        Array.from(UI.elements.targetText.children).forEach(span => {
            span.className = '';
        });
    }

    /**
     * Resets the game state and UI for a new round.
     */
    function resetGameState() {
        UI.elements.userInput.value = '';
        state.startTime = null;
        state.errors = 0;
        state.totalTyped = 0;
        state.isPlaying = false;
        UI.updateStats(0, 100);
        UI.showMessage('Press any key to start');
    }

    /**
     * Starts the timer and game play.
     */
    function startGame() {
        state.isPlaying = true;
        state.startTime = Date.now();
        UI.showMessage('');
    }

    /**
     * Handles character input and updates state/UI.
     * @param {string} inputVal - The current value of the user input field.
     */
    function handleInput(inputVal) {
        if (state.roundComplete) return;

        if (!state.isPlaying) {
            startGame();
        }

        UI.highlightInput(state.targetText, inputVal);

        // Update live stats
        const elapsed = (Date.now() - state.startTime) / 1000;
        const correctChars = inputVal.split('').filter((c, i) => c === state.targetText[i]).length;
        UI.updateStats(
            Utils.calculateWPM(inputVal.length, elapsed),
            Utils.calculateAccuracy(correctChars, inputVal.length)
        );

        // Check if finished (for Commit 4)
        if (inputVal.length >= state.targetText.length) {
            endGame();
        }
    }

    /**
     * Ends the game and displays results.
     */
    function endGame() {
        state.roundComplete = true;
        state.isPlaying = false;
        const elapsed = (Date.now() - state.startTime) / 1000;
        const inputVal = UI.elements.userInput.value;
        const correctChars = inputVal.split('').filter((c, i) => c === state.targetText[i]).length;

        const wpm = Utils.calculateWPM(inputVal.length, elapsed);
        const accuracy = Utils.calculateAccuracy(correctChars, inputVal.length);

        UI.updateStats(wpm, accuracy);
        UI.showMessage('Done! Press Space, Enter, or Escape to restart');
    }

    /**
     * Returns current game state (for testing).
     */
    function getState() {
        return { ...state };
    }

    return {
        loadWords,
        startNewRound,
        handleInput,
        getState
    };
})();

window.Game = Game;
