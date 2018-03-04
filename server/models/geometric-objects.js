const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaName = new Schema({
  title: String
}, {
  collection: 'GeometricObjects'
});

module.exports = mongoose.model('GeometricObjects', schemaName);
