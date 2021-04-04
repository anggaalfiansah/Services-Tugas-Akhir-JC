const FaceData = require("../models/face.model");

// Mendapatkan Semua User Face
exports.getAllFace = async (req, res) => {
    FaceData.find().exec((err, data) => {
      if (!err) {
        res.status(200).json({
          message: "Berhasil Mendapatkan Semua Face,",
          data,
        });
      } else {
        res.status(400).send("Gagal Mendapatkan Semua Face, ERR : " + err);
      }
    });
  };