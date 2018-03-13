const express = require('express');
const multer = require('multer');

const GeometricObjects = require('./controllers/geometric-objects');
const GlslPrograms = require('./controllers/glsl-programs');

const upload = multer(); // for parsing multipart/form-data
const router = express.Router();

const api = require('../common/api');

router.get(`${api.MATERIAL_EDITOR_URL_PART}${api.GEOMETRIC_OBJECTS_URL_SUFIX}`, GeometricObjects.get);
router.delete(`${api.MATERIAL_EDITOR_URL_PART}${api.GEOMETRIC_OBJECTS_URL_SUFIX}/:id`, GeometricObjects.remove);

router.route(api.GLSL_PROGRAMS_URL_PART)
  .get(GlslPrograms.getAllGLSLProgramsShortModels)
  .post(GlslPrograms.createGLSLProgram);

router.route(`${api.GLSL_PROGRAMS_URL_PART}/:id`)
  .get(GlslPrograms.getFullOrPartOfGLSLProgramById)
  .put(GlslPrograms.updateGLSLProgramById)
  .delete(GlslPrograms.removeGLSLProgramById);

router.post('/upload-some-img', upload.array(), (req, res, next) => {
  console.log(req.body);
  res.json(req.body);
});

module.exports = router;
