/**
 * Utility functions for game calculations.
 */

/**
 * Calculates Words Per Minute (WPM).
 * Standard WPM calculation: (characters / 5) / minutes
 * @param {number} charCount - Total number of characters typed.
 * @param {number} timeInSeconds - Time elapsed in seconds.
 * @returns {number} WPM
 */
export function calculateWPM(charCount, timeInSeconds) {
    if (timeInSeconds <= 0) return 0;
    const minutes = timeInSeconds / 60;
    return Math.round((charCount / 5) / minutes);
}

/**
 * Calculates Accuracy percentage.
 * @param {number} correctChars - Number of correct characters.
 * @param {number} totalTyped - Total number of characters typed.
 * @returns {number} Accuracy percentage (0-100).
 */
export function calculateAccuracy(correctChars, totalTyped) {
    if (totalTyped === 0) return 100;
    return Math.round((correctChars / totalTyped) * 100);
}
