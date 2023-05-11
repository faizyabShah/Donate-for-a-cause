const express = require("express");
const {
  signupOrg,
  loginOrg,
  getOrgInfo,
} = require("../controllers/orgController");

router = express.Router();

//login route

router.post("/login", loginOrg);

// signup route

router.post("/signup", signupOrg);

router.get("/getorginfo", getOrgInfo);

module.exports = router;
