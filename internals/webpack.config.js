const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const { resolve } = require('./webpack.resolve');
const dirs = require('./dirs');

module.exports = {
  entry: {
    polyfills: path.resolve(dirs.src, './polyfills.js'),
    index: path.resolve(dirs.src, './index.jsx'),
  },
  output: {
    path: dirs.dist,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: {
      index: '/',
    },
  },
  module: {
    rules: [
      {
        test: /\.(j|t)s(x?)$/,
        include: dirs.src,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
//      {
//        test: /(\.js|\.jsx)$/,
//        exclude: /node_modules/,
//        use: {
//          loader: 'babel-loader',
//        },
//      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            publicPath: '/',
            context: 'src',
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve,
  plugins: [
    new Dotenv({
      systemvars: true,
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
