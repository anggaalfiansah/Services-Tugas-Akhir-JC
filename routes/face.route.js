var express = require("express");
var router = express.Router();
var controller = require("../controllers/face.controller");

// Get All User Face
router.get("/", controller.getAllFace);

module.exports = router;