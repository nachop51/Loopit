const conexion = require("../database/db");
const mpq = require("mysql-query-placeholders");
const bcrypt = require("bcrypt");
const key = require("../config").key;
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  let { body } = req;
  let { username, password, email } = body;
  if (!password || (!username && !email)) {
    return res.status(400).json({
      state: "error",
      error: "Missing data",
    });
  }
  let query = "";
  if (email !== undefined) {
    query = mpq.queryBuilder("SELECT * FROM users WHERE email = :email;", {
      email: email,
    });
  } else {
    query = mpq.queryBuilder(
      "SELECT * FROM users WHERE username = :username;",
      {
        username: username,
      }
    );
  }
  console.log(query);
  conexion.query(query, async (error, results) => {
    if (error)
      res.json({
        state: "Error",
        error: error,
      });
    else if (results.length == 0) {
      res.status(400).json({
        state: "This user is not registered",
      });
    } else {
      try {
        console.log(results);
        let passBD = results[0].password;
        const compare = await bcrypt.compare(password, passBD);
        console.log(compare);
        if (!compare) {
          res.status(401).json({
            state: "Password or user incorrect",
          });
        } else {
          const token = jwt.sign({ username: results[0].username }, key, {
            expiresIn: "1h",
          });
          res.status(200).json({
            state: "Logged",
            token: token,
            data: results[0].username,
          });
          console.log(token);
        }
      } catch (error) {
        res.status(400).json({
          state: "Error",
          error: error,
        });
      }
    }
  });
};

const regis = async (req, res) => {
  const { body } = req;
  const { username, fullname, password, email } = body;
  if (!username || !fullname || !password || !email) {
    res.status(400).json({
      state: "Error",
      error: "Missing data",
    });
  }
  let query = mpq.queryBuilder(
    "SELECT * FROM users WHERE username = :username OR email = :email;",
    {
      username: username,
      email: email,
    }
  );
  conexion.query(query, async (error, results) => {
    if (error) {
      res.json({
        state: "Error",
        error: error,
      });
    } else if (results.length != 0) {
      if (results[0].email === email) {
        res.status(400).json({
          state: "This email already exists",
        });
      } else {
        res.status(400).json({
          state: "This username already exists",
        });
      }
    } else if (results.length == 0) {
      try {
        const passcrypt = await bcrypt.hash(password, 8);
        const create_at = new Date()
          .toISOString()
          .slice(0, 19)
          .replace(/-/g, "/")
          .replace("T", " ");
        conexion.query(
          "INSERT INTO users SET ?",
          {
            username: username,
            full_name: fullname,
            email: email,
            password: passcrypt,
            create_at: create_at,
            update_at: create_at,
          },
          (error, results) => {
            if (error) {
              res.json({
                state: "Error",
                error: error,
              });
            } else {
              res.status(200).json({
                state: "Registered",
                username: username,
              });
            }
          }
        );
      } catch {
        res.status(400).json({
          state: "error",
        });
      }
    } else {
      res.status(401).json({
        state: "This user or email already exists",
      });
    }
  });
};

const updatePass = (req, res) => {
  const user = req.body.user;
  const pass = req.body.pass;
  const newpass = req.body.newpass;
  conexion.query(
    "SELECT pass FROM usuarios WHERE ?",
    { user: user },
    async (error, results) => {
      const passBD = results[0].pass;
      const compare = await bcrypt.compare(pass, passBD);
      if (!compare) {
        res.status(401).json({
          state: "error",
          error: "Invalid password",
        });
      } else {
        newpasscrypt = await bcrypt.hash(newpass, 8);
        conexion.query(
          "UPDATE usuarios SET pass = ? WHERE user = ?",
          [newpasscrypt, user],
          (error, results) => {
            if (error) {
              throw error;
            } else {
              res.status(200).json({
                state: "Update password",
              });
            }
          }
        );
      }
    }
  );
};

module.exports = {
  login: login,
  register: regis,
  updatePass: updatePass,
};
