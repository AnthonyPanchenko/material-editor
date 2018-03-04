
const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('./config.json');

module.exports = (app) => {
  app.get('/swagger/config', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerConfig);
  });

  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
};

  // app.all('*', function(req, res, next){
  //   res.header("Access-Control-Allow-Origin", '*');
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   res.header("Access-Control-Allow-Credentials", "true");
  //   res.header("Access-Control-Allow-Method", "GET,PUT,POST,DELETE,HEAD,OPTIONS");
  //   next();
  // });
