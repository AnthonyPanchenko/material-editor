const collectionNames = require('../constants/collection-names');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const controlSchema = new Schema({
  uuid: Schema.Types.ObjectId,
  value: Schema.Types.Mixed,
  mode: String,
  name: String,
  dataType: String
});

const glslProgramsSchema = new Schema({
  name: { type: String, default: '' },
  previewBgUlr: String,
  shaders: {
    fragmentShader: String,
    vertexShader: String
  },
  controls: {
    fragmentShader: {
      attributes: [{ ref: controlSchema }],
      uniforms: [{ ref: controlSchema }],
      textures: [{ ref: controlSchema }]
    },
    vertexShader: {
      attributes: [{ ref: controlSchema }],
      uniforms: [{ ref: controlSchema }],
      textures: [{ ref: controlSchema }]
    }
  }
}, {
  versionKey: false,
  collection: collectionNames.GLSL_PROGRAMS
});

module.exports = mongoose.model(collectionNames.GLSL_PROGRAMS, glslProgramsSchema);
