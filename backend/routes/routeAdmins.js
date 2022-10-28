const routeAdmin = require("express").Router();
const { addAdmin, deleteAdmin } = require("../controllers/admins");

//define routes for admins
routeAdmin.post("/add/:user_id", addAdmin);
routeAdmin.delete("/delete/:user_id", deleteAdmin);

module.exports = routeAdmin;
