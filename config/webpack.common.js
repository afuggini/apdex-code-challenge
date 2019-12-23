const path = require('path')

module.exports = {
  entry: {
    build: `./src/index.ts`
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {}
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      '@/app': path.resolve(__dirname, '../src/app')
    }
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist')
  }
}
