var express = require('express');
var router = express.Router();
var controller = require("../controllers/skrining.controller");

router.post('/', controller.createReport);

module.exports = router;
