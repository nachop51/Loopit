const Follower = require("../models/followers");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const { key } = require("../config");

const addFollower = async (req, res) => {
  const { follow_id } = req.body;
  const token = req.cookies.token;
  if (!follow_id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - missing data",
    });
  }
  try {
    const token_decode = jwt.decode(token, key);
    const user_id = token_decode.userId;
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({
        status: "Error",
        Error: "Bad Request - User does not exist",
      });
    }
    const follow = await User.findByPk(follow_id);
    if (!follow) {
      return res.status(400).json({
        status: "Error",
        Error: "Bad Request - User does not exist",
      });
    }
    const follower = await Follower.create({
      user_id: user_id,
      follow_id: follow_id,
    });
    res.status(200).json({
      status: "OK",
      data: follower,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

const deleteFollower = async (req, res) => {
  const { user_id, username } = req.body;
  if (!user_id || !username) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - missing data",
    });
  }
  try {
    const follower = await Follower.findOne({
      where: { user_id: user_id, username: username },
    });
    console.log(follower);
    if (!follower) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - follower does not exist",
      });
    }
    await follower.destroy();
    res.status(200).json({
      status: "OK",
      data: [],
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

module.exports = {
  addFollower: addFollower,
  deleteFollower: deleteFollower,
};
