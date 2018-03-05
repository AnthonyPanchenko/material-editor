const mongoose = require('mongoose');
const { serverConfigs } = require('../common.config');

const options = {
  server: {
    socketOptions: {
      keepAlive: 1
    }
  }
};

module.exports = (app) => {
  mongoose.connect(serverConfigs.mongodbURI, options, (error) => {
    if (error) {
      console.log('Mongoose ERROR to connect: ', error);
    } else {
      app.listen(process.env.PORT || serverConfigs.port);
    }
  });
};
