const webpack = require('webpack');
// const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = (settings) => ({
  devtool: 'inline-source-map',

  entry: [
    `webpack-dev-server/client?http://${settings.host}:${settings.port}`,
    'webpack/hot/only-dev-server',
    `${settings.src}/index`
  ],

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new OpenBrowserPlugin({ url: `http://${settings.host}:${settings.port}` }),
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
    inline: true,
    host: settings.host,
    port: settings.port,
    https: false,
    hot: true
  }
});
