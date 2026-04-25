import { httpClientPublic } from "@/infra/http/httpClient";
import { httpClientAuth } from "@/infra/http/httpClient";
import {
  RegisterData,
  LoginData,
  LoginAdminData,
  AuthResponse,
  SessionUser,
} from "../types/auth.types";

const BASE_URL = "/auth";

export const authRepository = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await httpClientPublic.post(`${BASE_URL}/register`, {
      name: data.name,
      email: data.email,
      password: data.password,
    });
    return response.data;
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await httpClientAuth.post(`${BASE_URL}/login`, {
      email: data.email,
      password: data.password,
    });
    return response.data;
  },

  loginAdmin: async (data: LoginAdminData): Promise<AuthResponse> => {
    const response = await httpClientAuth.post(`${BASE_URL}/login-admin`, {
      username: data.username,
      password: data.password,
    });
    return response.data;
  },

  checkSession: async (): Promise<SessionUser> => {
    const response = await httpClientAuth.get(`${BASE_URL}/me`);

    return response.data;
  },
};
