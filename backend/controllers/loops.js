const Loop = require("../models/loops");
const Languages_loops = require("../models/languages");
const User = require("../models/users");
const { where } = require("sequelize");

// Creados: - Agregar un loop
//          - Eliminar un loop
// Falta: - Update a loop

const addLoop = async (req, res) => {
  const { name, description, content, language_name, filename, user_id } =
    req.body;
  if (
    !name ||
    !description ||
    !content ||
    !language_name ||
    !filename ||
    !user_id
  ) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - Missing data",
    });
  }
  try{
    const new_loop = await Loop.create({
      name: name,
      description: description,
      content: content,
      filename: filename,
      user_id: user_id,
    });
    const add_languages_loop = await Languages_loops.create({
      name_language: language_name,
      loop_id: new_loop.id,
    });
    return res.status(200).json({
      status: "OK",
      loop: new_loop,
    });
  }catch(error){
      // let errorBD = error.fields;
      // if (errorBD[0] === "user_id") {
      //   res.status(400).json({
      //     status: "Error",
      //     error: "Bad Request - This user does not exist",
      //   });
      // } else {
        res.status(400).json({
          status: "Error",
          error: error,
        });
      }
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

const getLoops = async (req, res) => {
  const { language } = req.params;
  if (language) {
    try {
      const response  = await   Loop.findAll({
        attributes: ["id", "name", "description", "content", "filename"],
        include: [
          {
            model: Languages_loops,
            as: "language",
            attributes: ["name"],
            where: { name: language },
          },
          {
            model: User,
            as: "user",
            attributes: ["username"],
          },
        ],
      });
      return res.status(200).json({
        status: "OK",
        loops: response,
      });
    } catch (error) {
      return res.status(400).json({
        status: "Error",
        error: error,
      });
    }
  }
  Loop.findAll({
    attributes: ["id", "name", "description", "content", "filename"],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["username"],
      }
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


const searchLoops = async (req, res) => {
  const { search } = req.params;
  if (!search) {
    res.status(400).json({
      status: "Error",
      error: "Bad Request - missing data",
    });
  }
  try {
    const response = await Loop.findAll({
      attributes: ["id", "name", "description", "content", "filename"],
    },
    {
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
        ]
      }
  });    
  } catch (error) {
    res.status(400).json({
      status: "Error",
      error: error,
    });
  }
}

module.exports = {
  addLoop: addLoop,
  deleteLoop: deleteLoop,
  updateLoop: updateLoop,
  getLoops: getLoops,
  searchLoops: searchLoops,
};
