import { test, expect } from 'bun:test';
import { makeApp, targetText, typeChar } from './harness.js';

test('TYPER_LINES is a non-empty array of strings', () => {
    const app = makeApp();
    expect(app.lines.length).toBeGreaterThan(0);
    for (const line of app.lines) {
        expect(typeof line).toBe('string');
        expect(line.length).toBeGreaterThan(0);
    }
});

test('round starts idle: target rendered, input focused, stats zeroed', () => {
    const app = makeApp();
    const target = targetText(app);
    expect(target.length).toBeGreaterThan(0);
    expect(app.elements['user-input'].focused).toBe(true);
    expect(app.elements['message'].textContent).toBe('Press any key to start');
    expect(app.elements['wpm'].textContent).toBe('0');
    expect(app.elements['accuracy'].textContent).toBe('100');
});

test('correct keystrokes keep accuracy at 100', () => {
    const app = makeApp();
    typeChar(app, targetText(app)[0]);
    expect(app.elements['accuracy'].textContent).toBe('100');
});

test('wrong keystroke drops accuracy to 0 (0/1 correct)', () => {
    const app = makeApp();
    const wrong = targetText(app)[0] === 'a' ? 'b' : 'a';
    typeChar(app, wrong);
    expect(app.elements['accuracy'].textContent).toBe('0');
});

test('backspace counts as a keystroke', () => {
    const app = makeApp();
    typeChar(app, targetText(app)[0]); // 1 correct
    app.docListeners['keydown']({ key: 'Backspace' }); // total now 2, correct 1
    app.elements['user-input'].listeners['input']({});
    expect(app.elements['accuracy'].textContent).toBe('50');
});

test('modifier shortcuts are ignored: no keystroke, no timer start', () => {
    const app = makeApp();
    app.docListeners['keydown']({ key: 'a', ctrlKey: true });
    app.docListeners['keydown']({ key: 'c', metaKey: true });
    expect(app.elements['accuracy'].textContent).toBe('100');
    expect(app.elements['message'].textContent).toBe('Press any key to start');
});

test('AltGr characters count as typing (European layouts)', () => {
    const app = makeApp();
    const target = targetText(app);
    const wrongChar = target[0] === '@' ? '#' : '@';
    app.docListeners['keydown']({
        key: wrongChar, ctrlKey: true, altKey: true,
        getModifierState: (s) => s === 'AltGraph'
    });
    app.elements['user-input'].value += wrongChar;
    app.elements['user-input'].listeners['input']({});
    // Counted as a (wrong) keystroke and the timer started (message cleared)
    expect(app.elements['accuracy'].textContent).toBe('0');
    expect(app.elements['message'].textContent).toBe('');
});

test('paste and drop are blocked (no pasted-text cheat)', () => {
    const app = makeApp();
    for (const evt of ['paste', 'drop']) {
        let prevented = false;
        app.elements['user-input'].listeners[evt]({ preventDefault() { prevented = true; } });
        expect(prevented).toBe(true);
    }
    // Round still idle, nothing typed
    expect(app.elements['message'].textContent).toBe('Press any key to start');
    expect(app.elements['accuracy'].textContent).toBe('100');
});

test('completing the line ends the round and Space restarts', () => {
    const app = makeApp();
    for (const ch of targetText(app)) typeChar(app, ch);
    expect(app.elements['message'].textContent).toBe('Press Space or Enter to restart');
    // Line stays put during the results screen
    expect(app.elements['history'].children.length).toBe(0);
    const completed = targetText(app);
    app.docListeners['keydown']({ key: ' ', preventDefault() {} });
    // Restart archives the completed line and resets the round
    expect(app.elements['history'].children.length).toBe(1);
    expect(app.elements['history'].children[0].textContent).toBe(completed);
    // New round: stats reset, input cleared.
    expect(app.elements['user-input'].value).toBe('');
    expect(app.elements['wpm'].textContent).toBe('0');
    expect(app.elements['message'].textContent).toBe('Press any key to start');
});

test('history is capped at 20 lines, oldest pruned, gradient applied', () => {
    const app = makeApp();
    const completed = [];
    for (let round = 0; round < 25; round++) {
        completed.push(targetText(app));
        for (const ch of completed[round]) typeChar(app, ch);
        app.docListeners['keydown']({ key: ' ', preventDefault() {} });
    }
    const history = app.elements['history'].children;
    expect(history.length).toBe(20);
    // Oldest 5 pruned; remaining oldest is round 6's line
    expect(history[0].textContent).toBe(completed[5]);
    expect(history[19].textContent).toBe(completed[24]);
    // Gradient: oldest faintest, newest full
    expect(history[0].style.opacity).toBe('0.05');
    expect(history[19].style.opacity).toBe('1');
});
