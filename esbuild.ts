import glob from 'tiny-glob'
import { build } from 'esbuild'
import esbuildPluginPino from 'esbuild-plugin-pino'
;(async function () {
  // Get all ts files
  const entryPoints = await glob('src/**/*.ts')

  build({
    entryPoints,
    logLevel: 'info',
    outdir: 'build',
    bundle: true,
    minify: true,
    platform: 'node',
    format: 'cjs',
    sourcemap: true,
    plugins: [esbuildPluginPino({ transports: ['pino-pretty'] })]
  })
})()
