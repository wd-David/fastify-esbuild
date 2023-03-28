# fastify-esbuild

Opinionated boilerplate to build a Fastify app with better DX.

---

## Articles

- [Better Backend DX: Fastify + ESBuild = ⚡️](https://davipon.hashnode.dev/better-backend-dx-fastify-esbuild)
- [Better Backend DX: JSON Schema + TypeScript + Swagger = ✨ Vol. 1](https://davipon.hashnode.dev/better-backend-dx-json-schema-typescript-swagger-vol-1)
- [Better Backend DX: JSON Schema + TypeScript + Swagger = ✨ Vol. 2](https://davipon.hashnode.dev/better-backend-dx-json-schema-typescript-swagger-vol-2)

## Features

- Use `@fastify/autoload` for filesystem-based routes & plugins.
- Use [`esbuild-kit/tsx`](https://github.com/esbuild-kit/tsx) to reduce feedback loop during devlopment.
- Use `esbuild` to bundle production code.
- Use `json-schema-to-ts` to validate & type your route
- Auto-generated Swagger UI: `http://localhost:3000/documentation` (production ready)

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
