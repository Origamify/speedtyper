// Stub-DOM harness: loads the src/ plain scripts (no modules)
// into a fake document so tests run offline without a browser.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = (u) => fileURLToPath(new URL(u, import.meta.url));

class El {
    constructor() {
        this._textContent = '';
        this.value = '';
        this.className = '';
        this.style = {};
        this.children = [];
        this.focused = false;
        this.listeners = {};
    }
    // DOM semantics: setting textContent replaces all children
    set textContent(v) {
        this._textContent = v;
        if (v === '') this.children = [];
    }
    get textContent() {
        return this._textContent;
    }
    addEventListener(type, fn) {
        this.listeners[type] = fn;
    }
    appendChild(el) {
        this.children.push(el);
        return el;
    }
    removeChild(el) {
        const i = this.children.indexOf(el);
        if (i !== -1) this.children.splice(i, 1);
        return el;
    }
    focus() {
        this.focused = true;
    }
}

export function makeApp() {
    const linesSrc = readFileSync(root('../src/typer_lines.js'), 'utf8');
    const utilsSrc = readFileSync(root('../src/utils.js'), 'utf8');
    const uiSrc = readFileSync(root('../src/ui.js'), 'utf8');
    const gameSrc = readFileSync(root('../src/game.js'), 'utf8');

    const elements = {};
    for (const id of ['target-text', 'user-input', 'wpm', 'accuracy', 'message', 'history']) {
        elements[id] = new El();
    }

    const docListeners = {};
    const document = {
        getElementById: (id) => elements[id],
        createElement: () => new El(),
        addEventListener: (type, fn) => {
            docListeners[type] = fn;
        },
    };

    const lines = new Function(linesSrc + '; return TYPER_LINES;')();
    const windowObj = {};

    // Evaluate all sources in ONE function body: top-level `const` bindings
    // (Utils/UI/Game) share scope, matching browser script-tag semantics.
    new Function('document', 'window',
        linesSrc + '\n' + utilsSrc + '\n' + uiSrc + '\n' + gameSrc
    )(document, windowObj);

    return { elements, docListeners, lines };
}

export const targetText = (app) =>
    app.elements['target-text'].children.map((c) => c.textContent).join('');

// Simulate one keystroke: keydown fires while the value is still old
// (matches browser order), then the value changes and the input event fires.
export function typeChar(app, ch) {
    app.docListeners['keydown']({ key: ch });
    const input = app.elements['user-input'];
    input.value += ch;
    input.listeners['input']({});
}
