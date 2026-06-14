/**
 * UI Module - Handles all DOM manipulations.
 */
const UI = (() => {
    'use strict';

    const elements = {
        targetText: document.getElementById('target-text'),
        userInput: document.getElementById('user-input'),
        wpm: document.getElementById('wpm'),
        accuracy: document.getElementById('accuracy'),
        message: document.getElementById('message')
    };

    /**
     * Renders the target text into the DOM, wrapping each character in a span for styling.
     * @param {string} text - The text to display.
     */
    function renderTargetText(text) {
        elements.targetText.innerHTML = text
            .split('')
            .map(char => `<span>${char}</span>`)
            .join('');
    }

    /**
     * Updates the WPM and Accuracy displays.
     * @param {number} wpm 
     * @param {number} accuracy 
     */
    function updateStats(wpm, accuracy) {
        elements.wpm.textContent = wpm;
        elements.accuracy.textContent = accuracy;
    }

    /**
     * Sets the message displayed to the user.
     * @param {string} msg 
     */
    function showMessage(msg) {
        elements.message.textContent = msg;
    }

    /**
     * Resets UI elements for a new round.
     */
    function resetUI() {
        elements.userInput.value = '';
        elements.wpm.textContent = '0';
        elements.accuracy.textContent = '100';
        showMessage('Press any key to start');
    }

    /**
     * Highlights characters in the target text based on user input.
     * @param {string} targetText - The full target string.
     * @param {string} inputVal - The current user input.
     */
    function highlightInput(targetText, inputVal) {
        const targetChars = targetText.split('');
        const inputChars = inputVal.split('');

        targetChars.forEach((char, index) => {
            const span = elements.targetText.children[index];
            if (!span) return;

            if (index < inputChars.length) {
                if (inputChars[index] === char) {
                    span.className = 'correct';
                    span.textContent = char;
                } else {
                    span.className = 'incorrect';
                    const typed = inputChars[index] === ' ' ? '_' : inputChars[index];
                    span.textContent = typed;
                }
            } else {
                span.className = '';
                span.textContent = char;
            }
        });
    }

    return {
        elements,
        renderTargetText,
        updateStats,
        showMessage,
        resetUI,
        highlightInput
    };
})();

window.UI = UI;
