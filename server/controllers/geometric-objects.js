const GeometricObjects = require('../models/geometric-objects');

exports.getObjects = (req, res) => {
  GeometricObjects.find((err, list) => {
    res.json(list);
  });
}

exports.loginWithToken = function (req, res, next) {
  res.status(200).json({
    token: 'JWT',
    user: req.user
  });
};
