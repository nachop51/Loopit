const conexion = require("../database/db");
const mpq = require("mysql-query-placeholders");
const bcrypt = require("bcrypt");
const key = require("../config").key;
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  let { body } = req;
  let { username, password, email } = body;
  let query = "";
  if (email !== undefined) {
    query = mpq.queryBuilder("SELECT * FROM users WHERE email = :email;", {
      email: body,
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
        state: "error",
        error: error,
      });
    else if (results.length == 0) {
      res.status(400).json({
        state: "ese usuario no esta registrado",
      });
    } else {
      try {
        let passBD = results[0].password;
        const compare = await bcrypt.compare(password, passBD);
        console.log(compare);
        if (!compare) {
          res.status(400).json({
            state: "contraseña o usuario equivocado",
          });
        } else {
          const token = jwt.sign({ username: username }, key, {
            expiresIn: "1h",
          });
          res.status(200).json({
            state: "logueado",
            token: token,
            data: username,
          });
          console.log(token);
        }
      } catch (error) {
        res.status(400).json({
          state: "error",
        });
      }
    }
  });
};

const regis = async (req, res) => {
  const { body } = req;
  const { username, fullname, pass, email } = body;
  if (!username || !fullname || !pass || !email) {
    res.status(400).json({
      state: "error",
      error: "Missing data",
    });
  }
  conexion.query(
    "SELECT username FROM users WHERE ?",
    { username: username },
    async (error, results) => {
      if (error) {
        res.json({
          state: "error",
          error: error,
        });
      } else if (results.length == 0) {
        try {
          const passcrypt = await bcrypt.hash(pass, 8);
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
                  state: "error",
                  error: error,
                });
              } else {
                res.status(200).json({
                  state: "registrado",
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
          state: "ese user ya esta registrado",
        });
      }
    }
  );
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
