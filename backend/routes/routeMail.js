const routeMail = require("express").Router();
const { sendMail } = require("../controllers/mail");

routeMail.post("/send", sendMail);

module.exports = routeMail;