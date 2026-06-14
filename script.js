import { loadWords, handleInput } from './src/game.js';
import { elements } from './src/ui.js';

// Handle input changes
elements.userInput.addEventListener('input', (e) => {
    handleInput(e.target.value);
});

// Ensure input has focus when starting
document.addEventListener('keydown', () => {
    if (document.activeElement !== elements.userInput) {
        elements.userInput.focus();
    }
});

// Initialize game
window.onload = loadWords;
