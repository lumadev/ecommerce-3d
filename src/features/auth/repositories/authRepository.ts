import { httpClient } from "@/infra/http/httpClient";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  name: string;
  token?: string;
}

const BASE_URL = "/auth";

export const authRepository = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await httpClient.post(`${BASE_URL}/register`, {
      name: data.name,
      email: data.email,
      password: data.password,
    });
    return response.data;
  },
};
