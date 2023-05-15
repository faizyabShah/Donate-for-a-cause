const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
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
    rank: {
      type: String,
    },
    wallet: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

// static methods

UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Email and password are required");
  }

  const user = await this.findOne({ email });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

UserSchema.statics.signup = async function (
  name,
  contact,
  location,
  email,
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

  const user = await this.findOne({ email });
  if (user) {
    throw Error("Email already in use. Please try another email");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await this.create({
    name,
    contact,
    location,
    email,
    rank: "0",
    password: hashedPassword,
  });
  return newUser;
};

// write a static function to edit user information
UserSchema.statics.editUser = async function (
  id,
  name,
  contact,
  location,
  oldPassword,
  password
) {
  if (!name || !contact || !location || !oldPassword || !password) {
    throw Error("All fields are required");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password must be at least 8 characters long");
  }

  const user = await this.findOne({ _id: id });
  if (user) {
    const match = await bcrypt.compare(oldPassword, user.password);
    if (match) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const updatedUser = await this.findByIdAndUpdate(
        user._id,
        {
          name,
          contact,
          location,
          password: hashedPassword,
        },
        { new: true }
      );
      return updatedUser;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

let User = mongoose.model("User", UserSchema);
module.exports = { User };
