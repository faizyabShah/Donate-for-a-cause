//project schema here
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Organization } = require("../models/orgModel");

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

    // add donations array with user_id and amount and timestamp
    donations: [
      {
        user_id: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        amount: {
          type: Number,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    status: {
      type: String,
      enum: ["Active", "Pending", "Completed"],
      default: "Active",
    },

    amount_raised: {
      type: Number,
      default: 0,
    },
    Picture: {
      type: String,
      required: true,
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
    },
    peopleImpacted: {
      type: Number,
      required: true,
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
  organization,
  peopleImpacted
) {
  if (
    !name ||
    !description ||
    !cost ||
    !Type ||
    !Audit ||
    !Picture ||
    peopleImpacted
  ) {
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
    peopleImpacted,
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

// write a static method to add a new expense
ProjSchema.statics.addDonation = async function (user_id, id, amount) {
  if (!id || !user_id || !amount) {
    throw Error("All fields are required.");
  }
  const proj = await this.findOne({ _id: id });
  proj.donations.push({ user_id, amount: parseInt(amount) });
  proj.amount_raised += parseInt(amount);
  if (proj.amount_raised >= proj.cost) {
    proj.status = "Pending";
  }
  proj.save();
  return proj;
};

// write a static method to get 10 random projects
ProjSchema.statics.getProjects = async function () {
  const proj = await this.aggregate([{ $sample: { size: 10 } }]);
  return proj;
};

// write a static method to get all projects of an organization
ProjSchema.statics.getOrganizationProjects = async function (id) {
  const proj = await this.find({ organization: id });
  return proj;
};

// write a static method to get all projects of a user
ProjSchema.statics.getUserProjects = async function (id) {
  const proj = await this.find({ "donations.user_id": id });
  return proj;
};

const ProjModel = mongoose.model("Project", ProjSchema);
module.exports = { ProjModel };
