// eslint-disable-next-line no-undef
const env = process.argv[2]
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { readdirSync, statSync } = require('fs')
const { dirname, sep, join } = require('path')
const { build } = require('esbuild')
const { readFile } = require('fs/promises')

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

const pinoPlugin = (options) => ({
  name: 'pino',
  setup(currentBuild) {
    const pino = dirname(require.resolve('pino'))
    const threadStream = dirname(require.resolve('thread-stream'))

    let entrypoints = currentBuild.initialOptions.entryPoints
    if (Array.isArray(entrypoints)) {
      let outbase = currentBuild.initialOptions.outbase
      if (!outbase) {
        const hierarchy = entrypoints[0].split(sep)
        let i = 0
        outbase = ''
        let nextOutbase = ''
        do {
          outbase = nextOutbase
          i++
          nextOutbase = hierarchy.slice(0, i).join(sep)
        } while (entrypoints.every((e) => e.startsWith(`${nextOutbase}${sep}`)))
      }
      const newEntrypoints = {}
      for (const entrypoint of entrypoints) {
        const destination = (
          outbase ? entrypoint.replace(`${outbase}${sep}`, '') : entrypoint
        ).replace(/.(js|ts)$/, '')
        newEntrypoints[destination] = entrypoint
      }
      entrypoints = newEntrypoints
    }

    const customEntrypoints = {
      'thread-stream-worker': join(threadStream, 'lib/worker.js'),
      'pino-worker': join(pino, 'lib/worker.js'),
      'pino-pipeline-worker': join(pino, 'lib/worker-pipeline.js'),
      'pino-file': join(pino, 'file.js')
    }
    const transportsEntrypoints = Object.fromEntries(
      (options.transports || []).map((t) => [
        t,
        join(dirname(require.resolve(t)), 'index.js')
      ])
    )
    currentBuild.initialOptions.entryPoints = {
      ...entrypoints,
      ...customEntrypoints,
      ...transportsEntrypoints
    }

    let pinoBundlerRan = false

    currentBuild.onEnd(() => {
      pinoBundlerRan = false
    })

    currentBuild.onLoad({ filter: /pino\.js$/ }, async (args) => {
      if (pinoBundlerRan) return
      pinoBundlerRan = true

      console.log(args.path)

      const contents = await readFile(args.path, 'utf8')

      const functionDeclaration = `
        function pinoBundlerAbsolutePath(p) {
          try {
            return require('path').join(__dirname, p)
          } catch(e) {
            const f = new Function('p', 'return new URL(p, import.meta.url).pathname');
            return f(p)
          }
        }
      `

      const pinoOverrides = Object.keys(customEntrypoints)
        .map(
          (id) =>
            `'${
              id === 'pino-file' ? 'pino/file' : id
            }': pinoBundlerAbsolutePath('./${id}.js')`
        )
        .join(',')

      const globalThisDeclaration = `
        globalThis.__bundlerPathsOverrides =
          globalThis.__bundlerPathsOverrides
              ? {...globalThis.__bundlerPathsOverrides, ${pinoOverrides}}
              : {${pinoOverrides}};
      `

      const code = functionDeclaration + globalThisDeclaration

      return {
        contents: code + contents
      }
    })
  }
})

build({
  entryPoints,
  logLevel: 'info',
  outdir: env === 'dev' ? 'dist' : 'build',
  bundle: env === 'dev' ? false : true,
  platform: 'node',
  format: 'cjs',
  plugins: env === 'dev' ? [] : [pinoPlugin({ transport: ['pino-pretty'] })]
})
