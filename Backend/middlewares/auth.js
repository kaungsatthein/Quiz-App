require("dotenv").config();

const jwt = require("jsonwebtoken");
const User = require("../models/User");

function auth(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedValue) => {
      if (err) {
        return res.status(401).json({ message: "unauthenticated" });
      } else {
        User.findById(decodedValue._id).then((user) => {
          req.user = user;
          next();
        });
      }
    });
  } else {
    return res.status(400).json({ message: "token need to provide" });
  }
}

module.exports = { auth };
