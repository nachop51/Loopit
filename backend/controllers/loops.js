const Loop = require("../models/loops");
const Language = require("../models/languages");
const User = require("../models/users");
const Save = require("../models/saves");
const Like = require("../models/likes");
const { Op } = require("sequelize");
const { url } = require("inspector");
const jwt = require("jsonwebtoken");
const { key } = "../config";

const addLoop = async (req, res) => {
  const { name, description, content, language, filename, user_id } = req.body;
  if (!name || !content || !language || !user_id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - Missing data",
    });
  }
  try {
    const language_id = await Language.findOne({
      where: { name: language },
    });
    if (!language_id) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - Language does not exist",
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
  } catch (error) {
    res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

const deleteLoop = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - missing data",
    });
  }
  try {
    const loop_destroy = await Loop.findByPk(id);
    if (!loop_destroy) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - loop does not exist",
      });
    }
    await loop_destroy.destroy();
    const favorite_destroy = await Save.destroy({
      where: { loop_id: id },
    });
    res.status(200).json({
      status: "OK",
      data: [],
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

const updateLoop = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - missing data",
    });
  }
  try {
    const loop = await Loop.findByPk(id);
    if (!loop) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - Loop does not exist",
      });
    }
    const { name, description, content, language, filename, user_id } =
      req.body;
    if (name) {
      loop.name = name;
    }
    if (description) {
      loop.description = description;
    }
    if (content) {
      loop.content = content;
    }
    if (language) {
      const language_id = await Language.findOne({
        where: { name: language },
      });
      if (!language_id) {
        return res.status(400).json({
          status: "Error",
          error: "Bad Request - Language does not exist",
        });
      }
      loop.language_id = language_id.id;
    }
    if (filename) {
      loop.filename = filename;
    }
    if (user_id) {
      const user = await User.findBypk(user_id);
      if (!user) {
        return res.status(400).json({
          status: "Error",
          error: "Bad Request - User does not exist",
        });
      }
      loop.user_id = user_id;
    }
    await loop.save();
    res.status(200).json({
      status: "OK",
      loop: loop,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

const getLoopsbyID = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - missing data",
    });
  }
  try {
    const response = await Loop.findAll({
      where: { id: id },
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
};

const getLoops = async (req, res) => {
  let { page, limit, language, username } = req.query;
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  let dicLanguage = {};
  let dicUsername = {};
  if (!page) page = 1;
  if (!limit) limit = 10;
  if (!language) {
    dicLanguage = {
      model: Language,
      as: "language",
      attributes: ["name"],
    };
  } else {
    dicLanguage = {
      model: Language,
      as: "language",
      attributes: ["name"],
      where: { name: language },
    };
  }
  if (!username) {
    dicUsername = {
      model: User,
      as: "user",
      attributes: ["username"],
    };
  } else {
    dicUsername = {
      model: User,
      as: "user",
      attributes: ["username"],
      where: { username: username },
    };
  }
  try {
    console.log("hola");
    const loops = await Loop.findAll({
      limit: limit,
      offset: page * limit - limit,
      attributes: [
        "id",
        "name",
        "description",
        "content",
        "filename",
        "create_at",
      ],
      include: [dicUsername, dicLanguage],
      order: [["create_at", "DESC"]],
    });
    if (!loops) {
      return res.status(400).json({
        status: "Error",
        error: "Loop list is empty",
      });
    }
    const token = req.cookies.token;
    const token_decode = jwt.decode(token, key);
    const user_id = token_decode.userId;
    const likesUser = await Like.findAll({
      where: { user_id: user_id },
      attributes: ["loop_id"],
    });
    const savesUser = await Save.findAll({
      where: { user_id: user_id },
      attributes: ["loop_id"],
    });
    const countLoops = await Loop.count({
      include: [dicUsername, dicLanguage],
    });
    const totalPages = Math.ceil(countLoops / limit);
    loops.forEach((loop) => {
      loop.dataValues.like = false;
      likesUser.forEach((like) => {
        if (loop.id === like.loop_id) {
          loop.dataValues.like = true;
        } else {
          loop.dataValues.like = false;
        }
      });
    });
    loops.forEach((loop) => {
      loop.dataValues.save = false;
      savesUser.forEach((save) => {
        if (loop.id === save.loop_id) {
          loop.dataValues.save = true;
        } else {
          loop.dataValues.save = false;
        }
      });
    });
    return res.status(200).json({
      status: "OK",
      pages: {
        now: page,
        total: totalPages,
      },
      loops: loops,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      error: error,
    });
  }
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
    const response = await Loop.findAll(
      {
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
          },
        ],
      },
      {
        where: {
          [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
        },
      }
    );
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
};

module.exports = {
  addLoop: addLoop,
  deleteLoop: deleteLoop,
  updateLoop: updateLoop,
  getLoops: getLoops,
  searchLoops: searchLoops,
  getLoopsbyID: getLoopsbyID,
  // getAllLoopsByLanguage: getAllLoopsByLanguage,
};
