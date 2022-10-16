const User = require("../models/users");
const Loop = require("../models/loops");
const Like = require("../models/likes");
const jwt = require("jsonwebtoken");
const { key } = require("../config");

const addLike = async (req, res) => {
  const { loop_id } = req.body;
  const token = req.cookies.token;
  if (!loop_id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - missing data",
    });
  }
  try {
    const token_decode = jwt.decode(token, key);
    const user_id = token_decode.userId;
    const user = await User.findByPk(user_id);
    const loop = await Loop.findByPk(loop_id);
    if (!user) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - user does not exist",
      });
    }
    if (!loop) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - loop does not exist",
      });
    }
    const new_like = await Like.create({
      user_id: user_id,
      loop_id: loop_id,
    });
    if (!new_like) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - like already exists",
      });
    }
    res.status(200).json({
      status: "OK",
      data: new_like,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

module.exports = {
  addLike: addLike,
};
