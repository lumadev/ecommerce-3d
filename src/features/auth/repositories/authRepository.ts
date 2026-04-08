import { httpClient } from "@/infra/http/httpClient";

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  fullName: string;
  token?: string;
}

const BASE_URL = "/auth";

export const authRepository = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await httpClient.post(`${BASE_URL}/register`, {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    });
    return response.data;
  },
};
