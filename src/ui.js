/**
 * UI Module - Handles all DOM manipulation.
 */
const UI = (() => {
    'use strict';

    const elements = {
        targetText: document.getElementById('target-text'),
        userInput: document.getElementById('user-input'),
        wpm: document.getElementById('wpm'),
        accuracy: document.getElementById('accuracy'),
        message: document.getElementById('message'),
        history: document.getElementById('history')
    };

    const MAX_HISTORY_LINES = 20;

    /**
     * Renders the target text, one span per character for styling.
     * @param {string} text - The text to display.
     */
    function renderTargetText(text) {
        elements.targetText.textContent = '';
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            elements.targetText.appendChild(span);
        });
    }

    /**
     * Updates the WPM and Accuracy displays.
     * @param {number} wpm
     * @param {number} accuracy
     */
    function updateStats(wpm, accuracy) {
        elements.wpm.textContent = String(wpm);
        elements.accuracy.textContent = String(accuracy);
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
     * Highlights target characters against the user input.
     * Missing spaces reveal the typed character; extra spaces show a red bar.
     * @param {string} targetText - The full target string.
     * @param {string} inputVal - The current user input.
     */
    function highlightInput(targetText, inputVal) {
        for (let i = 0; i < targetText.length; i++) {
            const span = elements.targetText.children[i];
            if (!span) continue;
            const expected = targetText[i];

            if (i >= inputVal.length) {
                // Untyped: restore the target character
                span.textContent = expected;
                span.className = '';
                continue;
            }

            const typed = inputVal[i];
            if (typed === expected) {
                span.className = 'correct';
            } else if (expected === ' ') {
                // Missing space: show the typed character in red
                span.textContent = typed;
                span.className = 'incorrect';
            } else if (typed === ' ') {
                // Extra space: red bar instead of an invisible space
                span.textContent = '';
                span.className = 'incorrect space-bar';
            } else {
                // Wrong character: expected char shown in red
                span.className = 'incorrect';
            }
        }
    }

    /**
     * Archives a completed line into the history stack (oldest pruned).
     * Lines form a gradient: newest as bright as the typed line, oldest
     * faded all the way into the background.
     * @param {string} text - The completed target text.
     */
    function archiveLine(text) {
        const p = document.createElement('p');
        p.className = 'history-line';
        p.textContent = text;
        elements.history.appendChild(p);
        const lines = elements.history.children;
        while (lines.length > MAX_HISTORY_LINES) {
            elements.history.removeChild(lines[0]);
        }
        for (let i = 0; i < lines.length; i++) {
            lines[i].style.opacity = String((i + 1) / lines.length);
        }
    }

    return { elements, renderTargetText, updateStats, showMessage, resetUI, highlightInput, archiveLine };
})();

window.UI = UI;
