const path = require('path');
// const fallback = require('express-history-api-fallback');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('../app.config');
const api = require('../src/common/constants/api-url-parts');
const fakeData = require('../src/fake-data');

const app = express();
const PORT = process.env.PORT || config.serverPort;

// https://github.com/expressjs/cors
const whitelist = [`http://${config.clientHost}:${config.clientPort}`, 'https://material-editor.herokuapp.com'];

const corsOptions = {
  origin: false,
  credentials: true,
  optionsSuccessStatus: 200
};

const corsOptionsDelegate = (req, callback) => {
  corsOptions.origin = whitelist.indexOf(req.header('Origin')) !== -1;
  callback(null, corsOptions);
};

// static files
app.use(cors(corsOptionsDelegate)); // CORS middleware on express side
app.use(express.static(path.resolve(__dirname, config.static)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(fallback(path.resolve(__dirname, `${config.static}/index.html`)));

app.get('/*', (req, res, next) => {
  if (req.url.indexOf('/api/') === -1) {
    res.sendFile(path.resolve(__dirname, `${config.static}/index.html`));
    // res.render('index', { title: "React-starter" }); // for ejs
  } else {
    next();
  }
});

app.get(`${api.API_PATH}${api.MATERIAL_EDITOR_URL_PART}${api.GET_3D_MODELS_LIST_URL_SUFIX}`, (req, res) => {
  res.json(fakeData.itemObjects);
});

if (!module.parent) {
  app.listen(PORT);
}
