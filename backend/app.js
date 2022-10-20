//init of express app
const express = require("express");
const app = express();
require("dotenv").config({ path: "./.env" });
//import cors to allow cross origin resource sharing
const cors = require("cors");
//import routes from routes folder
const routeAuth = require("./routes/routeAuth");
const routeUser = require("./routes/routeUser");
const routeLoop = require("./routes/routeLoops");
const routeSaves = require("./routes/routeSaves");
const routeLanguages = require("./routes/routeLanguages");
const routeFollower = require("./routes/routeFollowers");
const routeMail = require("./routes/routeMail");
const routeLike = require("./routes/routeLike");
const routeComment = require("./routes/routeComment");
//import middleware that will be used in the app for authentication of tokens
const verifytoken = require("./middleware/verifytoken");
//import cookie parser to parse cookies
const cookieParser = require("cookie-parser");
//import detenv to use environment variables

//imports config file for database connection and sequelize
const { sequelize } = require("./database/db");
//import models from models folder and associate them
require("./models/asociations.js");
const User = require("./models/users");
const Loop = require("./models/loops");
const Language = require("./models/languages");
const Follower = require("./models/followers");
const Save = require("./models/saves");
const Like = require("./models/likes");
const Comment = require("./models/comments");
//import bcrypt to hash passwords

const port = process.env.PORT;

//middlewares
//config cors for allow cross origin resource sharing for origin localhost:3001 with credentials
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api", verifytoken);
//parse date request to json and append it to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/loops", routeLoop);
app.use("/api/auth", routeAuth);
app.use("/api/users", routeUser);
app.use("/api/saves", routeSaves);
app.use("/api/languages", routeLanguages);
app.use("/api/followers", routeFollower);
app.use("/api/mail", routeMail);
app.use("/api/likes", routeLike);
app.use("/api/comments", routeComment);
//verify token
//sync database and start server
app.listen(3000, () => {
  console.log(process.env.KEY);
  sequelize.sync().then(() => {
    console.log("base de datos creada");
  });
  console.log("andando");
});
