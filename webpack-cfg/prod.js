const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (settings) => ({
  entry: [`${settings.src}/index`],

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        drop_console: true,
        sequences: true,
        booleans: true,
        loops: true,
        unused: false,
        warnings: false
      }
    })
  ]
});
