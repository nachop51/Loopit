const Loop = require("../models/loops");
const Language = require("../models/languages");

// Creados: - Agregar un loop
//          - Eliminar un loop
// Falta: - Update a loop

const addLoop = (req, res) => {
  const { name, description, content, language_id, filename, user_id } =
    req.body;
  if (
    !name ||
    !description ||
    !content ||
    !language_id ||
    !filename ||
    !user_id
  ) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - Missing data",
    });
  }
  Loop.create({
    name: name,
    description: description,
    content: content,
    language_id: language_id,
    filename: filename,
    user_id: user_id,
  })
    .then((loops) => {
      res.status(200).json({
        state: "Added",
        data: loops.dataValues,
      });
    })
    .catch((error) => {
      let errorBD = error.fields;
      if (errorBD[0] === "user_id") {
        res.status(400).json({
          status: "Error",
          error: "Bad Request - This user does not exist",
        });
      } else if (errorBD[0] === "language_id") {
        res.status(400).json({
          status: "Error",
          error: "Bad Request - This language does not exist",
        });
      } else {
        res.status(400).json({
          status: "Error",
          error: error,
        });
      }
    });
};

const deleteLoop = (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - missing data",
    });
  }
  Loop.destroy({
    where: { id: id },
  }).then((results) => {
    res.status(200).json({
      status: "OK",
      data: [],
    });
  });
};

const updateLoop = (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - missing data",
    });
  }
  delete req.body.id;
  delete req.body.user_id;
  Loop.update(req.body, {
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

const getLoops = (req, res) => {
  Loop.findAll({
    include: [
      {
        model: Language,
        as: "language",
        attributes: ["name"],
      },
    ],
  })
    .then((loops) => {
      res.status(200).json({
        status: "OK",
        loops: loops,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: "Error",
        error: error,
      });
    });
};

const getLoopsByLanguage = (req, res) => {
  const { language } = req.body;
  if (!language) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - Missing data",
    });
  }
  Loop.findAll({
    include: [
      {
        model: Language,
        as: "language",
        attributes: ["name"],
        where: { name: language },
      },
    ],
  })
    .then((loops) => {
      res.status(200).json({
        status: "OK",
        loops: loops,
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
  addLoop: addLoop,
  deleteLoop: deleteLoop,
  updateLoop: updateLoop,
  getLoops: getLoops,
  getLoopsByLanguage: getLoopsByLanguage,
};
