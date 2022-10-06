const Loop = require("../models/loops");

// Creados: - Agregar un loop
//          - Eliminar un loop
// Falta: - Update a loop

const addLoop = (req, res) => {
  const { name, description, content, languages, filename, user_id } = req.body;
  if (
    !name ||
    !description ||
    !content ||
    !languages ||
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
    languages: languages,
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
      let errorBD = error.parent.errno;
      if (errorBD === 1452) {
        res.status(400).json({
          status: "Error",
          error: "Bad Request - This user does not exist",
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

module.exports = {
  addLoop: addLoop,
  deleteLoop: deleteLoop,
  updateLoop: updateLoop,
};
