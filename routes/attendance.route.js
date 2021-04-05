var express = require('express');
var router = express.Router();
var controller = require("../controllers/attendace.controller");

/* GET home page. */
router.post('/', controller.createAttendance);
router.put('/CheckIn', controller.CheckIn);

module.exports = router;
