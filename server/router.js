const express = require('express');
const multer = require('multer');

const GeometricObjects = require('./controllers/geometric-objects');

const upload = multer(); // for parsing multipart/form-data
const apiRoutes = express.Router();

const api = require('../common/api');
const mockData = require('../common/mock-data');

apiRoutes.get(`${api.MATERIAL_EDITOR_URL_PART}${api.GEOMETRIC_OBJECTS_URL_SUFIX}`, GeometricObjects.getObjects);

apiRoutes.get(`${api.SHADER_EDITOR_URL_PART}${api.GEOMETRIC_OBJECTS_URL_SUFIX}`, (req, res) => {
  res.json(mockData.seGeoObjects);
});

apiRoutes.get(`${api.GLSL_PROGRAMS_URL_PART}`, (req, res) => {
  res.json(mockData.glslPrograms);
});

apiRoutes.get(`${api.GLSL_PROGRAMS_URL_PART}/:id`, (req, res) => {
  res.json({ ...mockData.fullGlslProgram, uuid: req.params.id });
});

apiRoutes.post('/upload-some-img', upload.array(), (req, res, next) => {
  console.log(req.body);
  res.json(req.body);
});

module.exports = apiRoutes;
