const mongodb = require("mongoose");

const skriningModel = new mongodb.Schema({
  UserID: {
    type: String,
    required: true,
  },
  Nama: {
    type: String,
    required: true,
  },
  Score: { 
      type: Number, 
      required: true 
  },
  HasilTest: {
    type: String,
    required: true,
  },
  Tanggal: {
    type: String,
    required: true,
  },
  Bulan: {
    type: String,
    required: true,
  },
  Tahun: {
    type: String,
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const SkriningData = mongodb.model("skrining", skriningModel);

module.exports = SkriningData;
