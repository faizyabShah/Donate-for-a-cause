const express = require("express");

const {
  loginUser,
  signupUser,
  getUserInfo,
  _editUser,
} = require("../controllers/userController");
const authenticate = require("../middleware/authenticate");

router = express.Router();

router.use("/edituser", authenticate);

//login route

router.post("/login", loginUser);

// signup route

router.post("/signup", signupUser);

router.get("/getuserinfo", getUserInfo);

router.post("/edituser", _editUser);

module.exports = router;
