const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, {
    expiresIn: "2h",
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const signupUser = async (req, res) => {
  const { name, contact, location, email, password } = req.body;

  try {
    const user = await User.signup(name, contact, location, email, password);
    const token = createToken(user._id);

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const getUserInfo = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET_KEY);
    try {
      const user = await User.findById(_id);
      res.status(200).json({ user, token });
    } catch (err) {
      res.status(400).send({ msg: "Invalid token for a user." });
    }
  } catch (err) {
    res.status(400).json({ msg: "Token not worth it bro." });
  }
};

const _editUser = async (req, res) => {
  const { name, contact, location, oldPassword, password } = req.body;
  try {
    const user = await User.editUser(
      req.user._id,
      name,
      contact,
      location,
      oldPassword,
      password
    );
    const token = createToken(user._id);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const getUserWallet = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      req.status(400).json({ msg: "User not found" });
    }
    res.status(200).json({ wallet: user.wallet });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const addUserWallet = async (req, res) => {
  const { amount } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      req.status(400).json({ msg: "User not found" });
    }
    user.wallet += parseInt(amount);
    await user.save();
    res.status(200).json({ wallet: user.wallet });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
  getUserInfo,
  _editUser,
  getUserWallet,
  addUserWallet,
};
