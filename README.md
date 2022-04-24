# fastify-esbuild

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

---

Opinionated boilerplate to build a Fastify app with a better DX.

## Features

- Use `nodemon` & `esbuild-node-tsc` during devlopment to reduce feedback loop.
- Use `esbuild` to bundle & minify production code.
- Use Conventional Commits & SemVer standards, e.g. `commitlint`, `commitizen`, `standard-version`.
- Use `eslint`, `prettier`, `lint-staged`.
- Use `husky` git hooks helper to run formatter & linter.

---

## How to start?

```zsh
# Install dependencies
pnpm i

# Activate git hooks
pnpm prepare

# Start development
pnpm dev

# Build production code
pnpm build

# Run production code
node build

# New commit with interactive CLI
pnpm cz

# Auto generate changelogs and versioning
pnpm release
```

## TODO

- [ ] Add `vitest` & `msw`
- [ ] Add `dotnev` for different stages
- [ ] Add `mongodb` examples
- [ ] Add `docker` or `docker-compose` for deployment
- [ ] Add `envoy` as a sidecar proxy
