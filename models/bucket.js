const mongoose = require('mongoose');

const bucketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  objects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Object'
  }]
});

const Bucket = mongoose.model('Bucket', bucketSchema);
