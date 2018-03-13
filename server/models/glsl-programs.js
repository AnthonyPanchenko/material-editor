const collectionNames = require('../constants/collection-names');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const controlSchema = new Schema({
  uuid: Schema.Types.ObjectId,
  value: Schema.Types.Mixed,
  mode: { type: String, default: '' },
  name: { type: String, default: '' },
  dataType: { type: String, default: '' }
});

// mongoose.model('Control', controlSchema);
// http://jasonjl.me/blog/2014/10/23/adding-validation-for-embedded-objects-in-mongoose/
const glslProgramsSchema = new Schema({
  name: { type: String, default: '' },
  previewBgUlr: String,
  shaders: {
    fragment: { type: String, default: '' },
    vertex: { type: String, default: '' }
  },
  controls: {
    fragment: {
      attributes: [
        {
          uuid: Schema.ObjectId,
          value: Schema.Types.Mixed,
          mode: { type: String, default: '' },
          name: { type: String, default: '' },
          dataType: { type: String, default: '' }
        }
      ],
      uniforms: [controlSchema],
      textures: [controlSchema]
    },
    vertex: {
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
