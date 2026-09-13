import axios from "axios";

const apiBaseUrl =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV ? "http://localhost:3000/api" : undefined);

if (!apiBaseUrl) {
  throw new Error(
    "VITE_API_URL must be configured when building the application for production.",
  );
}

if (import.meta.env.PROD && !apiBaseUrl.startsWith("https://")) {
  throw new Error("VITE_API_URL must use HTTPS in production.");
}

export const httpClientAuth = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  withCredentials: true,
});

export const httpClientPublic = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  withCredentials: false,
});