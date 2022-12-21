# fastify-esbuild

Opinionated boilerplate to build a Fastify app with better DX.

---

## Article

[Better Backend DX: Fastify + ESBuild = ⚡️](https://davipon.hashnode.dev/better-backend-dx-fastify-esbuild)

## Features

- Use `@fastify/autoload` for filesystem-based routes & plugins.
- Use [`esbuild-kit/tsx`](https://github.com/esbuild-kit/tsx) to reduce feedback loop during devlopment.
- Use `esbuild` to bundle production code.

---

## How to start?

```zsh
# Install dependencies
pnpm i

# Start development
pnpm dev

# Build production code
pnpm build

# Run production code
pnpm start
```

## TODO

- [ ] Add `docker` or `docker-compose` for deployment
- [ ] Add `vitest` & `msw`
- [ ] Add `dotnev` for different stages
- [ ] Add `mongodb` examples
- [ ] Add `envoy` as a sidecar proxy
