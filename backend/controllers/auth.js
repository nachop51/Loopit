const bcrypt = require("bcrypt");
const key = require("../config").key;
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const register = async (req, res) => {
  const { username, fullname, password, email, id } = req.body;
  // If the user did not pass the required information, status code 400 is launched
  if (!username || !fullname || !password || !email) {
    return res.status(400).json({
      state: "Error",
      error: "Bad Request - Missing data",
    });
  }
  try {
    const errors = {};
    const userUsernameExist = await User.findAll({
      where: { username: username },
    });
    const userEmailExist = await User.findAll({
      where: { email: email },
    });
    if (userUsernameExist.length > 0) {
      errors["username"] = "Username already exists";
    }
    if (userEmailExist.length > 0) {
      errors["email"] = "Email already exists";
    }
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        state: "Error",
        error: errors,
      });
    } else {
      let passEncrypt = await bcrypt.hash(password, 8);
      const newUser = await User.create({
        username: username,
        full_name: fullname,
        email: email,
        password: passEncrypt,
      });
      const token = jwt.sign(
        {
          username: username,
          userId: newUser.id,
        },
        key,
        {
          expiresIn: "1d",
        }
      );
      return res
        .status(200)
        .cookie("token", token, { maxAge: 604800000, httpOnly: true })
        .json({
          state: "Registered",
          id: newUser.id,
          username: newUser.username,
          theme: "light",
          editorTheme: "vs-dark",
        });
    }
  } catch (error) {
    res.status(400).json({
      state: "Error",
      error: error,
    });
  }
};

const login = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - Missing data",
    });
  }
  try {
    let datoSearch = user.includes("@") ? { email: user } : { username: user };
    const userExists = await User.findOne({
      where: datoSearch,
    });
    if (!userExists) {
      return res.status(404).json({
        status: "Error",
        error: "Bad request - failed credentials",
      });
    }
    const passMatch = await bcrypt.compare(password, userExists.password);
    if (!passMatch) {
      return res.status(404).json({
        status: "Error",
        error: "Bad request - failed credentials",
      });
    }
    const token = jwt.sign(
      {
        username: userExists.username,
        userId: userExists.id,
      },
      key,
      {
        expiresIn: "7d",
      }
    );
    return res
      .status(200)
      .cookie("token", token, { maxAge: 604800000, httpOnly: true })
      .json({
        status: "logged",
        id: userExists.id,
        username: userExists.username,
        theme: userExists.theme,
        editorTheme: userExists.editorTheme,
      });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("token").json({ status: "logged out" });
};

const verifyTokenUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(400).json({
        status: "token not found",
      });
    const token_decode = jwt.decode(token, key);
    const userInfo = await User.findOne({
      where: { id: token_decode.userId },
      attributes: ["theme", "id", "username", "editorTheme"],
    });
    if (!userInfo) {
      return res.status(400).json({ status: "token not found" });
    }
    res.status(200).json({
      status: "authorized",
      id: userInfo.id,
      username: userInfo.username,
      theme: userInfo.theme,
      editorTheme: userInfo.editorTheme,
    });
  } catch (error) {
    res.status(400).json({
      status: "no authorized",
    });
  }
};

module.exports = {
  login: login,
  register: register,
  verifyTokenUser: verifyTokenUser,
  logout: logout,
};
