# nogamenolife

Personal management tool built with Electron Forge, Vite, React, and
TypeScript. The project is early-stage and currently validates layout behavior
with a small TypeScript test plus a full TypeScript typecheck.

## Local validation

This repository uses Yarn, as indicated by `yarn.lock`.

```sh
yarn test
yarn typecheck
```

In environments where Corepack is available but `yarn` is not installed as a
global command, use `corepack yarn test` and `corepack yarn typecheck`.

## Development commands

```sh
yarn start       # Start the Electron app for development.
yarn package     # Package the app locally.
yarn make        # Build distributable artifacts.
yarn lint        # Run ESLint.
```
