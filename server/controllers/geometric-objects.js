const GeometricObjects = require('../models/geometric-objects');

exports.getObjects = async (req, res) => {
  const result = await GeometricObjects.find().exec();
  return res.status(200).json(result);
}

// exports.getObjects = (req, res) => {
//   GeometricObjects.find((err, list) => {
//     res.json(list);
//   });
// }

exports.get = async function (req, res, next) {
  const result = await GeometricObjects.find().exec();
  return res.status(200).json(result);
};

exports.remove = async function (req, res, next) {
  await GeometricObjects.remove({ _id: req.params.id }).exec();
  return res.status(200).send();
}
