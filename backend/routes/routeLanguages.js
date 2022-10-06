const routeLanguages = require("express").Router();
const addFavorite = require("../controllers/languages");

//define routes for languages
routeLanguages.post("/addLanguage", addLanguage);
routeLanguages.delete("/deleteLanguage", deleteLanguage);
routeLanguages.update("/updateLanguage", updateLanguage);

module.exports = routeLanguages;
