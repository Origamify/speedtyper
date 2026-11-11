# speedtyper

A minimalist, distraction-free typing practice app. Zero dependencies, zero build step — open `index.html` and start typing.

Try it live: [origamify.github.io/speedtyper](https://origamify.github.io/speedtyper/)

## Features

- **Instant play** — no install, no server. Open `index.html` in any browser and go.
- **Live stats** — WPM and accuracy update as you type.
- **Per-character feedback** — correct characters turn white, errors show in red (missing spaces reveal the typed character, extra spaces show a red bar).
- **Curated text library** — Kipling's "If—" plus 100+ quotes: literature openers, stoics, poets, sci-fi, tech wisdom, latin quickies, and long "epic endurance" runs.
- **Quick restart** — press `Space` or `Enter` to start a new round.
- **History crawl** — completed lines drift up Star Wars-style, fading into the background as new ones stack (last 20 kept).

## How it works

1. A random text segment appears from an inline data file.
2. Type it — the app tracks every keystroke against the target in real time.
3. Complete the segment to see your WPM and accuracy, then restart with `Space`/`Enter`.

## Tech

Vanilla HTML, CSS, and JavaScript. No frameworks, no build tools, no backend — it runs entirely in the browser, even from the filesystem.

## Contributing

Open an issue or a pull request. Keep it serverless: everything must keep working when `index.html` is opened directly (no ES modules, no `fetch`, no build step).

## License

MIT — see [LICENSE](LICENSE).
