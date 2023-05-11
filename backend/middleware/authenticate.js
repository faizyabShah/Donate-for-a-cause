const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ msg: "You must be logged in." });
  }
  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = { _id: decoded._id };
    console.log("authenticated");
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Request not authorized." });
  }
};
module.exports = authenticate;
