
const merge = require('webpack-merge');
const baseConfig = require('./webpack-cfg/base');
const devConfig = require('./webpack-cfg/dev');
const prodConfig = require('./webpack-cfg/prod');

const { clientConfigs } = require('./common.config');

const configs = {
  development: devConfig,
  production: prodConfig
};

module.exports = merge(baseConfig(clientConfigs), configs[process.env.NODE_ENV](clientConfigs));
