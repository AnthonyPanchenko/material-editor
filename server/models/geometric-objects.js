const collectionNames = require('../constants/collection-names');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaName = new Schema({
  title: String
}, {
  collection: collectionNames.GEOMETRIC_OBJECTS
});

module.exports = mongoose.model(collectionNames.GEOMETRIC_OBJECTS, schemaName);
