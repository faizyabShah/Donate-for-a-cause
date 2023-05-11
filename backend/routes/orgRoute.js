const express = require("express");
const {
  signupOrg,
  loginOrg,
  getOrgInfo,
  getAllOrgs,
} = require("../controllers/orgController");
const authenticate = require("../middleware/authenticate");

router = express.Router();

router.use("/getallorganizations", authenticate);

//login route

router.post("/login", loginOrg);

// signup route

router.post("/signup", signupOrg);

router.get("/getorginfo", getOrgInfo);

router.get("/getallorganizations", getAllOrgs);

module.exports = router;
