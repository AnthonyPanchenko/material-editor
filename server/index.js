const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fallback = require('express-history-api-fallback');

const config = require('../common.config');
const apiRoutes = require('./router');

const api = require('../common/api');

mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`);
const db = mongoose.connection;

db.once('open', function () {
  // db.createCollection('noautoid', { autoIndexId: false });
  console.log('mongodb successfully connected');
});

const app = express();
const PORT = process.env.PORT || config.serverPort;
const origin = (process.env.NODE_ENV === 'development') ? config.devPath : config.prodPath;

const corsOptions = {
  origin: false,
  credentials: true,
  optionsSuccessStatus: 200
};

const corsOptionsDelegate = (req, callback) => {
  corsOptions.origin = req.header('Origin') === origin;
  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate)); // CORS middleware on express side

app.use(express.static(config.staticFolder));
app.use(express.static(config.distFolder));

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

app.listen(PORT);
