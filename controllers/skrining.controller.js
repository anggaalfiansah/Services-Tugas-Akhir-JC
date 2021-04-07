const SkriningData = require("../models/skrining.model");

exports.createReport = async (req, res) => {
  const { UserID, Nama, Score, HasilTest, Tanggal, Bulan, Tahun } = req.body;
  try {
    const skrining = await SkriningData.findOne({
      UserID,
      Nama,
      Tanggal,
      Bulan,
      Tahun,
    });
    console.log(skrining);
    if (skrining == null || skrining == undefined) {
      const data = new SkriningData({
        UserID,
        Nama,
        Score,
        HasilTest,
        Tanggal,
        Bulan,
        Tahun,
      });
      await data.save().then(() => {
        res.status(200).json({
          message: `Anda memiliki ${HasilTest}`,
        });
      });
    } else {
      res.status(200).json({
        message: `Anda sudah melakukan skrining pada hari ini, dan hasilnya anda memiliki ${skrining.HasilTest}`,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error");
  }
};
