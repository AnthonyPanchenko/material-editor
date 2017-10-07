const { resolve } = require('path');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseConfig = require('./base');
const config = require('../app.config');

const resultConfig = Object.assign({}, {
  devtool: 'inline-source-map',

  entry: [
    `webpack-dev-server/client?http://${config.clientHost}:${config.clientPort}`,
    'webpack/hot/only-dev-server',
    './src/main',
  ],

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new OpenBrowserPlugin({ url: `http://${config.clientHost}:${config.clientPort}` }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    }),
    new FriendlyErrorsPlugin(),
  ],

  devServer: {
    contentBase: resolve(__dirname, config.static),
    publicPath: config.urlBasePath,
    hot: true,
    historyApiFallback: true,
    host: config.clientHost,
    port: config.clientPort,
  },

}, baseConfig);

module.exports = resultConfig;
