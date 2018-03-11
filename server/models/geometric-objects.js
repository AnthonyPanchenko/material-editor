const collectionNames = require('../constants/collection-names');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const geometricObjectsSchema = new Schema({
  name: String
}, {
  collection: collectionNames.GEOMETRIC_OBJECTS
});

module.exports = mongoose.model(collectionNames.GEOMETRIC_OBJECTS, geometricObjectsSchema);
