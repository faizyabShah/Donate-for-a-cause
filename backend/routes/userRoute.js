const express = require("express");

const {
  loginUser,
  signupUser,
  getUserInfo,
} = require("../controllers/userController");

router = express.Router();

//login route

router.post("/login", loginUser);

// signup route

router.post("/signup", signupUser);

router.get("/getuserinfo", getUserInfo);

module.exports = router;
