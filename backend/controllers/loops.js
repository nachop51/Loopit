const Loop = require("../models/loops");
const Language= require("../models/languages");
const User = require("../models/users");
const { where } = require("sequelize");
const { Op } = require("sequelize");

const addLoop = async (req, res) => {
  const { name, description, content, language, filename, user_id } =
    req.body;
  if (
    !name ||
    !description ||
    !content ||
    !language ||
    !filename ||
    !user_id
  ) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - Missing data",
    });
  }
  try{
    const language_id = await Language.findOne({
      where: { name: language },
    });
    if(!language_id){
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - Language dont exist",
      });
    }
    const new_loop = await Loop.create({
      name: name,
      description: description,
      content: content,
      filename: filename,
      user_id: user_id,
      language_id: language_id.id,
    });
    return res.status(200).json({
      status: "OK",
      loop: new_loop,
    });
  }catch(error){
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
        include: [
          {
            model: User,
            as: "user",
            attributes: ["username"],
          },
          {
            model: Language,
            as: "language",
            attributes: ["name"],
            where: { name: language },
          }
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
    include: [
      {
        model: User,
        as: "user",
        attributes: ["username"],
      },
      {
        model: Language,
        as: "language",
        attributes: ["name"],
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
  console.log(search);
  if (!search) {
    res.status(400).json({
      status: "Error",
      error: "Bad Request - missing data",
    });
  }
  try {
    const response = await Loop.findAll({
      attributes: ["id", "name", "description", "content", "filename"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"],
        },
        {
          model: Language,
          as: "language",
          attributes: ["name"],
        }
      ],
    },
    {
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
        ],
      },
    });
  res.status(200).json({
    status: "OK",
    loops: response,
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
