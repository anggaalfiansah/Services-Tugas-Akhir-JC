const mongodb = require("mongoose");

const FaceModel = new mongodb.Schema({
  UserID: {
    type: String,
    required: true,
  },
  Nama: {
    type: String,
    required: true,
  },
  FaceDescriptors: {
    type: Array,
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const FaceData = mongodb.model("Faces", FaceModel);

module.exports = FaceData;
