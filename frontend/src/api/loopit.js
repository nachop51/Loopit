import axios from "axios";

const loopit = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3000",
});

export default loopit;
