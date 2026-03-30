import { AxiosRequestConfig } from "axios";
import { httpClient } from "./httpClient";

export const httpService = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const { data } = await httpClient.get<T>(url, config);
    return data;
  },

  post: async <T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const { data } = await httpClient.post<T>(url, body, config);
    return data;
  },

  put: async <T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const { data } = await httpClient.put<T>(url, body, config);
    return data;
  },
};