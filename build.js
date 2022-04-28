/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const fs = require('fs')
const path = require('path')
const esbuild = require('esbuild')

let fileArray = []
const getFilesRecursively = (dir) => {
  const files = fs.readdirSync(dir)
  files.forEach((file) => {
    const filePath = path.join(dir, file)
    if (fs.statSync(filePath).isDirectory()) {
      getFilesRecursively(filePath)
    } else {
      fileArray.push(filePath)
    }
  })
}
getFilesRecursively('src')

const entryPoints = fileArray.filter((file) => file.endsWith('.ts'))

esbuild.build({
  entryPoints,
  logLevel: 'info',
  outdir: 'build',
  minify: true,
  bundle: true,
  platform: 'node'
})
