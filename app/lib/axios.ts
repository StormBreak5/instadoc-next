import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8081",
  headers: { "Content-Type": "application/json" },
});

export const axiosAuth = axios.create({
  baseURL: "http://localhost:8081",
  headers: { "Content-Type": "application/json" },
});
