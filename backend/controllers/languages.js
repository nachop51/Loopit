const Language = require("../models/languages");

const addLanguage = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({
            status: "Error",
            error: "Bad Request - Missing data",
        });
    }
    Language.create({ name:name })
      .then((languages) => {
        res.status(200).json({
            state: "Added",
            data: languages.dataValues,
        });
      })
      .catch((error) => {
        res.status(400).json({
            state: "Error",
            error: error,
        });
      }):
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

const updateLanguage = (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({
            status: "Error",
            error: "Bad Request - Missing data",
        });
    }
    delete req.body.id;
    Language.update(req.body, {
        where: { id: id },
    })
      .then((results) => {
        res.status(200).json({
            status: "OK",
            data: [],
        });
      })
      .catch((error) => {
        res.status(400).json({
            status: "Error",
            error: error,
        });
      });
};



module.exports = {
    addLanguage: addLanguage,
    deleteLanguage: deleteLanguage,
    updateLanguage: updateLanguage,
};
