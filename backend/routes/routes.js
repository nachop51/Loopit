const router = require("express").Router();
const conexion = require("../database/db");
const users = require("../controllers/users");
const usuarios = require("../sequelize/models/usuarios");
const auth = require("../controllers/auth");

router.post("/register", users.register);
router.post("/login", users.login);
router.post("/updatepass", users.updatePass);
module.exports = router;
