const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  getProject,
  deleteProject,
  updateProject,
  addDonation,
  getOrgProjects,
} = require("../controllers/projController");
const authenticate = require("../middleware/authenticate");

router.use(authenticate);
// get all projects
router.get("/getallprojects", getProjects);

// get a project by id
router.get("/getbyid/:id", getProject);

// create a project
router.post("/addproject/", createProject);

// delete a project
router.post("/delete/:id", deleteProject);

// update a project
router.post("/update", updateProject);

// add a donation
router.post("/donate", addDonation);

// get org projects
router.get("/organization/", getOrgProjects);

module.exports = router;
