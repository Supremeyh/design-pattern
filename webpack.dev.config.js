const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './release'),
    filename: 'bundle.js'
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, './release'), // 根目录
    open: true,  // 自动打开浏览器
    port: 8001,
    proxy: {
      '/api/*': {
        target: 'http://localhost:8002' // api/* 可访问 8002 的 server
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  }
}
