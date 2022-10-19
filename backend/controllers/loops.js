const Loop = require("../models/loops");
const Language = require("../models/languages");
const User = require("../models/users");
const Save = require("../models/saves");
const Like = require("../models/likes");
const Comment = require("../models/comments");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { url } = require("inspector");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../database/db");
const { key } = "../config";

const addLoop = async (req, res) => {
  const { name, description, content, language, filename } = req.body;
  const token = req.cookies.token;
  if (!name || !content || !language) {
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
    const token_decode = jwt.decode(token, key);
    const user_id = token_decode.userId;
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
    const save_destroy = await Save.destroy({
      where: { loop_id: id },
    });
    const comment_destroy = await Comment.destroy({
      where: { loop_id: id },
    });
    const like_destroy = await Like.destroy({
      where: { loop_id: id },
    });
    await loop_destroy.destroy();
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
const getLoops = async (req, res) => {
  let { page, limit, language, username, search, id } = req.query;
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
  if (search) {
    dicSearch = {
      where: { name: { [Op.like]: `%${search}%` } },
    };
  } else {
    if (id) {
      dicSearch = {
        where: { id: id },
      };
    } else {
      dicSearch = {};
    }
  }
  try {
    const loops = await Loop.findAll({
      limit: limit,
      offset: page * limit - limit,
      attributes: [
        "id",
        "name",
        "description",
        "content",
        "filename",
        "created_at",
      ],
      include: [dicUsername, dicLanguage],
      ...dicSearch,
      order: [["created_at", "DESC"]],
    });
    if (!loops) {
      return res.status(400).json({
        status: "Error",
        error: "Loop list is empty",
      });
    }
    //get info of user
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
    //this part check if the user has liked or saved the loop
    loops.forEach((loop) => {
      loop.dataValues.like = false;
      loop.dataValues.save = false;
      for (let a = 0; a < likesUser.length; a++) {
        if (loop.id === likesUser[a].loop_id) {
          loop.dataValues.like = true;
          break;
        } else {
          loop.dataValues.like = false;
        }
      }
      for (let a = 0; a < savesUser.length; a++) {
        if (loop.id === savesUser[a].loop_id) {
          loop.dataValues.save = true;
          break;
        } else {
          loop.dataValues.save = false;
        }
      }
    });
    // in this part we count the number of likes and saves
    for (let i = 0; i < loops.length; i++) {
      const countLikesLoop = await Like.count({
        where: { loop_id: loops[i].id },
      });
      const countSavesLoop = await Save.count({
        where: { loop_id: loops[i].id },
      });
      const countComment = await Comment.count({
        where: { loop_id: loops[i].id },
      });
      loops[i].dataValues.countLikes = countLikesLoop;
      loops[i].dataValues.countSaves = countSavesLoop;
      loops[i].dataValues.countComments = countComment;
    }

    //total number of loops for pagination
    const countLoops = await Loop.count({
      include: [dicUsername, dicLanguage],
    });
    const totalPages = Math.ceil(countLoops / limit);
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

const getLoopComments = async (req, res) => {
  const { loop_id } = req.params;
  if (!loop_id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - missing data",
    });
  }
  try {
    const loop = await Loop.findByPk(loop_id);
    if (!loop) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - Loop does not exist",
      });
    }
    const comments = await sequelize.query(
      "SELECT Comments.id, Comments.content, Users.username, Comments.created_at FROM Comments JOIN Users ON Comments.user_id = Users.id WHERE Comments.loop_id = ? ORDER BY Comments.created_at DESC;",
      {
        replacements: [loop_id],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    const looop = await Loop.findByPk(loop_id);
    const token_decode = jwt.decode(req.cookies.token, key);
    const user_id = token_decode.userId;
    const LikeOrNone = await Like.findOne({
      where: { loop_id: loop_id, user_id: user_id },
    });
    const SaveOrNone = await Save.findOne({
      where: { loop_id: loop_id, user_id: user_id },
    })
    const countLikesLoop = await Like.count({
      where: { loop_id: loop_id },
    });
    const countSavesLoop = await Save.count({
      where: { loop_id: loop_id },
    })
    let like = false;
    let save = false;
    if (LikeOrNone) {
      like = true;
    }
    if (SaveOrNone) {
      save = true;
    }
    return res.status(200).json({
      status: "OK",
      loop: looop,
      like: like,
      save: save,
      countLikes: countLikesLoop,
      countSaves: countSavesLoop,
      comments: comments,
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
  getLoopComments: getLoopComments,
};
