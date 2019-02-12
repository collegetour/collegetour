import devServer from 'webpack-dev-server'
import config from '../config/webpack.development.config'
import server from '../server'
import Webpack from 'webpack'
import dotenv from 'dotenv'
import path from 'path'

dotenv.load({
  path: path.join('.env')
})

server.listen(3001, () => {
  console.log(`Example app listening on port 3000!`)
})

const devserver = new devServer(Webpack(config()), {
  contentBase: path.join('src', 'public'),
  compress: true,
  hot: true,
  stats: 'errors-only',
  watchContentBase: true,
  open: true,
  proxy: {
    '/api/*': 'http://localhost:3001'
  },
  historyApiFallback: {
    disableDotRule: true,
    rewrites: [
      { from: /.*/, to: 'index.html' }
    ]
  }
})

devserver.listen(3000, () => {
  console.info('listening on 3000')
})
