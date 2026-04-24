import { httpClientPublic } from "@/infra/http/httpClient";
import { httpClientAuth } from "@/infra/http/httpClient";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  name: string;
  token?: string;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: "CUSTOMER" | "ADMIN";
}

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

  checkSession: async (userId: string): Promise<SessionUser> => {
    const response = await httpClientAuth.get(`${BASE_URL}/me`, {
      params: { userId },
    });

    return response.data;
  },
};
