const GeometricObjects = require('../models/geometric-objects');

exports.get = async (req, res) => {
  const result = await GeometricObjects.find().exec();
  return res.status(200).json(result);
}

exports.remove = async (req, res, next) => {
  await GeometricObjects.remove({ _id: req.params.id }).exec();
  return res.status(200).send();
}
