const mongoose = require('mongoose');

const objectSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    bucketId : {
        type: String,
        required: true
    },
    contentType: {
      type: String,
      required: true
    },
    data: {
      type: Buffer,
      required: true
    }
  });
  
  const Object = mongoose.model('Object', objectSchema);
 