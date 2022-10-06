const jwt = require("jsonwebtoken");
const key = require("../config").key;

//verify acces token and allow or deny access to the route
const verifytoken = (req, res, next) => {
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
      req.user = verificar;
      next();
    } catch (error) {
      return res.status(401).json({ error: "Access denied, invalid token" });
    }
  }
};

module.exports = verifytoken;
