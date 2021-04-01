var multer = require("multer");

// Konfigurasi Upload Foto
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `foto-${req.body.NIK}-${req.body.Nama}-${Date.now()}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

exports.register = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).single("FotoProfil");

exports.login = multer().none()
