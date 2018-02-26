const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = (settings) => ({
  devtool: 'inline-source-map',

  entry: [
    `webpack-dev-server/client?${settings.devPath}`,
    'webpack/hot/only-dev-server',
    `${settings.src}/index`
  ],

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new OpenBrowserPlugin({ url: settings.devPath }),
    new StyleLintPlugin({
      syntax: 'scss',
      configFile: '.stylelintrc',
      context: settings.src,
      files: '**/*.scss'
    })
  ],

  devServer: {
    publicPath: settings.publicPath,
    historyApiFallback: true,
    host: settings.host,
    port: settings.port,
    https: settings.https,
    hot: true
  }
});
