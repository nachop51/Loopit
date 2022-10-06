const routeLanguages = require("express").Router();
const {
  addLanguage,
  deleteLanguage,
  updateLanguage,
} = require("../controllers/languages");

//define routes for languages
routeLanguages.post("/add", addLanguage);
routeLanguages.delete("/delete", deleteLanguage);
routeLanguages.put("/update", updateLanguage);

module.exports = routeLanguages;
