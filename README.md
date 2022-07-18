# fastify-esbuild

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Opinionated boilerplate to build a Fastify app with better DX.

---

## Article

[Better Backend DX: Fastify + ESBuild = ⚡️](https://davipon.hashnode.dev/better-backend-dx-fastify-esbuild)

## Features

- Use `@fastify/autoload` for filesystem-based routes & plugins.
- Use [`esbuild-kit/tsx`](https://github.com/esbuild-kit/tsx) to reduce feedback loop during devlopment.
- Use `esbuild` to bundle production code.
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
pnpm start

# New commit with interactive CLI
pnpm cz

# Auto generate changelogs and versioning
pnpm release
```

## TODO

- [ ] Add `docker` or `docker-compose` for deployment
- [ ] Add `vitest` & `msw`
- [ ] Add `dotnev` for different stages
- [ ] Add `mongodb` examples
- [ ] Add `envoy` as a sidecar proxy
