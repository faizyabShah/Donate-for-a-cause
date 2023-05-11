const { ProjModel } = require("../models/projModel");

// create controller functions for all the static methods in the projModel.js file
const getProjects = async (req, res) => {
  const projs = await ProjModel.getAllProjects();
  res.status(200).json(projs);
};

const getProject = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const proj = await ProjModel.findById(id);

  if (!proj) {
    res.status(404).json({ msg: "Proj not found" });
  }

  res.status(200).json(proj);
};

const createProject = async (req, res) => {
  const {
    name,
    description,
    cost,
    donations,
    amount_raised,
    Type,
    Audit,
    Picture,
  } = req.body;
  const organization = req.user._id;
  try {
    const proj = await ProjModel.create({
      name,
      description,
      cost,
      donations,
      amount_raised,
      Type,
      Audit,
      Picture,
      organization,
    });
    res.status(201).json({ proj });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    ProjModel.deleteProject(id);
    res.status(200).json({ msg: "Proj deleted successfully" });
  } catch (err) {
    return res.status(404).json({ msg: "Proj not found" });
  }
};

// write the rest of the controller functions but use the static functions in projModel.js
const updateProject = async (req, res) => {
  const { id, name, description, cost, Type, Audit, Picture, organization } =
    req.body;

  let proj;
  try {
    //find proj from database
    proj = await ProjModel.findById(id);
  } catch (err) {
    return res.status(404).json({ msg: "Proj not found" });
  }

  try {
    proj = await ProjModel.updateProject(
      id,
      name,
      description,
      cost,
      Type,
      Audit,
      Picture,
      organization
    );

    res.status(200).json({ proj });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const addDonation = async (req, res) => {
  const { user_id, id, amount } = req.body;

  let proj;
  try {
    //find proj from database
    proj = await ProjModel.findById(id);
  } catch (err) {
    return res.status(404).json({ msg: "Proj not found" });
  }

  try {
    proj = await ProjModel.addDonation(user_id, id, amount);

    res.status(200).json({ proj });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// create a controller to get org projects
const getOrgProjects = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    const proj = await ProjModel.find({
      organization: req.user._id,
    });
    if (!proj || proj.length === 0) {
      return res.status(404).json({ msg: "No projects found." });
    }
    res.status(200).json(proj);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  deleteProject,
  updateProject,
  addDonation,
  getOrgProjects,
};
