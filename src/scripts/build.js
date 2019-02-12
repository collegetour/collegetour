import config from '../config/webpack.production.config'
import webpack from 'webpack'
import dotenv from 'dotenv'
import rimraf from 'rimraf'
import path from 'path'
import ncp from 'ncp'

dotenv.load({
  path: path.join('.env')
})

const removeAssets = (dest) => rimraf.sync(dest)

const copyAssets = (src, dest) => Promise.promisify(ncp)(src, dest)

const compile = () => new Promise((resolve, reject) => {

  webpack(config()).run((err, stats) => {

    if(err) reject(err)

    resolve(stats)

  })

})

const build = async () => {

  await removeAssets(path.join('public'))

  await copyAssets(path.join('src','public'), path.join('public'))

  await compile()

}

build().then(() => process.exit())
