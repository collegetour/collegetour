import webpack from 'webpack'
import dotenv from 'dotenv'
import rimraf from 'rimraf'
import path from 'path'
import ncp from 'ncp'

dotenv.load({ path: path.join('.env') })

const config = require(`../app/config/webpack.${process.env.NODE_ENV}.config`).default

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

  await removeAssets(path.join('public','assets'))

  await removeAssets(path.join('public','tmp'))

  await compile()

}

build().then(() => process.exit())
