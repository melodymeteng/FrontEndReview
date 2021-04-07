const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: 'reviewHook.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: 'file-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs: 3
                }
              ]
            ]
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    index: 'index.html',
    compress: true,
    publicPath: '/',
    inline: false,
    port: 666,
    host: '0.0.0.0',
    disableHostCheck: true,
    watchContentBase: true,
    allowedHosts: ['dev.jr.jd.com', '.jd.com'],
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    },
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: false, //是否删除属性的双引号
        collapseWhitespace: false //是否折叠空白
      }
    })
  ]
};
