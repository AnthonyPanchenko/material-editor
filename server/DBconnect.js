const mongoose = require('mongoose');
const { serverConfigs } = require('../common.config');

const options = {
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 100 // Maintain up to 10 socket connections
};

module.exports = (app) => {
  mongoose.connect(serverConfigs.mongodbURI, options, (error) => {
    if (error) {
      console.log('Mongoose ERROR to connect: ', error);
    } else {
      app.listen(process.env.PORT || serverConfigs.port);
      console.log('DB and App are running');
    }
  });
};
