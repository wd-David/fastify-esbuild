import path from 'node:path'
import { readdirSync, statSync } from 'node:fs'
import { build } from 'esbuild'
import nodemon from 'nodemon'

const getFilesRecursively = (dir: string) => {
  const fileArray = []
  const files = readdirSync(dir)
  files.forEach((file) => {
    const filePath = path.join(dir, file)
    if (statSync(filePath).isDirectory()) {
      getFilesRecursively(filePath)
    } else {
      fileArray.push(filePath)
    }
  })
  return fileArray.filter((file) => file.endsWith('.ts'))
}

;(async () => {
  const builder = await build({
    entryPoints: getFilesRecursively('src'),
    logLevel: 'info',
    outdir: 'dist',
    platform: 'node',
    format: 'cjs',
    incremental: true
  })
  nodemon('-w src -x "dist"')
    .on('start', function () {
      console.log('App has started')
      builder.rebuild()
    })
    .on('quit', function () {
      console.log('App has quit')
      process.exit()
    })
    .on('restart', function (files) {
      console.log('App restarted due to: ', files)
    })
})()
