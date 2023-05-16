const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  getProject,
  addDonation,
  getOrgProjects,
  getUserProjects,
  getUserDonations,
  getUserDonationsMonth,
  getUserDonationsYear,
  getUserDonationsLastFiveMonths,
  completeProject,
} = require("../controllers/projController");
const authenticate = require("../middleware/authenticate");
const { get } = require("mongoose");

router.use(authenticate);
// get all projects
router.get("/getallprojects", getProjects);

// get a project by id
router.get("/getbyid/:id", getProject);

// create a project
router.post("/addproject/", createProject);

// add a donation
router.post("/donate", addDonation);

// get org projects
router.get("/organization/", getOrgProjects);

// get user projects
router.get("/user/", getUserProjects);

// get user donations
router.get("/userdonations", getUserDonations);

// get user donations of current month
router.get("/userdonationsmonth", getUserDonationsMonth);

// get user donations of current year
router.get("/userdonationsyear", getUserDonationsYear);

// get user donations of each of the last five months
router.get("/userdonationslastfivemonths", getUserDonationsLastFiveMonths);

router.put("/completeproject/:id", completeProject);

module.exports = router;
