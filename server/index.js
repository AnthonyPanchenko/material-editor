const path = require('path');
const fallback = require('express-history-api-fallback');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const api = require('../common/api');
const mockData = require('../common/mock-data');

const app = express();
const PORT = process.env.PORT || config.port;

// https://github.com/expressjs/cors
const whitelist = ['http://localhost:8080', 'https://material-editor.herokuapp.com'];

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
app.use(express.static(path.join(__dirname, config.static)));
app.use(express.static(path.join(__dirname, config.build)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fallback('/index.html'));

app.get('/*', (req, res, next) => {
  if (req.url.indexOf(api.API_PATH) === -1) {
    res.sendFile('/index.html');
    // res.render('index', { title: "title" }); // for ejs
  } else {
    next();
  }
});

app.get(`${api.API_PATH}${api.MATERIAL_EDITOR_URL_PART}${api.GEOMETRIC_OBJECTS_URL_SUFIX}`, (req, res) => {
  res.json(mockData.meGeoObjects);
});

app.get(`${api.API_PATH}${api.SHADER_EDITOR_URL_PART}${api.GEOMETRIC_OBJECTS_URL_SUFIX}`, (req, res) => {
  res.json(mockData.seGeoObjects);
});

app.get(`${api.API_PATH}${api.GLSL_PROGRAMS_URL_PART}`, (req, res) => {
  res.json(mockData.glslPrograms);
});

app.get(`${api.API_PATH}${api.GLSL_PROGRAMS_URL_PART}/:id`, (req, res) => {
  res.json({ ...mockData.fullGlslProgram, uuid: req.params.id });
});

if (!module.parent) {
  app.listen(PORT);
}
