# Free Cell Game

#### Technologies: TypeScript, Vite

A remake of the classic game Free Cell

## Index

- [Installation and Run](#Install)
- [Development](#Development)
- [Screen Shots](#Shots)
- [Play Free Cell](#Play)

## <a name="Install">Installation and Run</a>

Node 26 or newer is required (see `.nvmrc`).

```shell
$ git clone https://github.com/adrianeyre/free-cell
$ cd free-cell
$ npm install
$ npm start
```

`npm start` serves the game on <http://localhost:5173>.

## <a name="Development">Development</a>

| Command                     | What it does                                              |
| --------------------------- | --------------------------------------------------------- |
| `npm start` / `npm run dev` | Vite dev server with hot reload                           |
| `npm run build`             | Typecheck, then build the production site into `dist/`    |
| `npm run serve`             | Serve the built `dist/` locally                           |
| `npm test`                  | Run the test suite once                                   |
| `npm run test:watch`        | Run the tests in watch mode                               |
| `npm run test:coverage`     | Run the tests with a coverage report                      |
| `npm run typecheck`         | `tsc --noEmit`                                            |
| `npm run lint`              | ESLint over the whole repository                          |
| `npm run format`            | Rewrite files with Prettier (`format:check` only reports) |

The game rules — `card`, `deck`, `hand` and `stack` — are deliberately free of
DOM calls so they can be tested in Node without a browser; ESLint enforces that.
Every browser API this game uses lives in `src/canvas.ts` and `src/game.ts`.

Releases are cut by [semantic-release](https://semantic-release.gitbook.io/) from
conventional-commit messages on `master`, which also publishes the site to
GitHub Pages. The version in the page footer is the released version.

## <a name="Shots">Screen Shots</a>

[![Screenshot](https://raw.githubusercontent.com/adrianeyre/free-cell/master/images/screenshot1.png)](https://raw.githubusercontent.com/adrianeyre/free-cell/master/images/screenshot1.png 'Game View')

[![Screenshot](https://raw.githubusercontent.com/adrianeyre/free-cell/master/images/screenshot2.png)](https://raw.githubusercontent.com/adrianeyre/free-cell/master/images/screenshot2.png 'Game View')

## <a name="Play">Play Free Cell</a>

- [Free Cell](http://adrianeyre.co.uk/free-cell)
