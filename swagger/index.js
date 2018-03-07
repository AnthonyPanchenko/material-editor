
const swaggerUi = require('swagger-ui-express');
const jsonRefParser = require('json-schema-ref-parser');
const pathsCollection = require('./paths-collection');
const mainConfig = require('./main-config');

const baseApiCtrlr = (app, apiPath) => {
  app.get('/*', (req, res, next) => {
    if (req.url.indexOf(apiPath) === -1) {
      res.sendFile('/index.html');
    }

    next();
  });
};

const initSwagger = (app, apiPath) => {
  mainConfig.paths = pathsCollection.reduce((previousValue, currentValue) =>
    Object.assign(previousValue, currentValue), {});

  app.get('/*', (req, res, next) => {
    if (req.url.indexOf(apiPath) === -1 && req.url.indexOf('/swagger') === -1) {
      res.sendFile('/index.html');
    }

    next();
  });

  // app.all('*', (req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //   res.header('Access-Control-Allow-Credentials', 'true');
  //   res.header('Access-Control-Allow-Method', 'GET,PUT,POST,DELETE,HEAD,OPTIONS');
  //   next();
  // });

  jsonRefParser.parse(mainConfig, (err, swaggerConfig) => {
    if (err) {
      console.log('Swagger > ERROR to parse config', err);
    } else {
      app.get('/swagger/config', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerConfig);
      });

      app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
    }
  });
};

module.exports = (process.env.NODE_ENV === 'development') ? initSwagger : baseApiCtrlr;
