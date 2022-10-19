const routeLanguages = require("express").Router();
const {
  addLanguage,
  deleteLanguage,
  updateLanguage,
  getLanguages,
  llenarLanguages,
} = require("../controllers/languages");

//define routes for languages
routeLanguages.post("/add", addLanguage);
routeLanguages.delete("/delete", deleteLanguage);
routeLanguages.put("/update/:id", updateLanguage);
routeLanguages.get("/all", getLanguages);
routeLanguages.get("/llenar", llenarLanguages);

module.exports = routeLanguages;
