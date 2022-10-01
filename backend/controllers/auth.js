const conexion = require("../database/db");
const key = require("../config").key;
const jwt = require("jsonwebtoken");

const auth = async (req, res) => {
  try {
    const token = req.header("auth-token");
    if (!token)
      return res.status(401).json({
        error: "Access denied",
      });
    const verified = jwt.verify(token, key);
    req.user = verified;
    res.status(200).json({
      state: "autorizado",
    });
  } catch (error) {
    res.status(400).json({
      state: "no autorizado",
    });
  }
};
