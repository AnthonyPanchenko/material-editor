const GlslPrograms = require('../models/glsl-programs');

exports.get = async (req, res) => {
  const result = await GlslPrograms.find().select('name previewBgUlr').exec();
  return res.status(200).json(result);
}

exports.remove = (req, res, next) =>
  GlslPrograms.remove({ _id: req.params.id }, (error) => {
    if (error) {
      return res.status(422).send({ error: 'Cannot remove glsl program by id' });
    }

    return res.status(200).send();
  });

exports.create = async (req, res, next) => {
  if (!req.body.name) {
    return res.status(422).send({ error: 'GLSL program "name" is not specified' });
  }

  const newGlslProgram = await GlslPrograms.create(req.body);

  return res.status(201).json(newGlslProgram);
};

exports.update = (req, res, next) =>
  GlslPrograms.findById(req.params.id, (err, objModel) => {
    if (err) {
      console.log(err);
    }

    objModel.set({ name: req.body.name });
    objModel.save((err, updatedModel) => {
      if (err) {
        console.log(err);
      }

      res.status(200).json(updatedModel);
    });
  });
