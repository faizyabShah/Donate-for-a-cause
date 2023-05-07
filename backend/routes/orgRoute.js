const express = require("express");
const router = express.Router();
const { signupOrg, loginOrg } = require("../controllers/orgController");

router = express.Router();

//login route

router.post("/login", loginOrg);

// signup route

router.post("/signup", signupOrg);

module.exports = router;
