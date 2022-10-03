const conexion = require("../database/db");
const mpq = require("mysql-query-placeholders");
const bcrypt = require("bcrypt");
const key = require("../config").key;
const jwt = require("jsonwebtoken");

// Authentication method for the login
const login = async (req, res) => {
  let { body } = req;
  let { username, password, email } = body;
  // If the user doesnt pass the required data, status code 400 is launched
  if (!password || (!username && !email)) {
    return res.status(400).json({
      state: "error",
      error: "Bad Request - Missing data",
    });
  }
  let query = "";
  // Here we corroborate if the user passed the email or the username
  if (email !== undefined) {
    // Query format with the email
    query = mpq.queryBuilder("SELECT * FROM users WHERE email = :email;", {
      email: email,
    });
  } else {
    // Query format with the username
    query = mpq.queryBuilder(
      "SELECT * FROM users WHERE username = :username;",
      {
        username: username,
      }
    );
  }
  console.log(query);
  // Query
  conexion.query(query, async (error, results) => {
    // If there is an error with the query
    if (error)
      res.json({
        state: "Error",
        error: error,
      });
      // If the query did not bring data from the database, but there was not an error
    else if (results.length == 0) {
      res.status(400).json({
        state: "Bad request - This user is not registered",
      });
    } else {
      // If the query brought data from the database and there was not an error
      try {
        let passBD = results[0].password;
        // Here we compare with the bcrypt library, the two passwords, the encrypted and the other one.
        const compare = await bcrypt.compare(password, passBD);
        // If they dont match
        if (!compare) {
          res.status(401).json({
            state: "Authentication Error - Password or user incorrect",
          });
        // If they match
        } else {
          const token = jwt.sign({ username: results[0].username }, key, {
            expiresIn: "1h",
          });
          res
            .cookie("token", token, { maxAge: 2592000, httpOnly: true })
            .json({ status: "logued", username: results[0].username });
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

// Authentication method for the register
const regis = async (req, res) => {
  const { body } = req;
  const { username, fullname, password, email } = body;
  // If the user did not pass the required information, status code 400 is launched 
  if (!username || !fullname || !password || !email) {
    res.status(400).json({
      state: "Error",
      error: "Bad Request - Missing data",
    });
  }
  // If the user pass all information required, the query format is the next one
  let query = mpq.queryBuilder(
    "SELECT * FROM users WHERE username = :username OR email = :email;",
    {
      username: username,
      email: email,
    }
  );
  // Query
  conexion.query(query, async (error, results) => {
    // If there is an error with the query
    if (error) {
      res.json({
        state: "Error",
        error: error,
      });
      // If there is data in the Database
    } else if (results.length != 0) {
      if (results[0].email === email) {
        res.status(400).json({
          state: "Bad Request - This email already exists",
        });
      // If the username already exists
      } else {
        res.status(400).json({
          state: "Bad Request - This username already exists",
        });
      }
      // If there is no data in the database
    } else if (results.length == 0) {
      try {
        // Here we encrypt the password passed by the user
        const passcrypt = await bcrypt.hash(password, 8);
        const create_at = new Date()
          .toISOString()
          .slice(0, 19)
          .replace(/-/g, "/")
          .replace("T", " ");
        // Query to register the new user
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
            // If there was an error with the query
            if (error) {
              res.json({
                state: "Error",
                error: error,
              });
            // If the query was correct
            } else {
              res.status(200).json({
                state: "Registered",
                username: username,
              });
            }
          }
        );
      } catch {
        // Bcrypt is async, so if MUST be inside a try-catch
        res.status(400).json({
          state: "Error",
        });
      }
    } else {
      res.status(400).json({
        state: "Bad Request - This user or email already exists",
      });
    }
  });
};

// Authentication method for the password - Not finished yet
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

const verifyTokenUser = async (req, res) => {
  try {
    const token = req.header("auth-token");
    if (!token)
      return res.status(401).json({
        error: "Access denied",
      });
    const verified = jwt.verify(token, key);
    req.user = verified;
    res.status(200).json({
      state: "autorizado",
    });
  } catch (error) {
    res.status(400).json({
      state: "no autorizado",
    });
  }
};

module.exports = {
  login: login,
  register: regis,
  updatePass: updatePass,
};
