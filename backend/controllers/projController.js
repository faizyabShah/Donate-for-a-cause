const { ProjModel } = require("../models/projModel");
const { User } = require("../models/userModel");
const mongoose = require("mongoose");

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
  const { id, amount } = req.body;

  let proj;
  try {
    proj = await ProjModel.findById(id);
  } catch (err) {
    return res.status(404).json({ msg: "Proj not found" });
  }

  try {
    proj = await ProjModel.addDonation(req.user._id, id, amount);
    let user = await User.findById(req.user._id);
    user.wallet -= parseInt(amount);
    await user.save();

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

// get all the projects where the user id in donations is equal to req.user._id
const getUserProjects = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    // get projects where donations.user_id = req.user._id and populate the organization field
    const proj = await ProjModel.find({
      "donations.user_id": req.user._id,
    }).populate("organization");

    if (!proj || proj.length === 0) {
      return res.status(404).json({ msg: "No projects found." });
    }
    res.status(200).json(proj);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// get the sum of all donations where the user id in donations is equal to req.user._id
const getUserDonations = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    const proj = await ProjModel.find({
      "donations.user_id": req.user._id,
    }).populate("organization");

    if (!proj || proj.length === 0) {
      return res.status(404).json({ msg: "No projects found." });
    }
    const sum = proj.reduce((acc, curr) => {
      const donations = curr.donations.filter(
        (donation) => donation.user_id.toString() === req.user._id.toString()
      );
      return acc + donations.reduce((acc, curr) => acc + curr.amount, 0);
    }, 0);
    res.status(200).json({ sum });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// get sum of donations of user of only the current month
const getUserDonationsMonth = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    const proj = await ProjModel.find({
      "donations.user_id": req.user._id,
    }).populate("organization");

    if (!proj || proj.length === 0) {
      return res.status(404).json({ msg: "No projects found." });
    }
    const sum = proj.reduce((acc, curr) => {
      const donations = curr.donations.filter(
        (donation) =>
          donation.user_id.toString() === req.user._id.toString() &&
          donation.timestamp.getMonth() === new Date().getMonth()
      );
      return acc + donations.reduce((acc, curr) => acc + curr.amount, 0);
    }, 0);
    res.status(200).json({ sum });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// get sum of donations of a user of current year
const getUserDonationsYear = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    const proj = await ProjModel.find({
      "donations.user_id": req.user._id,
    }).populate("organization");

    if (!proj || proj.length === 0) {
      return res.status(404).json({ msg: "No projects found." });
    }
    const sum = proj.reduce((acc, curr) => {
      const donations = curr.donations.filter(
        (donation) =>
          donation.user_id.toString() === req.user._id.toString() &&
          donation.timestamp.getFullYear() === new Date().getFullYear()
      );
      return acc + donations.reduce((acc, curr) => acc + curr.amount, 0);
    }, 0);
    res.status(200).json({ sum });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// get users donations of each of the last five months
const getUserDonationsLastFiveMonths = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    const proj = await ProjModel.find({
      "donations.user_id": req.user._id,
    }).populate("organization");

    if (!proj || proj.length === 0) {
      return res.status(404).json({ msg: "No projects found." });
    }
    const sum = proj.reduce((acc, curr) => {
      const donations = curr.donations.filter(
        (donation) =>
          donation.user_id.toString() === req.user._id.toString() &&
          donation.timestamp.getMonth() === new Date().getMonth()
      );
      return acc + donations.reduce((acc, curr) => acc + curr.amount, 0);
    }, 0);
    const summ = proj.reduce((acc, curr) => {
      const donations = curr.donations.filter(
        (donation) =>
          donation.user_id.toString() === req.user._id.toString() &&
          donation.timestamp.getMonth() === new Date().getMonth() - 1
      );
      return acc + donations.reduce((acc, curr) => acc + curr.amount, 0);
    }, 0);
    const summm = proj.reduce((acc, curr) => {
      const donations = curr.donations.filter(
        (donation) =>
          donation.user_id.toString() === req.user._id.toString() &&
          donation.timestamp.getMonth() === new Date().getMonth() - 2
      );
      return acc + donations.reduce((acc, curr) => acc + curr.amount, 0);
    }, 0);
    const summmm = proj.reduce((acc, curr) => {
      const donations = curr.donations.filter(
        (donation) =>
          donation.user_id.toString() === req.user._id.toString() &&
          donation.timestamp.getMonth() === new Date().getMonth() - 3
      );
      return acc + donations.reduce((acc, curr) => acc + curr.amount, 0);
    }, 0);
    const summmmm = proj.reduce((acc, curr) => {
      const donations = curr.donations.filter(
        (donation) =>
          donation.user_id.toString() === req.user._id.toString() &&
          donation.timestamp.getMonth() === new Date().getMonth() - 4
      );
      return acc + donations.reduce((acc, curr) => acc + curr.amount, 0);
    }, 0);

    let obj = {};
    obj[new Date().getMonth()] = sum;
    obj[new Date().getMonth() - 1] = summ;
    obj[new Date().getMonth() - 2] = summm;
    obj[new Date().getMonth() - 3] = summmm;
    obj[new Date().getMonth() - 4] = summmmm;

    res.status(200).json(obj);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const completeProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await ProjModel.findByIdAndUpdate(id, {
      status: "Completed",
    });

    const users = [];
    for (donation of project.donations) {
      try {
        const user = await User.findById(donation.user_id);
        users.push(user);
      } catch (err) {
        res.status(400).json({ msg: err.message });
      }
    }
    for (user of users) {
      user.notifications.push({
        message: `The project ${project.name} that you donated to has been completed.`,
        project_id: project._id,
      });
      await user.save();
    }

    res.status(200).json({ msg: "Project completed successfully" });
  } catch (err) {
    return res.status(404).json({ msg: "Proj not found" });
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
  getUserProjects,
  getUserDonations,
  getUserDonationsMonth,
  getUserDonationsYear,
  getUserDonationsLastFiveMonths,
  completeProject,
};
