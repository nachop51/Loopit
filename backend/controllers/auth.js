const bcrypt = require("bcrypt");
const key = require("../config").key;
const jwt = require("jsonwebtoken");
const User = require("../models/users");

//function to register a new user
const register = async (req, res) => {
  const { username, fullname, password, email } = req.body;
  // If the user did not pass the required information, status code 400 is launched
  if (!username || !fullname || !password || !email) {
    return res.status(400).json({
      state: "Error",
      error: "Bad Request - Missing data",
    });
  }
  try {
    let passEncrypt = await bcrypt.hash(password, 8);
    User.create({
      username: username,
      full_name: fullname,
      email: email,
      password: passEncrypt,
    })
      .then((user) => {
        res.status(200).json({
          state: "Registered",
          username: username,
        });
      })
      .catch((error) => {
        let errorBd = error.errors.map((e) => e.message);
        if (errorBd[0] === "username must be unique") {
          res.status(400).json({
            state: "Bad Request - This username already exists",
          });
        } else if (errorBd[0] === "email must be unique") {
          res.status(400).json({
            state: "Bad Request - This email already exists",
          });
        } else {
          res.status(400).json({
            state: "Error",
            error: error,
          });
        }
      });
  } catch (error) {
    res.status(400).json({
      state: "Error",
      error: error,
    });
  }
};

const login = (req, res) => {
  const { user, password } = req.body;
  if (!user || !password) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - Missing data",
    });
  }
  let datoSearch = user.includes("@") ? { email: user } : { username: user };
  console.log(datoSearch);
  User.findOne({
    where: datoSearch,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          status: "Error",
          error: "Bad request - failed credentials",
        });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(500).json({
            status: "Error",
            error: err,
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              username: user.username,
              userId: user.id,
            },
            key,
            {
              expiresIn: "1h",
            }
          );
          res
            .status(200)
            .cookie("token", token, { maxAge: 604800000, httpOnly: true })
            .json({ status: "logged", username: user.username });
        } else {
          res.status(400).json({
            status: "Error",
            error: "Bad request - failed credentials",
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "Error",
        error: err,
      });
    });
};

const logout = (req, res) => {
  res.clearCookie("token").json({ status: "logged out" });
};

const verifyTokenUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(200).json({
        status: "token not found",
      });
    const verified = jwt.verify(token, key);
    const tokenInfo = jwt.decode(token);
    const username = tokenInfo.username;
    res.status(200).json({
      status: "authorized",
      username: username,
    });
  } catch (error) {
    res.status(200).json({
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
