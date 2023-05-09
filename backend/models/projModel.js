//project schema here
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Organization } = require("./orgModel");

const ProjSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    donations: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        amount: {
          type: Number,
        },
      },
    ],
    amount_raised: {
      type: Number,
    },
    Type: {
      type: String,
      enum: [
        "Zakat",
        "Zakat-ul-Fitr",
        "Sadaqah",
        "Sadaqah Jariyah",
        "Qurbani",
        "Waqf",
      ],
    },
    Audit: {
      type: String,
    },
    Picture: {
      type: String,
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
    },
  },
  { timeStamps: true }
);

// static methods

// write a static method to add a new project
ProjSchema.statics.addProject = async function (
  name,
  description,
  cost,
  Type,
  Audit,
  Picture,
  organization
) {
  if (!name || !description || !cost || !Type || !Audit || !Picture) {
    throw Error("All fields are required.");
  }

  const proj = await this.create({
    name,
    description,
    cost,
    Type,
    Audit,
    Picture,
    organization,
  });
  return proj;
};

// writ a static method to get a project of a specific id
ProjSchema.statics.getProject = async function (id) {
  if (!id) {
    throw Error("Id is required.");
  }

  const proj = await this.findOne({ _id: id });
  return proj;
};

// write a static method to get all projects
ProjSchema.statics.getAllProjects = async function () {
  const proj = await this.find();
  return proj;
};

// write a static method to delete a project of a specific id
ProjSchema.statics.deleteProject = async function (id) {
  if (!id) {
    throw Error("Id is required.");
  }

  const proj = await this.findOneAndDelete({ _id: id });
  return proj;
};

// write a static method to update a project of a specific id
ProjSchema.statics.updateProject = async function (
  id,
  name,
  description,
  cost,
  Type,
  Audit,
  Picture
) {
  if (!id) {
    throw Error("Id is required.");
  }

  const proj = await this.findOneAndUpdate(
    { _id: id },
    { name, description, cost, Type, Audit, Picture }
  );

  return proj;
};

// write a static method to add a new expense
ProjSchema.statics.addDonation = async function (id, user_id, amount) {
  if (!id || !user_id || !amount) {
    throw Error("All fields are required.");
  }

  const proj = await this.findOne({ _id: id });
  proj.donations.push({ user_id, amount });
  proj.amount_raised += amount;
  proj.save();
  return proj;
};

// write a static method to get 10 random projects
ProjSchema.statics.getProjects = async function () {
  const proj = await this.aggregate([{ $sample: { size: 10 } }]);
  return proj;
};

// write a static method to get all projects of an organization
ProjSchema.statics.getOrgProjects = async function (id) {
  const proj = await this.find({ organization: id });
  return proj;
};

// write a static method to get all projects of a user
ProjSchema.statics.getUserProjects = async function (id) {
  const proj = await this.find({ "donations.user_id": id });
  return proj;
};

// write a static method to get all projects of a type
ProjSchema.statics.getTypeProjects = async function (type) {
  const proj = await this.find({ Type: type });
  return proj;
};

// write a static method to get projects with a search string in their name or description or organizataion name
ProjSchema.statics.getSearchProjects = async function (search) {
  const proj = await this.find({
    $or: [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { organization: { $regex: search, $options: "i" } },
    ],
  });
  return proj;
};

const ProjModel = mongoose.model("Project", ProjSchema);
module.exports = { ProjModel };
