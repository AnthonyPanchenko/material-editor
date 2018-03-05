const path = require('path');
const { NODE_ENV } = process.env;

const sources = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  static: path.join(__dirname, './static')
};

const clientSettings = {
  publicPath: '/',
  https: false,
  host: 'localhost',
  port: 8080
};

const dbName = 'material-editor';
const devMongodbURI = `mongodb://localhost:27017/${dbName}`;
const prodMongodbURI = `mongodb://1231444:447234/${dbName}`;

const serverSettings = {
  mongodbURI: (NODE_ENV === 'development') ? devMongodbURI : prodMongodbURI,
  host: 'localhost',
  port: 3000
};

const devOrigin = { origin: `${clientSettings.https ? 'https' : 'http'}://${clientSettings.host}:${clientSettings.port}` };
const prodOrigin = { origin: 'https://material-editor.herokuapp.com' };

exports.clientConfigs = Object.assign({}, sources, clientSettings, devOrigin);
exports.serverConfigs = Object.assign({}, sources, serverSettings, (NODE_ENV === 'development') ? devOrigin : prodOrigin);
