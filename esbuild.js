// eslint-disable-next-line no-undef
const env = process.argv[2]
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { readdirSync, statSync } = require('fs')
const { join } = require('path')
const { build } = require('esbuild')
const esbuildPluginPino = require('esbuild-plugin-pino')

let fileArray = []
const getFilesRecursively = (dir) => {
  const files = readdirSync(dir)
  files.forEach((file) => {
    const filePath = join(dir, file)
    if (statSync(filePath).isDirectory()) {
      getFilesRecursively(filePath)
    } else {
      fileArray.push(filePath)
    }
  })
}
getFilesRecursively('src')

const entryPoints = fileArray.filter((file) => file.endsWith('.ts'))

build({
  entryPoints,
  logLevel: 'info',
  outdir: env === 'dev' ? 'dist' : 'build',
  bundle: env === 'dev' ? false : true,
  platform: 'node',
  format: 'cjs',
  plugins:
    env === 'dev' ? [] : [esbuildPluginPino({ transports: ['pino-pretty'] })]
})
