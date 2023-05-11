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
router.get("/", getProjects);

// get a project by id
router.get("/:id", getProject);

// create a project
router.post("/", createProject);

// delete a project
router.post("/delete/:id", deleteProject);

// update a project
router.post("/update", updateProject);

// add a donation
router.post("/donate", addDonation);

// get org projects
router.get("/org/", getOrgProjects);

module.exports = router;
