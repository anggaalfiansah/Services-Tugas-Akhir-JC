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

// Get User By Id
router.get("/:id", authentication, controller.getUserByID);

// Get Attendance data by User Id
router.get("/attendance/:id", authentication, controller.getAttendanceByID);

// Get Skrining data by User Id
router.get("/skrining/:id", authentication, controller.getSkriningByID);

module.exports = router;
