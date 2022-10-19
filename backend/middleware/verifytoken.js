const jwt = require("jsonwebtoken");
const key = require("../config").key;
const User = require("../models/users");

//verify acces token and allow or deny access to the route
const verifytoken = async (req, res, next) => {
  if (
    req.url === "/auth/login" ||
    req.url === "/auth/register" ||
    req.url === "/auth/verify"
  ) {
    next();
  } else {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Access denied" });
    }
    try {
      const verificar = jwt.verify(token, key);
      const token_decode = jwt.decode(token, key);
      const user_id = token_decode.userId;
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(401).json({ error: "Access denied, invalid token" });
      }
      next();
    } catch (error) {
      return res.status(401).json({ error: "Access denied, invalid token" });
    }
  }
};

module.exports = verifytoken;
