//init of express app
const express = require("express");
const app = express();
//import cors to allow cross origin resource sharing
const cors = require("cors");
//import routes from routes folder
const routeAuth = require("./routes/routeAuth");
const routeUser = require("./routes/routeUser");
const routeLoop = require("./routes/routeLoops");
const routeFavorite = require("./routes/routeFavorites");
const routeLanguages = require("./routes/routeLanguages");
//import middleware that will be used in the app for authentication of tokens
const verifytoken = require("./middleware/verifytoken");
//import cookie parser to parse cookies
const cookieParser = require("cookie-parser");
//import detenv to use environment variables
require("dotenv").config({ path: "./.env" });
//imports config file for database connection and sequelize
const { sequelize } = require("./database/db");
//import models from models folder and associate them
require("./models/asociations.js");
const { User } = require("./models/users");
const { Loop } = require("./models/loops");

const port = process.env.PORT;

//middlewares
app.use(cookieParser());
app.use("/", verifytoken);
app.use(express.urlencoded({ extended: false }));
//parse date request to json and append it to req.body
app.use(express.json());
//config cors for allow cross origin resource sharing for origin localhost:3001 with credentials
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

//define routes of the app
app.use("/auth", routeAuth);
app.use("/user", routeUser);
app.use("/loop", routeLoop);
app.use("/favorite", routeFavorite);
app.use("/language", routeLanguages);

//sync database and start server
app.listen(3000, () => {
  sequelize.sync().then(() => {
    console.log("base de datos creada");
  });
  console.log("andando");
});
