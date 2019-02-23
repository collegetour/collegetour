import '../server/lib/environment'
import '../server'

import devServer from 'webpack-dev-server'
import config from '../config/webpack.development.config'
import Webpack from 'webpack'
import path from 'path'

const devserver = new devServer(Webpack(config()), {
  contentBase: path.join('src', 'public'),
  compress: true,
  hot: true,
  stats: 'errors-only',
  watchContentBase: true,
  open: true,
  proxy: {
    '/imagecache/*': 'http://localhost:3001',
    '/signin/*': 'http://localhost:3001',
    '/invitations/*': 'http://localhost:3001',
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
