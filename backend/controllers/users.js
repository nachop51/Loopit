const User = require("../models/users");
const Loop = require("../models/loops");
const Language = require("../models/languages");
const Save = require("../models/saves");
const Follower = require("../models/followers");
const Like = require("../models/likes");
const { sequelize } = require("../database/db");
const { key } = require("../config");
const jwt = require("jsonwebtoken");

// Falta: - Agregar metodo para buscar usuarios por username
//        - Metodo para eliminar usuarios

const me = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(301).json({
      status: "error",
      error: "Bad Request - Missing data",
    });
  }
  try {
    const token_decode = await jwt.verify(token, key);
    const user = await User.findByPk(token_decode.userId, {
      attributes: ["email", "full_name"],
    });
    if (!user) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - User does not exist",
      });
    }
    const countLoops = await Loop.count({
      where: { user_id: token_decode.userId },
    });
    const countSaves = await Save.count({
      where: { user_id: token_decode.userId },
    });
    res.status(200).json({
      status: "OK",
      me: {
        data: user,
        loops: countLoops,
        saves: countSaves,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      error: error,
    });
  }
};

const getUsers = async (req, res) => {
  let { username, limit, page } = req.query;
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  let dicUsername = {};
  if (!page) page = 1;
  if (!limit) limit = 10;
  if (username) {
    dicUsername = {
      limit: limit,
      offset: page * limit - limit,
      where: {
        username: username,
      },
      attributes: ["id", "username", "email", "full_name"],
    };
  } else {
    dicUsername = {
      limit: limit,
      offset: page * limit - limit,
      attributes: ["id", "username", "email", "full_name"],
    };
  }
  try {
    const users = await User.findAll(dicUsername);
    if (!users) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - User does not exist",
      });
    }
    delete dicUsername.limit;
    delete dicUsername.offset;
    delete dicUsername.attributes;
    const countUsername = await User.count(dicUsername);
    const totalPages = Math.ceil(countUsername / limit);
    res.status(200).json({
      status: "OK",
      pages: {
        now: page,
        total: totalPages,
      },
      users: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      error: error,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - missing data",
    });
  }
  try {
    const { full_name, email, username } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({
        status: "Error",
        Error: "Bad Request - User does not exist",
      });
    }
    if (full_name) {
      user.full_name = full_name;
    }
    if (email) {
      const emailExist = await User.findOne({
        where: { email: email },
      });
      if (emailExist) {
        return res.status(400).json({
          status: "Error",
          error: "Bad Request - Username already exist",
        });
      }
      user.email = email;
    }
    if (username) {
      const userExist = await User.findOne({
        where: { username: username },
      });
      if (userExist) {
        return res.status(400).json({
          status: "Error",
          error: "Bad Request - Username already exist",
        });
      }
      user.username = username;
    }
    await user.save();
    res.status(200).json({
      status: "OK",
      user: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      Error: error,
    });
  }
};

const getUserByusername = async (req, res) => {
  const username = req.params.username;
  if (!username) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - Missing data",
    });
  }
  try {
    console.log("hola");
    const user = await User.findAll({
      where: { username: username },
      attributes: ["id", "username", "email", "full_name"],
    });
    if (!user) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - User does not exist",
      });
    }
    const countSave = await Save.count({
      where: { user_id: user[0].id },
    });
    const countLoop = await Loop.count({
      where: { user_id: user[0].id },
    });
    res.status(200).json({
      status: "OK",
      user: {
        personal_info: user[0],
        loops: countLoop,
        saves: countSave,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      error: error,
    });
  }
};

const getSaveUser = async (req, res) => {
  const token = req.cookies.token;
  let { limit, page } = req.query;
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  if (!page) page = 1;
  if (!limit) limit = 10;
  try {
    const token_decode = await jwt.verify(token, key);
    const id_user = token_decode.userId;
    const data = await sequelize.query(
      "SELECT Saves.loop_id,Loops.name, Loops.description, Loops.content, Loops.filename ,Users.username, Loops.create_at, Loops.update_at, Languages.name as language_name FROM Saves JOIN Loops ON Saves.loop_id = Loops.id JOIN Users ON Saves.user_id = Users.id JOIN Languages ON Languages.id = Loops.language_id WHERE Saves.user_id = ?;",
      {
        limit: limit,
        offset: page * limit - limit,
        replacements: [id_user],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (!data) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - No loops saved by the user yet",
      });
    }
    const countSaves = await Save.count({
      where: { user_id: id_user },
    });
    const totalPages = Math.ceil(countSaves / limit);
    const listloops = [];
    for (let i of data) {
      const loop = {
        id: i.loop_id,
        name: i.name,
        description: i.description,
        content: i.content,
        filename: i.filename,
        create_at: i.create_at,
        user: {
          username: i.username,
        },
        language: {
          name: i.language_name,
        },
      };
      listloops.push(loop);
    }
    return res.status(200).json({
      status: "OK",
      pages: {
        now: page,
        total: totalPages,
      },
      loops: listloops,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

const getFollowersByUser = async (req, res) => {
  const { id } = req.params;
  let { limit, page } = req.query;
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  if (!page) page = 1;
  if (!limit) limit = 10;
  if (!id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - Missing data",
    });
  }
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - User does not exist",
      });
    }
    const data = await sequelize.query(
      "SELECT Users.id, Users.username, Users.email, Users.full_name FROM Followers JOIN Users ON Followers.user_id = Users.id WHERE Followers.user_id = ?;",
      {
        limit: limit,
        offset: page * limit - limit,
        replacements: [id],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (!data) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - followers empty",
      });
    }
    const countFollowers = await Follower.count({
      where: { user_id: id },
    });
    const totalPages = Math.ceil(countFollowers / limit);
    return res.status(200).json({
      status: "OK",
      pages: {
        now: page,
        total: totalPages,
      },
      followers: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

const getLikesByUser = async (req, res) => {
  const token = req.cookies.token;
  let { limit, page } = req.query;
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  if (!page) page = 1;
  if (!limit) limit = 10;
  try {
    const token_decode = await jwt.decode(token, key);
    const id_user = token_decode.userId;
    const data = await sequelize.query(
      "SELECT Loops.id, Loops.name, Loops.description, Loops.content, Loops.filename, Users.username, Loops.create_at, Loops.update_at, Languages.name as language_name FROM Likes JOIN Loops ON Likes.loop_id = Loops.id JOIN Users ON Loops.user_id = Users.id JOIN Languages ON Languages.id = Loops.language_id WHERE Likes.user_id = ?;",
      {
        limit: limit,
        offset: page * limit - limit,
        replacements: [id_user],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (!data) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - No loops liked by the user yet",
      });
    }
    const countLikes = await Like.count({
      where: { user_id: id_user },
    });
    const totalPages = Math.ceil(countLikes / limit);
    const listloops = [];
    for (let i of data) {
      const loop = {
        id: i.loop_id,
        name: i.name,
        description: i.description,
        content: i.content,
        filename: i.filename,
        create_at: i.create_at,
        user: {
          username: i.username,
        },
        language: {
          name: i.language_name,
        },
      };
      listloops.push(loop);
    }
    res.status(200).json({
      status: "OK",
      pages: {
        now: page,
        total: totalPages,
      },
      loops: listloops,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

// Here we export the module, in order to use it in routes/routeUser
module.exports = {
  me: me,
  updateUser: updateUser,
  getUsers: getUsers,
  getSaveUser: getSaveUser,
  getUserByusername: getUserByusername,
  getFollowersByUser: getFollowersByUser,
  getLikesByUser: getLikesByUser,
};
