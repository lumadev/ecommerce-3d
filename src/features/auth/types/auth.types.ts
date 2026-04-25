export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginAdminData {
  username: string;
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
