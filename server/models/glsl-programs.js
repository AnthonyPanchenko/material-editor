const collectionNames = require('../constants/collection-names');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const glslProgramsSchema = new Schema({
  name: String
}, {
  versionKey: false,
  collection: collectionNames.GLSL_PROGRAMS
});

module.exports = mongoose.model(collectionNames.GLSL_PROGRAMS, glslProgramsSchema);
