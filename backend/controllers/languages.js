const Language = require("../models/languages");

const addLanguage = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - Missing data",
    });
  }
  try {
    const new_language = await Language.create({
      name: name,
    });
    res.status(200).json({
      status: "OK",
      language: new_language,
    });
  } catch (error) {
    res.status(400).json({
      state: "Error",
      error: error,
    });
  }
};

const deleteLanguage = (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - Missing data",
    });
  }
  Language.destroy({
    where: { id: id },
  }).then((result) => {
    res.status(200).json({
      status: "OK",
      data: [],
    });
  });
};

const updateLanguage = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - Missing data",
    });
  }
  try {
    const language = await Language.findByPk(id);
    if (!language) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - Language does not exist",
      });
    }
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - Missing data",
      });
    }
    await language.update({
      name: name,
    });
    res.status(200).json({
      status: "OK",
      language: language,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

const getLanguages = async (req, res) => {
  try {
    const languages = await Language.findAll({
      attributes: ["id", "name"],
    });
    res.status(200).json({
      status: "OK",
      languages: languages,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

const llenarLanguages = async (req, res) => {
  const Languages = [
    "javascript",
    "python",
    "c",
    "aes",
    "apex",
    "azcli",
    "bat",
    "bicep",
    "cameligo",
    "clojure",
    "coffeescript",
    "cpp",
    "csharp",
    "csp",
    "css",
    "cypher",
    "dart",
    "dockerfile",
    "ecl",
    "elixir",
    "flow9",
    "freemarker2",
    "fsharp",
    "go",
    "graphql",
    "handlebars",
    "hcl",
    "html",
    "ini",
    "java",
    "json",
    "julia",
    "kotlin",
    "less",
    "lexon",
    "liquid",
    "lua",
    "m3",
    "markdown",
    "mips",
    "msdax",
    "mysql",
    "objective-c",
    "pascal",
    "pascaligo",
    "perl",
    "pgsql",
    "php",
    "pla",
    "plaintext",
    "postiats",
    "powerquery",
    "powershell",
    "proto",
    "pug",
    "qsharp",
    "r",
    "razor",
    "redis",
    "redshift",
    "restructuredtext",
    "ruby",
    "rust",
    "sb",
    "scala",
    "scheme",
    "scss",
    "shell",
    "sol",
    "sparql",
    "sql",
    "st",
    "swift",
    "systemverilog",
    "tcl",
    "twig",
    "typescript",
    "vb",
    "verilog",
    "xml",
    "yaml",
    "Plain text",
  ];
  try {
    for (let i = 0; i < Languages.length; i++) {
      const language = await Language.create({
        name: Languages[i],
      });
    }
    res.status(200).json({
      status: "OK",
      data: [],
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

module.exports = {
  addLanguage: addLanguage,
  deleteLanguage: deleteLanguage,
  updateLanguage: updateLanguage,
  getLanguages: getLanguages,
  llenarLanguages: llenarLanguages,
};
