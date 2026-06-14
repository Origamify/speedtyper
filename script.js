// Ensure input has focus when starting
document.addEventListener('keydown', () => {
    if (document.activeElement !== UI.elements.userInput) {
        UI.elements.userInput.focus();
    }
});

// Restart on Space/Enter after game ends
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
        const state = Game.getState();
        if (state.roundComplete) {
            e.preventDefault();
            Game.startNewRound();
        }
    }
});

// Handle input changes
UI.elements.userInput.addEventListener('input', (e) => {
    Game.handleInput(e.target.value);
});

// Initialize game
window.onload = Game.loadWords;
