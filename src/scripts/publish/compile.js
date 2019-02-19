import { transform } from 'babel-core'
import { spawn } from 'child_process'
import rimraf from 'rimraf'
import mkdirp from 'mkdirp'
import path from 'path'
import ncp from 'ncp'
import fs from 'fs'

const copy = (src, dest) => Promise.promisify(ncp)(src, dest)

const transpile = (source) => {

  const transpiled = transform(source, {
    presets: [
      'babel-preset-es2015',
      'babel-preset-stage-0'
    ],
    plugins: [
      'transform-promise-to-bluebird',
      ['transform-runtime', { polyfill: false }]
    ]
  })

  return transpiled.code

}

const compilePath = async (base) => {

  const dest = base.replace('src/server', 'dist')

  mkdirp.sync(dest)

  await Promise.map(fs.readdirSync(base), async (entity) => {

    const entityPath = path.join(base, entity)

    if(fs.lstatSync(entityPath).isDirectory()) return await compilePath(entityPath)

    if(path.extname(entityPath) !== '.js') return await copy(entityPath, path.join(dest, entity))

    fs.writeFileSync(path.join(dest, entity), transpile(fs.readFileSync(entityPath, 'utf8')))

  })

}
const exec = (command, cwd) => new Promise((resolve, reject) => {

  const parts = command.split(' ')

  const child = spawn(parts[0], parts.slice(1), { cwd, stdio: 'inherit' })

  child.on('error', (err) => reject(err.toString()))

  child.on('exit', (data) => resolve())

})

const compile = async () => {

  console.log('Compiling code')

  rimraf.sync(path.join('dist'))

  await compilePath(path.join('src','server'))

  // await exec('npm install', path.join('dist'))

}

export default compile
