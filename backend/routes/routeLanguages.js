const routeLanguages = require("express").Router();
const {
  addLanguage,
  deleteLanguage,
  updateLanguage,
  getLanguages,
} = require("../controllers/languages");

//define routes for languages
routeLanguages.post("/add", addLanguage);
routeLanguages.delete("/delete", deleteLanguage);
routeLanguages.put("/update", updateLanguage);
routeLanguages.get("/all", getLanguages);

module.exports = routeLanguages;
