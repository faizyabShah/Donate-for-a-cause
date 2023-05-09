const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  getProject,
  deleteProject,
  updateProject,
  addDonation,
} = require("../controllers/projController");

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

module.exports = router;
