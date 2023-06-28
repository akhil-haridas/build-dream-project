const jwt = require("jsonwebtoken");
const Client = require("../models/clientModel");

const clientJWT = async (req, res, next) => {
  try {
    const token = req.cookies.jwt.token;
    if (!token) {
      throw new Error("Authentication failed: Token missing");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const user = await Client.findById(decodedToken.id);

    if (!user) {
      throw new Error("Authentication failed: User not found");
    }

    if (user.block) {
      throw new Error("Authentication failed: User is blocked");
    }

    req.userID = decodedToken.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = clientJWT;
