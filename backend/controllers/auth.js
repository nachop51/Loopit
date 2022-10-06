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
            .cookie("token", token, { maxAge: 2592000, httpOnly: true })
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
      return res.status(401).json({
        status: "token not found",
      });
    const verified = jwt.verify(token, key);
    res.status(200).json({
      status: "authorized",
    });
  } catch (error) {
    res.status(401).json({
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

// const regis = async (req, res) => {
//   const { body } = req;
//   const { username, fullname, password, email } = body;
//   // If the user did not pass the required information, status code 400 is launched
//   if (!username || !fullname || !password || !email) {
//     res.status(400).json({
//       state: "Error",
//       error: "Bad Request - Missing data",
//     });
//   }
//   // If the user pass all information required, the query format is the next one
//   let query = mpq.queryBuilder(
//     "SELECT * FROM users WHERE username = :username OR email = :email;",
//     {
//       username: username,
//       email: email,
//     }
//   );
//   // Query
//   conexion.query(query, async (error, results) => {
//     // If there is an error with the query
//     if (error) {
//       res.json({
//         state: "Error",
//         error: error,
//       });
//       // If there is data in the Database
//     } else if (results.length != 0) {
//       if (results[0].email === email) {
//         res.status(400).json({
//           state: "Bad Request - This email already exists",
//         });
//         // If the username already exists
//       } else {
//         res.status(400).json({
//           state: "Bad Request - This username already exists",
//         });
//       }
//       // If there is no data in the database
//     } else if (results.length == 0) {
//       try {
//         // Here we encrypt the password passed by the user
//         const passcrypt = await bcrypt.hash(password, 8);
//         const create_at = new Date()
//           .toISOString()
//           .slice(0, 19)
//           .replace(/-/g, "/")
//           .replace("T", " ");
//         // Query to register the new user
//         conexion.query(
//           "INSERT INTO users SET ?",
//           {
//             username: username,
//             full_name: fullname,
//             email: email,
//             password: passcrypt,
//             create_at: create_at,
//             update_at: create_at,
//           },
//           (error, results) => {
//             // If there was an error with the query
//             if (error) {
//               res.json({
//                 state: "Error",
//                 error: error,
//               });
//               // If the query was correct
//             } else {
//               res.status(200).json({
//                 state: "Registered",
//                 username: username,
//               });
//             }
//           }
//         );
//       } catch {
//         // Bcrypt is async, so if MUST be inside a try-catch
//         res.status(400).json({
//           state: "Error",
//         });
//       }
//     } else {
//       res.status(400).json({
//         state: "Bad Request - This user or email already exists",
//       });
//     }
//   });
// };

// const login = async (req, res) => {
//   let { body } = req;
//   let { user, password } = body;
//   // If the user doesnt pass the required data, status code 400 is launched
//   if (!password || (!user && !email)) {
//     return res.status(400).json({
//       state: "error",
//       error: "Bad Request - Missing data",
//     });
//   }
//   let query = "";
//   // Here we corroborate if the user passed the email or the username
//   if (user.includes("@")) {
//     // Query format with the email
//     query = mpq.queryBuilder("SELECT * FROM users WHERE email = :email;", {
//       email: user,
//     });
//   } else {
//     // Query format with the username
//     query = mpq.queryBuilder(
//       "SELECT * FROM users WHERE username = :username;",
//       {
//         username: user,
//       }
//     );
//   }
//   console.log(query);
//   // Query
//   conexion.query(query, async (error, results) => {
//     // If there is an error with the query
//     if (error)
//       res.json({
//         state: "Error",
//         error: error,
//       });
//     // If the query did not bring data from the database, but there was not an error
//     else if (results.length == 0) {
//       res.status(400).json({
//         state: "Bad request - This user is not registered",
//       });
//     } else {
//       // If the query brought data from the database and there was not an error
//       try {
//         let passBD = results[0].password;
//         // Here we compare with the bcrypt library, the two passwords, the encrypted and the other one.
//         const compare = await bcrypt.compare(password, passBD);
//         // If they dont match
//         if (!compare) {
//           res.status(401).json({
//             state: "Authentication Error - Password or user incorrect",
//           });
//           // If they match
//         } else {
//           const token = jwt.sign({ username: results[0].username }, key, {
//             expiresIn: "1h",
//           });
//           res
//             .cookie("token", token, { maxAge: 2592000, httpOnly: true })
//             .json({ status: "logged", username: results[0].username });
//         }
//       } catch (error) {
//         res.status(400).json({
//           state: "Error",
//           error: error,
//         });
//       }
//     }
//   });
// };
