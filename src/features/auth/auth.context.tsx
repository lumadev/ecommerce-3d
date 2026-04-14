import { createContext } from "react";
import { LoginData, SessionUser } from "./repositories/authRepository";

export interface AuthContextValue {
  user: SessionUser | null;
  isAuthenticated: boolean;
  isCheckingSession: boolean;
  login: (credentials: LoginData) => Promise<SessionUser>;
  logout: () => void;
  refreshSession: () => Promise<SessionUser | null>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);