const mongoose = require("mongoose");
import { projModel } from "./projModel";
import { User } from "./userModel";

const OrgSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    picture: {
      type: String,
      required: true,
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: projModel,
      },
    ],
    fund: [
      {
        userID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: User,
        },
        amount: {
          type: Number,
        },
      },
    ],
  },
  { timeStamps: true }
);

OrgSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Email and password are required.");
  }

  const org = await this.findOne({ email });
  if (org) {
    const match = await bcrypt.compare(password, org.password);
    if (match) {
      return org;
    }
    throw Error("Incorrect password.");
  }
  throw Error("Incorrect email.");
};

OrgSchema.statics.signup = async function (
  name,
  description,
  phone,
  location,
  email,
  picture,
  projects,
  fund,
  password
) {
  if (!email || !password) {
    throw Error("Email and password are required");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password must be at least 8 characters long");
  }

  const org = await this.findOne({ email });
  if (org) {
    throw Error("Email already in use. Please try another email");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newOrg = await this.create({
    name,
    password: hashedPassword,
    description,
    phone,
    location,
    email,
    picture,
    projects,
    fund,
  });
  return newOrg;
};

const Organization = mongoose.model("Organization", OrgSchema);

module.exports = { Organization };
