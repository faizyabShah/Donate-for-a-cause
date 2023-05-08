const express = require("express");
const { signupOrg, loginOrg } = require("../controllers/orgController");

router = express.Router();

//login route

router.post("/login", loginOrg);

// signup route

router.post("/signup", signupOrg);

module.exports = router;
