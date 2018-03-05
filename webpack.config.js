const path = require('path');
const merge = require('webpack-merge');
const { clientConfigs } = require('./common.config');

const baseConfig = require(path.join(__dirname, './webpack-cfg/base')); // eslint-disable-line
const configs = {
  development: require(path.join(__dirname, './webpack-cfg/dev')), // eslint-disable-line
  production: require(path.join(__dirname, './webpack-cfg/prod')), // eslint-disable-line
};

module.exports = merge(baseConfig(clientConfigs), configs[process.env.NODE_ENV](clientConfigs));
