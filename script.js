// Handle input changes
UI.elements.userInput.addEventListener('input', (e) => {
    Game.handleInput(e.target.value);
});

// Restart on Space or Enter after game ends
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        const state = Game.getState();
        if (state.roundComplete) {
            Game.startNewRound();
        }
    }
});

// Ensure input has focus when starting
document.addEventListener('keydown', () => {
    if (document.activeElement !== UI.elements.userInput) {
        UI.elements.userInput.focus();
    }
});

// Initialize game
window.onload = Game.loadWords;
