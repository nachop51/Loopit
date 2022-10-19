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
    const token_decode = await jwt.decode(token, key);
    const user_id = token_decode.userId;
    const user = await User.findByPk(user_id, {
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
    const countFollowings = await Follower.count({
      where: { user_id: user_id },
    });
    const countFollowers = await Follower.count({
      where: { follow_id: user_id },
    });
    res.status(200).json({
      status: "OK",
      me: {
        data: user,
        loops: countLoops,
        saves: countSaves,
        following: countFollowings,
        followers: countFollowers,
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
  const token = req.cookies.token;
  const token_decode = jwt.decode(token, key);
  const user_id = token_decode.userId;
  if (!id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - missing data",
    });
  }
  try {
    const { full_name, email, username } = req.body;
    const user = await User.findByPk(user_id);
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
      user: "User updated",
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
    const user = await User.findOne({
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
      where: { user_id: user.id },
    });
    const countLoop = await Loop.count({
      where: { user_id: user.id },
    });
    const following = await Follower.count({
      where: { user_id: user.id },
    })
    const followers = await Follower.count({
      where: { follow_id: user.id },
    })
    const follow =
    res.status(200).json({
      status: "OK",
      user: {
        personal_info: user,
        loops: countLoop,
        saves: countSave,
        following: following,
        followers: followers,
        follow: follow
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
    const token_decode = await jwt.decode(token, key);
    const id_user = token_decode.userId;
    const data = await sequelize.query(
      "SELECT Saves.loop_id, Loops.name, Loops.description, Loops.content, Loops.filename, Users.username, Loops.created_at, Loops.updated_at, Languages.name as language_name FROM Saves JOIN Loops ON Saves.loop_id = Loops.id JOIN Users ON Loops.user_id = Users.id JOIN Languages ON Languages.id = Loops.language_id WHERE Saves.user_id = ? ORDER BY Loops.created_at DESC;",
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
    const listloops = [];
    console.log(data);
    for (let i of data) {
      const loop = {
        id: i.loop_id,
        name: i.name,
        description: i.description,
        content: i.content,
        filename: i.filename,
        created_at: i.created_at,
        user: {
          username: i.username,
        },
        language: {
          name: i.language_name,
        },
      };
      listloops.push(loop);
    }
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
    listloops.forEach((loop) => {
      loop.like = false;
      loop.save = false;
      for (let a = 0; a < likesUser.length; a++) {
        if (loop.id === likesUser[a].loop_id) {
          loop.like = true;
          break;
        } else {
          loop.like = false;
        }
      }
      for (let a = 0; a < savesUser.length; a++) {
        if (loop.id === savesUser[a].loop_id) {
          loop.save = true;
          break;
        } else {
          loop.save = false;
        }
      }
    });
    // in this part we count the number of likes and saves
    for (let i = 0; i < listloops.length; i++) {
      const countLikesLoop = await Like.count({
        where: { loop_id: listloops[i].id },
      });
      const countSavesLoop = await Save.count({
        where: { loop_id: listloops[i].id },
      });
      listloops[i].countLikes = countLikesLoop;
      listloops[i].countSaves = countSavesLoop;
    }
    console.log("holaaaa");
    const countSaves = await Save.count({
      where: { user_id: id_user },
    });
    const totalPages = Math.ceil(countSaves / limit);
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
      "SELECT Loops.id, Loops.name, Loops.description, Loops.content, Loops.filename, Users.username, Loops.created_at, Loops.updated_at, Languages.name as language_name FROM Likes JOIN Loops ON Likes.loop_id = Loops.id JOIN Users ON Loops.user_id = Users.id JOIN Languages ON Languages.id = Loops.language_id WHERE Likes.user_id = ?;",
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
        created_at: i.created_at,
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

const changeThemeMode = async (req, res) => {
  const token = req.cookies.token;
  try {
    const token_decode = jwt.decode(token, key);
    const user = await User.findByPk(token_decode.userId);
    if (!user) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - User does not exist",
      });
    }
    console.log(user.dataValues.theme);
    if (user.theme === "light") {
      user.theme = "dark";
    } else {
      user.theme = "light";
    }
    await user.save();
    res.status(200).json({
      status: "OK",
      theme_mode: user.theme,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

const usersStats = async (req, res) => {
  const token = req.cookies.token;
  try {
    let dicStatsCreate = {};
    let dicStatsLiked = {};
    let dicStatsSaved = {};
    const token_decode = jwt.decode(token, key);
    const user_id = token_decode.userId;
    const statsCreated = await sequelize.query(
      "Select Languages.name, count(*) as cantidad FROM Loops JOIN Languages ON Loops.language_id = Languages.id WHERE Loops.user_id = ? GROUP BY Languages.name;",
      {
        replacements: [user_id],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    const totalLoops = await Loop.count({
      where: { user_id: user_id },
    });
    statsCreated.forEach((language) => {
      const porcentaje = (language.cantidad / totalLoops) * 100;
      dicStatsCreate[language.name] = parseFloat(porcentaje.toFixed(2));
    });

    const statsLiked = await sequelize.query(
      "Select Languages.name, count(*) as cantidad FROM Likes JOIN Loops ON Likes.loop_id = Loops.id JOIN Languages ON Loops.language_id = Languages.id WHERE Likes.user_id = ? GROUP BY Languages.name;",
      {
        replacements: [user_id],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    const totalLiked = await Like.count({
      where: { user_id: user_id },
    });
    statsLiked.forEach((language) => {
      const porcentaje = (language.cantidad / totalLiked) * 100;
      dicStatsLiked[language.name] = parseFloat(porcentaje.toFixed(2));
    });

    const statsSaved = await sequelize.query(
      "Select Languages.name, count(*) as cantidad FROM Saves JOIN Loops ON Saves.loop_id = Loops.id JOIN Languages ON Loops.language_id = Languages.id WHERE Saves.user_id = ? GROUP BY Languages.name;",
      {
        replacements: [user_id],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    const totalSaved = await Save.count({
      where: { user_id: user_id },
    });
    statsSaved.forEach((language) => {
      const porcentaje = (language.cantidad / totalSaved) * 100;
      dicStatsSaved[language.name] = parseFloat(porcentaje.toFixed(2));
    });

    res.status(200).json({
      status: "OK",
      created: dicStatsCreate,
      Liked: dicStatsLiked,
      Saved: dicStatsSaved,
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
  changeThemeMode: changeThemeMode,
  usersStats: usersStats,
};
