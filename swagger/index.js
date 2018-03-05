
const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('./config.json');

const baseApiCtrlr = (app, apiPath) => {
  app.get('/*', (req, res, next) => {
    if (req.url.indexOf(apiPath) === -1) {
      res.sendFile('/index.html');
    } else {
      next();
    }
  });
};

const initSwagger = (app, apiPath) => {
  app.get('/*', (req, res, next) => {
    if (req.url.indexOf('swagger') !== -1) {
      next();
    } else if (req.url.indexOf(apiPath) === -1) {
      res.sendFile('/index.html');
    } else {
      next();
    }
  });

  app.get('/swagger/config', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerConfig);
  });

  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
};

module.exports = (process.env.NODE_ENV === 'development') ? initSwagger : baseApiCtrlr;

  // app.all('*', function(req, res, next){
  //   res.header("Access-Control-Allow-Origin", '*');
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   res.header("Access-Control-Allow-Credentials", "true");
  //   res.header("Access-Control-Allow-Method", "GET,PUT,POST,DELETE,HEAD,OPTIONS");
  //   next();
  // });
