const open = require('open');
const webpack = require('webpack');
const nodemon = require('nodemon');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

nodemon({
  ext: 'js',
  watch: ['server/']
}).on('start', () => {
  console.log('==========================\nNODEMON => App has started\n==========================');
}).on('restart', (files) => {
  console.log('-------------------------\nNODEMON => App restarted due to:\n', `${files}\n-------------------------`);
});

const { host, port, https } = webpackConfig.devServer;
const protocol = https ? 'https' : 'http';

new WebpackDevServer(webpack(webpackConfig), webpackConfig.devServer)
  .listen(port, host, (error) => {
    if (error) {
      console.log(error);
    }

    console.log(`Listening at =====>>> ${protocol}://${host}:${port} <<<=====`);
    open(`${protocol}://${host}:${port}`);
  });
