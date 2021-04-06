const UserData = require("../models/user.model");
const FaceData = require("../models/face.model");
const AttendanceData = require("../models/attendance.model");
const SkriningData = require("../models/skrining.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
exports.register = async (req, res) => {
  const {
    NIK,
    Nama,
    Email,
    TempatLahir,
    TanggalLahir,
    Provinsi,
    Kota,
    Kecamatan,
    Kelurahan,
    DetailAlamat,
    Password,
    FaceDescriptors,
  } = req.body;
  try {
    // Proses Foto & FaceDescritors
    const FotoProfil = `images/${req.file.filename}`;
    const FaceDescriptor = JSON.parse(FaceDescriptors);
    const descriptors = [];
    FaceDescriptor.map((item) => {
      const faces = Object.values(item);
      descriptors.push(faces);
    });

    // Validasi NIK & EMAIL
    const nik = await UserData.findOne({ NIK });
    const email = await UserData.findOne({ Email });
    if (nik || email) {
      return res.status(400).json({
        message: "NIK/Email Sudah Terdaftar",
      });
    }

    const data = new UserData({
      NIK,
      Nama,
      Email,
      TempatLahir,
      TanggalLahir,
      Alamat: {
        Provinsi,
        Kota,
        Kecamatan,
        Kelurahan,
        DetailAlamat,
      },
      Password,
      FotoProfil,
      FaceDescriptors: descriptors,
    });

    const salt = await bcrypt.genSalt(10);
    data.Password = await bcrypt.hash(Password, salt);
    await data.save().then((user) => {
      // Save wajah ke collection Faces
      const face = new FaceData({
        UserID: user.id,
        Nama: user.Nama,
        FaceDescriptors: user.FaceDescriptors,
      });
      face.save();

      const payload = {
        id: user.id,
      };
      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 86400,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            userID: user.id,
            token,
            expiresIn: 86400,
          });
        }
      );
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error");
  }
};

// Login dengan NIK / Email
exports.login = async (req, res) => {
  const { NIK, Email, Password } = req.body;
  const Key = NIK ? { NIK: NIK } : { Email: Email };
  try {
    const user = await UserData.findOne(Key);
    console.log(user);
    if (!user)
      return res.status(400).json({
        message: "User Not Exist",
      });

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch)
      return res.status(400).json({
        message: "Incorrect Password !",
      });

    const payload = {
      id: user.id,
    };

    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: 86400,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          userID: user.id,
          token,
          expiresIn: 86400,
        });
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Mendapatkan Semua User
exports.getAllUser = async (req, res) => {
  try {
    const data = await UserData.find();
    res.status(200).json({
      message: "Berhasil Mendapatkan Semua User",
      data,
    });
  } catch (e) {
    console.error(e);
    res.status(400).send("Gagal mendapatkan Semua User, ERR : " + err);
  }
};

// Mendapatkan User Berdasarkan ID
exports.getUserByID = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await UserData.findById(id);
    console.log(data);
    res.status(200).json({
      data,
      message: `Berhasil Mendapatkan User Dengan ID : ${id}`,
    });
  } catch (e) {
    console.error(e);
    res
      .status(400)
      .send(`Gagal mendapatkan User Dengan ID : ${id}, ERR : ${err}`);
  }
};

// Mendapatkan data kunjungan berdasarkan User ID
exports.getAttendanceByID = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await AttendanceData.find({ UserID: id });
    console.log(data);
    res.status(200).json({
      data,
      message: `Berhasil Mendapatkan Semua Data Kunjungan Dengan UserID : ${id}`,
    });
  } catch (e) {
    console.error(e);
    res
      .status(400)
      .send(
        `Gagal mendapatkan Semua Data Kunjungan Dengan UserID : ${id}, ERR : ${err}`
      );
  }
};

// Mendapatkan data skrining berdasarkan User ID
exports.getSkriningByID = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await SkriningData.find({ UserID: id });
    console.log(data);
    res.status(200).json({
      data,
      message: `Berhasil Mendapatkan Semua Data Skrining Dengan UserID : ${id}`,
    });
  } catch (e) {
    console.error(e);
    res
      .status(400)
      .send(
        `Gagal mendapatkan Semua Data Skrining Dengan UserID : ${id}, ERR : ${err}`
      );
  }
};
