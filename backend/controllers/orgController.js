const { Organization } = require("../models/orgModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, {
    expiresIn: "2h",
  });
};

const loginOrg = async (req, res) => {
  const { email, password } = req.body;

  try {
    const org = await Organization.login(email, password);
    const token = createToken(org._id);

    res.status(200).json({ org, token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const signupOrg = async (req, res) => {
  const {
    name,
    password,
    description,
    phone,
    location,
    email,
    picture,
    projects,
    fund,
  } = req.body;

  try {
    const org = await Organization.signup(
      name,
      password,
      description,
      phone,
      location,
      email,
      picture,
      projects,
      fund
    );
    const token = createToken(org._id);

    res.status(201).json({ org, token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const getOrgInfo = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET_KEY);
    try {
      const org = await Organization.findById(_id);
      res.status(200).json({ org, token });
    } catch (err) {
      res.status(400).send({ msg: "Invalid token for an organization." });
    }
  } catch (err) {
    res.status(400).json({ msg: "Token not worth it bro." });
  }
};

const getAllOrgs = async (req, res) => {
  const orgs = await Organization.find();
  res.status(200).json(orgs);
};

module.exports = { loginOrg, signupOrg, getOrgInfo, getAllOrgs };
