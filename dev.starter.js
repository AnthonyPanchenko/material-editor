const nodemon = require('nodemon');
const open = require('open');
const config = require('./app.config');

const PORT = process.env.PORT || config.serverPort;

let isOpenBookmark = false;

nodemon({
  ext: 'js',
  watch: ['server/']
}).on('start', () => {
  if (!isOpenBookmark && process.argv.indexOf('--open') !== -1) {
    console.log(`Listening at ${config.serverHost}:${PORT}`);
    open(`http://${config.serverHost}:${PORT}`);
  } else {
    console.log('==========================\nNODEMON => App has started\n==========================');
  }

  isOpenBookmark = true;
}).on('restart', (files) => {
  isOpenBookmark = true;
  console.log('-------------------------\nNODEMON => App restarted due to:\n', `${files}\n-------------------------`);
});
