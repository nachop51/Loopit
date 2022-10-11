#!/usr/bin/node
const { sequelize } = require("../database/db");
const axios = require("axios");

axios
  .post("http://localhost:3000/auth/register", {
    fullname: "Mateo Arbini",
    username: "mateo",
    password: "12345",
    email: "mateoarbini1998@gmail.com",
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

axios.get("http://localhost:3000/users/all").then((response) => {
  const data = response.data;
  for (const x in data) {
    const user_id = x.users[0].id;
  }
});

axios
  .post("http://localhost:3000/auth/login", {
    user: "mateoarbini1998@gmail.com",
    user_id: user_id,
  })
  .then(function (response) {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

axios
  .post("http://localhost:3000/languages/add", {
    name: "JavaScript",
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

axios
  .post("http://localhost:3000/loops/add", {
    name: "Loop for example",
    description: "Asign a value to a const var named x",
    content: "const x = 15",
    filename: "file",
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
