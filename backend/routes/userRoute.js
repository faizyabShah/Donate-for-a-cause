const express = require("express");

const {
  loginUser,
  signupUser,
  getUserInfo,
  _editUser,
  getUserWallet,
  addUserWallet,
  clearNotifications,
  getPeopleImpacted,
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

router.use("/wallet", authenticate);

router.get("/wallet", getUserWallet);

router.use("/addtowallet", authenticate);

router.post("/addtowallet", addUserWallet);

router.use("/clearnotifications", authenticate);

router.post("/clearnotifications", clearNotifications);

router.use("/getpeopleimpacted", authenticate);

router.get("/getpeopleimpacted", getPeopleImpacted);
module.exports = router;
