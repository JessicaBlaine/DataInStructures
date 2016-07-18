"use strict";

module.exports = {
  context: __dirname,
  entry: "./javascript/data_in_structures.js",
  output: {
    path: "./",
    filename: "./javascript/bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ['', '.js']
  }
};
