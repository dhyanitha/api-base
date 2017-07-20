var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');


module.exports = {
  entry: './dist/server/main.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'compile'),
    filename: '[name]-backend.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: [
      'node_modules'
    ]
  },
  module: {
    loaders: [
      { test: /\.ts?$/, loader: "ts-loader" }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({ banner: 'require("source-map-support").install();', raw: true, entryOnly: false })
  ],
  devtool: 'sourcemap',
  externals: [nodeExternals()]
}
