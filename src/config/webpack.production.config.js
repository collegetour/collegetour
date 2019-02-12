import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ScriptPlugin from '../lib/webpack/script_plugin'
import StylePlugin from '../lib/webpack/style_plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'
import webpack from 'webpack'
import cssnano from 'cssnano'
import path from 'path'

const config = () => ({
  entry: [
    path.resolve('tmp', 'index.js'),
    path.resolve('tmp', 'index.less')
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?url=false',
          { loader: 'postcss-loader', options: {
            plugins: [autoprefixer, cssnano] }
          },
          'less-loader'
        ]
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              poolTimeout: Infinity
            }
          }, {
            loader: 'babel-loader',
            options: {
              cacheDirectory: path.join('tmp', '.cache'),
              plugins: ['react-hot-loader/babel'],
              presets: ['es2015', 'react', 'stage-0']
            }
          }
        ]
      }
    ]
  },
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendors'
    },
    runtimeChunk: true
  },
  output: {
    path: path.resolve('public'),
    filename: path.join('js', 'bundle-[hash].min.js'),
    publicPath: '/'
  },
  plugins: [
    new ScriptPlugin(),
    new StylePlugin(),
    new MiniCssExtractPlugin({
      path: path.resolve('public'),
      filename: path.join('css', 'bundle-[hash].min.css'),
      publicPath: '/'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'app','index.html')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV':JSON.stringify(process.env.NODE_ENV),
        'GA_PROPERTY_ID':JSON.stringify(process.env.GA_PROPERTY_ID)
      }
    })
  ]
})

export default config
