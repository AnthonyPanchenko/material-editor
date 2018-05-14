const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const fallback = require('express-history-api-fallback');

// const swaggerInit = require('../swagger');
const { serverConfigs } = require('../common.config');
// const DBconnect = require('./DBconnect');
const apiRoutes = require('./router');

const api = require('../common/api');
const app = express();

const corsOptions = {
  origin: false,
  credentials: true,
  optionsSuccessStatus: 200
};

const corsOptionsDelegate = (req, callback) => {
  corsOptions.origin = req.header('Origin') === serverConfigs.origin;
  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate)); // CORS middleware on express side

app.use(express.static(serverConfigs.static));
app.use(express.static(serverConfigs.dist));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(fallback(`${serverConfigs.dist}/index.html`));

// app.all('/api/*', requireAuthentication);

app.get('/*', (req, res, next) => {
  if (req.url.indexOf(api.API_PATH) === -1) {
    res.sendFile(`${serverConfigs.dist}/index.html`);
  }

  next();
});

app.use(api.API_PATH, apiRoutes);

// swaggerInit(app, api.API_PATH);
// DBconnect(app);

app.listen(process.env.PORT || serverConfigs.port);
