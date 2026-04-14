import axios from "axios";

export const httpClientAuth = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  withCredentials: true,
});

export const httpClientPublic = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  withCredentials: false,
});