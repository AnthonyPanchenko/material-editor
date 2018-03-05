const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const fallback = require('express-history-api-fallback');

const { serverConfigs } = require('../common.config');
const DBconnect = require('./DBconnect');
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

app.use(fallback('/index.html'));

// app.get('/*', (req, res, next) => {
//   if (req.url.indexOf(api.API_PATH) === -1) {
//     res.sendFile('/index.html');
//   } else {
//     next();
//   }
// });

// app.all('/api/*', requireAuthentication);

app.use(api.API_PATH, apiRoutes);

if (process.env.NODE_ENV === 'development') {
  const swaggerInit = require('../swagger');
  swaggerInit(app);
}

DBconnect(app);
