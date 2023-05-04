const { User } = require("../models/olduserModel");

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const user = await User.findById(id);

  if (!user) {
    res.status(404).json({ msg: "User not found" });
  }

  res.status(200).json(user);
};

const createUser = async (req, res) => {
  const { name, contact, location, email, password } = req.body;

  try {
    const user = await User.create({
      id,
      name,
      contact,
      location,
      email,
      password,
    });
    res.status(201).json({ user });
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    User.findByIdAndDelete({ _id: id });
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (err) {
    return res.status(404).json({ msg: "User not found" });
  }
};

const updateUser = async (req, res) => {
  const { id, name, contact, location, email, password } = req.body;

  let user;
  try {
    //find user from database
    user = await User.findById(id);
  } catch (err) {
    return res.status(404).json({ msg: "User not found" });
  }

  try {
    //update user
    user.name = name || user.name;
    user.contact = contact || user.contact;
    user.location = location || user.location;
    user.email = email || user.email;
    user.password = password || user; //encrypt password

    await user.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Incorrect data" });
  }

  res.status(200).json({ user });
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
};
