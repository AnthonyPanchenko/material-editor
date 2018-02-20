const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require(path.join(__dirname, './webpack-cfg/base')); // eslint-disable-line

const configs = {
  development: require(path.join(__dirname, './webpack-cfg/dev')), // eslint-disable-line
  production: require(path.join(__dirname, './webpack-cfg/prod')), // eslint-disable-line
};

const { NODE_ENV } = process.env;

const settings = {
  env: NODE_ENV,
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './build'),
  publicPath: '/',
  host: 'localhost',
  port: 8080
};

const resultConfig = Object.assign({}, configs[NODE_ENV](settings), baseConfig(settings));

resultConfig.plugins.push(new HtmlWebpackPlugin({ template: `${settings.src}/template.html` }));
resultConfig.plugins.push(new webpack.DefinePlugin({ 'process.env.NODE_ENV': `"${NODE_ENV}"` }));

module.exports = resultConfig;
