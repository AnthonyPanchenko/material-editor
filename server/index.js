const cors = require('cors');
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fallback = require('express-history-api-fallback');

const config = require('../common.config');
const api = require('../common/api');
const mockData = require('../common/mock-data');

const upload = multer(); // for parsing multipart/form-data
mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`);

const db = mongoose.connection;

db.once('open', function() {
  // db.createCollection('noautoid', { autoIndexId: false });
  console.log('mongodb successfully connected');
});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schemaName = new Schema({
  id: ObjectId,
  title: String
}, {
  collection: 'GeometricObjects'
});

mongoose.model('GeometricObjects', schemaName);

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

app.get('/*', (req, res, next) => {
  if (req.url.indexOf(api.API_PATH) === -1) {
    res.sendFile('/index.html');
  } else {
    next();
  }
});

app.get(`${api.API_PATH}${api.MATERIAL_EDITOR_URL_PART}${api.GEOMETRIC_OBJECTS_URL_SUFIX}`, (req, res) => {
  mongoose.model('GeometricObjects').find((err, list) => {
    res.json(list);
  });
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

app.post('/upload-some-img', upload.array(), (req, res, next) => {
  console.log(req.body);
  res.json(req.body);
});

app.listen(PORT);
