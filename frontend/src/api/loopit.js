import axios from "axios";

const loopit = axios.create({
  withCredentials: true,
  baseURL: "https://54.94.125.72:3000",
});

export default loopit;
