const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    contentBase: './demo',
    https: false,
    inline: true,
    port: 8888,
    publicPath: '/'
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      https: false,
      port: 5050,
      proxy: 'localhost:8888'
    }, {
      reload: true
    })
  ]
})
