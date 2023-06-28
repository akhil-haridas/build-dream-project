const jwt = require("jsonwebtoken");

const authJWT = (req, res, next) => {
  try {
    const token = req.cookies.jwt.token;
    if (!token) {
      throw new Error("Authentication failed");
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = authJWT;
