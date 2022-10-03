import axios from "axios";

const loopit = axios.create({
  baseURL: "http://54.94.125.72:3000/",
});

export default loopit;
