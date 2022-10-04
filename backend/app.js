const express = require("express");
const app = express();
const cors = require("cors");
const routeAuth = require("./routes/routeAuth");
const routeUser = require("./routes/routeUser");
const routeLoop = require("./routes/routeLoops");
const verifytoken = require("./middleware/verifytoken");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./.env" });
//imports models
const { sequelize } = require("./database/db");
require("./models/asociations");
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
    credentials: true,
  })
); //permito que mi api pueda usarse por un cliente mas alla del localhost

//rutes
app.use("/auth", routeAuth);
app.use("/user", routeUser);
app.use("/loop", routeLoop);

app.listen(3000, () => {
  sequelize.sync({ force: false }).then(() => {
    console.log("base de datos creada");
  });
  console.log("andando");
});
