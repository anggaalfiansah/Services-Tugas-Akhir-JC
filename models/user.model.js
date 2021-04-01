const mongodb = require("mongoose");

const UserModel = new mongodb.Schema({
  NIK: {
    type: Number,
    required: true,
  },
  Nama: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  TempatLahir: {
    type: String,
    required: true,
  },
  TanggalLahir: {
    type: Date,
    required: true,
  },
  Alamat: {
    Provinsi: {
      type: String,
      required: true,
    },
    Kota: {
      type: String,
      required: true,
    },
    Kecamatan: {
      type: String,
      required: true,
    },
    Kelurahan: {
      type: String,
      required: true,
    },
    DetailAlamat: {
      type: String,
      required: true,
    },
  },
  Password: {
    type: String,
    required: true,
  },
  FotoProfil: {
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

const UserData = mongodb.model("Users", UserModel);

module.exports = UserData;
