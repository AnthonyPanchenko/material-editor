const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const geometricObjectsSchema = new Schema({
  id: ObjectId,
  title: { type: String, default: '', required: true }
});

mongoose.model('GeometricObjects', geometricObjectsSchema);
