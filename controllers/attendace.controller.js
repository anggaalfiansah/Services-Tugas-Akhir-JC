const AttendanceData = require("../models/attendance.model");

exports.createAttendance = async (req, res) => {
  const { UserID, Nama, Tanggal, Bulan, Tahun, Keterangan } = req.body;
  try {
    const Attendance = await AttendanceData.find({ Tanggal, Bulan, Tahun });
    if (Attendance.length < 15) {
      const data = new AttendanceData({
        UserID,
        Nama,
        Tanggal,
        Bulan,
        Tahun,
        Keterangan,
      });
      await data.save().then(() => {
        res.status(200).json({
          data,
          message: "Request berhasil terkirim",
        });
      });
    } else {
      res.status(200).json({
        message: "Kuota kunjungan sudah penuh",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error");
  }
};

exports.CheckIn = async (req, res) => {
  const { UserID, Tanggal, Bulan, Tahun, CheckIn } = req.body;
  try {
    const filter = { UserID, Tanggal, Bulan, Tahun };
    const update = { CheckIn };
    const check = await AttendanceData.findOne(filter);
    console.log(check);
    if (check.CheckIn === null) {
      await AttendanceData.updateOne(filter, update).then(() => {
        res.status(200).json({
          message: `Check In berhasil pada ${update.CheckIn}`,
        });
      });
    } else {
      res.status(200).json({
        message: `Anda sudah check in pada ${update.CheckIn}`,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error");
  }
};
