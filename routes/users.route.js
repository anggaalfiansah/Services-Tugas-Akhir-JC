var express = require("express");
var router = express.Router();
var controller = require("../controllers/user.controller");
var { register, login } = require("../middleware/form.validation");
var { authentication } = require("../middleware/token.validation");

// Register
router.post("/register", register, controller.register);

// Login
router.post("/login", login, controller.login);

// Get All User
router.get("/", authentication, controller.getAllUser);
// Get All User
router.get("/:id", authentication, controller.getUserByID);

// Get All User Face
router.get("/Face", controller.getAllFace);

module.exports = router;
