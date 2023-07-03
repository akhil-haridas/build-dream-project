const jwt = require("jsonwebtoken");

const authJWT = (req, res, next) => {
  try {
    const token = req.cookies.jwt.token;
    if (!token) {
      throw new Error("Authentication failed");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    if(decodedToken.role === 'admin'){
      next();
    } else {
      throw new Error("Authentication failed");
    }
    
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = authJWT;
