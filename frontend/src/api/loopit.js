import axios from "axios";

const loopit = axios.create({
  withCredentials: true,
  // baseURL: "http://localhost:3000/api",
  // ! Use localhost for development
  baseURL: "https://loopit-mvp.com/api/",
});

export default loopit;
