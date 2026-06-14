import * as ui from './ui.js';
import * as utils from './utils.js';

// Game state
let state = {
    targetText: '',
    words: [],
    startTime: null,
    errors: 0,
    totalTyped: 0,
    isPlaying: false
};

/**
 * Loads words from the JSON file.
 */
export async function loadWords() {
    try {
        const response = await fetch('typer_lines.json');
        if (!response.ok) {
            throw new Error('Failed to load words');
        }
        state.words = await response.json();
        if (state.words.length === 0) {
            throw new Error('No words found in JSON');
        }
        startNewRound();
    } catch (error) {
        console.error(error);
        ui.elements.targetText.textContent = 'Failed to load words. Please try again later.';
        ui.showMessage('Error loading data.');
    }
}

/**
 * Starts a new round of typing.
 */
export function startNewRound() {
    if (state.words.length === 0) return;
    
    // Pick a random word/sentence from the array
    state.targetText = state.words[Math.floor(Math.random() * state.words.length)];
    ui.renderTargetText(state.targetText);
    resetGameState();
}

/**
 * Resets the game state and UI for a new round.
 */
function resetGameState() {
    ui.elements.userInput.value = '';
    state.startTime = null;
    state.errors = 0;
    state.totalTyped = 0;
    state.isPlaying = false;
    ui.updateStats(0, 100);
    ui.showMessage('Press any key to start');
}

/**
 * Starts the timer and game play.
 */
export function startGame() {
    state.isPlaying = true;
    state.startTime = Date.now();
    ui.showMessage('');
}

/**
 * Handles character input and updates state/UI.
 * @param {string} inputVal - The current value of the user input field.
 */
export function handleInput(inputVal) {
    if (!state.isPlaying) {
        startGame();
    }

    ui.highlightInput(state.targetText, inputVal);

    // Check if finished (for Commit 4)
    if (inputVal.length >= state.targetText.length) {
        endGame();
    }
}

/**
 * Ends the game and displays results.
 */
export function endGame() {
    state.isPlaying = false;
    // TODO: Implement Commit 4: Statistics & Game Completion
}

/**
 * Returns current game state (for testing).
 */
export function getState() {
    return { ...state };
}
