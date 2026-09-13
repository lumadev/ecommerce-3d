import axios from "axios";

const apiBaseUrl =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV ? "http://localhost:3000/api" : undefined);

if (!apiBaseUrl) {
  throw new Error(
    "VITE_API_URL must be configured when building the application for production.",
  );
}

const isRelativeUrl = apiBaseUrl.startsWith("/");

if (
  import.meta.env.PROD &&
  !isRelativeUrl &&
  !apiBaseUrl.startsWith("https://")
) {
  throw new Error(
    "VITE_API_URL must use HTTPS (or be a relative path) in production.",
  );
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