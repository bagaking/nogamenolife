# nogamenolife

`nogamenolife` is an early-stage personal management desktop app built with
Electron Forge, Vite, React, and TypeScript. The current codebase focuses on the
desktop shell, panel layout, and task-oriented UI components rather than a
finished product workflow.

## Current Status

The app is packaged as an Electron Forge project with Vite builds for the main,
preload, and renderer entry points. The renderer uses React 18, TypeScript,
Ant Design, Less styles, and a small internal layout framework under
`src/framework/`.

Implemented source areas include:

- Electron main, preload, and renderer entry files.
- App, task, bot, settings, and tab layout panels.
- Active task model and active task UI components.
- Layout calculation helpers covered by a TypeScript test.

This repository should be treated as a development-stage app. The README avoids
claiming a stable release, complete feature set, persistence model, sync
support, or production distribution flow beyond what is present in the project
scripts and CI.

## Requirements

- Node.js 20 is used by CI.
- Yarn is pinned through `packageManager` in `package.json`.
- Corepack is the recommended way to run the pinned Yarn version.

Install dependencies with:

```sh
corepack yarn install --frozen-lockfile
```

## Development Commands

```sh
corepack yarn start       # Start the Electron app in development mode.
corepack yarn package     # Package the app locally with Electron Forge.
corepack yarn make        # Build distributable artifacts through Forge makers.
corepack yarn lint        # Run ESLint over TypeScript and TSX files.
```

## Validation Commands

```sh
corepack yarn test        # Run tests/layout.test.ts with ts-node.
corepack yarn typecheck   # Run tsc --noEmit.
```

The `test` script currently validates layout bounds from
`src/framework/layout.ts`, including rounding behavior and empty input handling.
The `typecheck` script verifies the TypeScript project without emitting build
artifacts.

## CI

GitHub Actions runs on push and pull request. The validation job:

- checks out the repository,
- sets up Node.js 20 with Yarn cache support,
- enables Corepack,
- installs dependencies with `corepack yarn install --frozen-lockfile`,
- runs `corepack yarn test`,
- runs `corepack yarn typecheck`.

## Verified Scope

The automated checks currently cover:

- layout helper behavior in `tests/layout.test.ts`,
- TypeScript compile-time consistency through `tsc --noEmit`,
- CI execution of the same test and typecheck commands used locally.

## Known Boundaries

The current automated validation does not prove end-to-end Electron startup,
packaged installer behavior, renderer interaction flows, persistence behavior,
or cross-platform release quality. Treat packaging and maker scripts as available
development commands, not as evidence of a completed release process.
