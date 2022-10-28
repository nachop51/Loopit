const jwt = require("jsonwebtoken");
const key = process.env.KEY;
const User = require("../models/users");
const Admin = require("../models/admins");

//verify acces token and allow or deny access to the route
const verifytoken = async (req, res, next) => {
  if (
    req.url === "/auth/login" ||
    req.url === "/auth/register" ||
    req.url === "/auth/verify" ||
    req.url === "/auth/logout" ||
    req.url === "/loops/public"
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
      // if (req.url === "/admin/add" || req.url === "/admin/delete") {
      //   const adminOrNot = await Admin.findByPk(user_id);
      //   if (!adminOrNot) {
      //     return res
      //       .status(401)
      //       .json({ error: "Access denied, bad permissions" });
      //   }
      //   next();
      // } else {
      req.id = user_id;
      next();
      // }
    } catch (error) {
      return res.status(401).json({ error: "Access denied, invalid token" });
    }
  }
};

module.exports = verifytoken;
