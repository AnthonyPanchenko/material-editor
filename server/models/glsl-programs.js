const collectionNames = require('../constants/collection-names');
const mongoose = require('mongoose');
const validators = require('../utils/validators');
const Schema = mongoose.Schema;

const controlSchema = new Schema({
  value: {
    type: Schema.Types.Mixed,
    validate: {
      validator: validators.valueValidator,
      message: '{VALUE} is not a valid!'
    }
  },
  mode: { type: String, default: '' },
  name: { type: String, default: '' },
  dataType: { type: String, default: '' }
});

// http://jasonjl.me/blog/2014/10/23/adding-validation-for-embedded-objects-in-mongoose/

const glslProgramsSchema = new Schema({
  name: { type: String, default: '' },
  previewBgUlr: String,
  shaders: {
    fragmentShader: { type: String, default: '' },
    vertexShader: { type: String, default: '' }
  },
  controls: {
    fragmentShader: {
      attributes: [controlSchema],
      uniforms: [controlSchema],
      textures: [controlSchema]
    },
    vertexShader: {
      attributes: [controlSchema],
      uniforms: [controlSchema],
      textures: [controlSchema]
    }
  }
}, {
  versionKey: false,
  collection: collectionNames.GLSL_PROGRAMS
});

module.exports = mongoose.model(collectionNames.GLSL_PROGRAMS, glslProgramsSchema);
