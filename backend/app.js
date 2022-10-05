//init of express app
const express = require("express");
const app = express();
//import cors to allow cross origin resource sharing
const cors = require("cors");
//import routes from routes folder
const routeAuth = require("./routes/routeAuth");
const routeUser = require("./routes/routeUser");
const routeLoop = require("./routes/routeLoops");
//import middleware that will be used in the app for authentication of tokens
const verifytoken = require("./middleware/verifytoken");
//import cookie parser to parse cookies
const cookieParser = require("cookie-parser");
//import detenv to use environment variables
require("dotenv").config({ path: "./.env" });
//imports models of sequelize
const { sequelize } = require("./database/db");
require("./models/asociations.js");
const { User } = require("./models/users");
const { Loop } = require("./models/loops");

const port = process.env.PORT;

//middlewares
app.use(cookieParser());
app.use("/", verifytoken);
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //logro que express entienda las request con body en json, ya que express no parsea el body
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
); //permito que mi api pueda usarse por un cliente mas alla del localhost

//define routes of the app
app.use("/auth", routeAuth);
app.use("/user", routeUser);
app.use("/loop", routeLoop);

app.listen(3000, () => {
  sequelize.sync().then(() => {
    console.log("base de datos creada");
  });
  console.log("andando");
});
