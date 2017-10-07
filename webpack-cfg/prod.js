const baseConfig = require('./base');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');

const resultConfig = Object.assign({}, {
  entry: ['./src/main'],

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)(\?.+)?$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],

}, baseConfig);

module.exports = resultConfig;
