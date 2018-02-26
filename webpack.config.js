const path = require('path');
const merge = require('webpack-merge');
const config = require('./common.config');

const baseConfig = require(path.join(__dirname, './webpack-cfg/base')); // eslint-disable-line
const configs = {
  development: require(path.join(__dirname, './webpack-cfg/dev')), // eslint-disable-line
  production: require(path.join(__dirname, './webpack-cfg/prod')), // eslint-disable-line
};

const { NODE_ENV } = process.env;

const settings = {
  env: NODE_ENV,
  isProd: NODE_ENV === 'production',
  src: config.srcFolder,
  dist: config.distFolder,
  publicPath: '/',
  devPath: config.devPath,
  https: config.protocol === 'https',
  host: config.clientHost,
  port: config.clientPort
};

module.exports = merge(baseConfig(settings), configs[NODE_ENV](settings));
