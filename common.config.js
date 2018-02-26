const path = require('path');

const clientHost = 'localhost';
const clientPort = 8080;
const protocol = 'http';

module.exports = {
  srcFolder: path.join(__dirname, './src'),
  distFolder: path.join(__dirname, './dist'),
  staticFolder: path.join(__dirname, './static'),
  devPath: `${protocol}://${clientHost}:${clientPort}`,
  prodPath: 'https://material-editor.herokuapp.com',
  clientHost,
  serverHost: 'localhost',
  clientPort,
  serverPort: 3000,
  protocol
};
