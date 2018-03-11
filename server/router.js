const express = require('express');
const multer = require('multer');

const GeometricObjects = require('./controllers/geometric-objects');
const GlslPrograms = require('./controllers/glsl-programs');

const upload = multer(); // for parsing multipart/form-data
const router = express.Router();

const api = require('../common/api');

router.get(`${api.MATERIAL_EDITOR_URL_PART}${api.GEOMETRIC_OBJECTS_URL_SUFIX}`, GeometricObjects.get);
router.delete(`${api.MATERIAL_EDITOR_URL_PART}${api.GEOMETRIC_OBJECTS_URL_SUFIX}/:id`, GeometricObjects.remove);

router.get(api.GLSL_PROGRAMS_URL_PART, GlslPrograms.get);
router.post(api.GLSL_PROGRAMS_URL_PART, GlslPrograms.create);
router.put(`${api.GLSL_PROGRAMS_URL_PART}/:id`, GlslPrograms.update);
router.delete(`${api.GLSL_PROGRAMS_URL_PART}/:id`, GlslPrograms.remove);

router.post('/upload-some-img', upload.array(), (req, res, next) => {
  console.log(req.body);
  res.json(req.body);
});

module.exports = router;
