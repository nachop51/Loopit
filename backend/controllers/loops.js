const Loop = require("../models/loops");
const Language = require("../models/languages");
const User = require("../models/users");
const Save = require("../models/saves");
const Like = require("../models/likes");
const Comment = require("../models/comments");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { sequelize } = require("../database/db");

const addLoop = async (req, res) => {
  const { name, description, content, language, filename } = req.body;
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
    const user_id = req.id;
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
        "count_likes",
        "count_comments",
        "count_saves",
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
    ////////////////////////////////////////
    const user_id = req.id;
    const likesUser = await Like.findAll({
      where: { user_id: user_id },
      attributes: ["loop_id"],
    });
    const savesUser = await Save.findAll({
      where: { user_id: user_id },
      attributes: ["loop_id"],
    });
    //this part check if the user has liked or saved the loop
    const idLikes = likesUser.map((like) => like.loop_id);
    const idSaves = savesUser.map((save) => save.loop_id);
    const id_loops = loops.map((loop) => {
      return loop.dataValues.id;
    });
    const ifLike = idLikes.filter((value) => id_loops.includes(value));
    const ifSave = idSaves.filter((value) => id_loops.includes(value));
    const loopsData = loops.map((loop) => {
      if (ifLike.includes(loop.dataValues.id)) {
        loop.dataValues.like = true;
      } else {
        loop.dataValues.like = false;
      }
      if (ifSave.includes(loop.dataValues.id)) {
        loop.dataValues.save = true;
      } else {
        loop.dataValues.save = false;
      }
      return true;
    });
    // //total number of loops for pagination
    const countLoops = await Loop.count({
      include: [dicUsername, dicLanguage],
    });
    //////////////////////////////////
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
    const looop = await Loop.findByPk(loop_id, {
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
    const user_id = req.id;
    const LikeOrNone = await Like.findOne({
      where: { loop_id: loop_id, user_id: user_id },
    });
    const SaveOrNone = await Save.findOne({
      where: { loop_id: loop_id, user_id: user_id },
    });
    let like = false;
    let save = false;
    if (LikeOrNone) {
      like = true;
    }
    if (SaveOrNone) {
      save = true;
    }
    looop.dataValues.Comments = comments;
    return res.status(200).json({
      status: "OK",
      loop: looop,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

const loopsMoreLiked = async (req, res) => {
  try {
    const loops = await Loop.findAll({
      order: [["count_likes", "DESC"]],
      limit: 5,
      attributes: [
        "id",
        "name",
        "description",
        "count_likes",
        "count_comments",
        "count_saves",
        "created_at",
      ],
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
    if (!loops) {
      return res.status(400).json({
        status: "Error",
        error: "Loop list is empty",
      });
    }
    return res.status(200).json({
      status: "OK",
      loops: loops,
    });
  } catch (error) {
    return res.status(400).json({
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
  loopsMoreLiked: loopsMoreLiked,
};
