const GlslPrograms = require('../models/glsl-programs');

exports.getFullOrPartOfGLSLProgramById = async (req, res) => {
  let result = null;

  if (req.query.fieldName) {
    result = await GlslPrograms.findById(req.params.id).select(req.query.fieldName).exec();
  } else {
    result = await GlslPrograms.findById(req.params.id).exec();
  }

  return res.status(200).json(result);
}

exports.getAllGLSLProgramsShortModels = async (req, res) => {
  const result = await GlslPrograms.find().select('name previewBgUlr').exec();
  return res.status(200).json(result);
}

exports.removeGLSLProgramById = (req, res, next) =>
  GlslPrograms.remove({ _id: req.params.id }, (err) => {
    if (err) {
      return res.status(422).send({ error: 'Cannot remove glsl program by id' });
    }

    return res.status(200).send();
  });

exports.createGLSLProgram = async (req, res, next) => {
  if (!req.body.name) {
    return res.status(422).send({ error: 'GLSL program "name" is not specified' });
  }

  const newGlslProgram = await GlslPrograms.create(req.body);

  return res.status(201).json(newGlslProgram);
};

exports.updateGLSLProgramById = (req, res, next) =>
  GlslPrograms.findById(req.params.id, (err, objModel) => {
    if (err) {
      console.log(err);
    }

    objModel.set(req.body);
    objModel.save((err, updatedModel) => {
      if (err) {
        console.log(err);
      }

      res.status(200).json(updatedModel);
    });
  });
