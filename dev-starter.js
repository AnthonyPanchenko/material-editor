const nodemon = require('nodemon');

nodemon({
  ext: 'js',
  watch: ['server/', 'swagger/']
}).on('start', () => {
  console.log('==========================\nNODEMON => App has started\n==========================');
}).on('restart', (files) => {
  console.log('-------------------------\nNODEMON => App restarted due to:\n', `${files}\n-------------------------`);
});
