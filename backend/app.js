const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/routes");
const verifytoken = require("./middleware/verifytoken");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./.env" });
const port = process.env.PORT;

//middlewares
app.use(cookieParser());
app.use("/", verifytoken);
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //logro que express entienda las request con body en json, ya que express no parsea el body
app.use(cors()); //permito que mi api pueda usarse por un cliente mas alla del localhost
app.use("/", router);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("andando");
});
