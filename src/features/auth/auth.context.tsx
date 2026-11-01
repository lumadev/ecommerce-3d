import { createContext } from "react";
import { LoginData, SessionUser } from "./types/auth.types";

export interface AuthContextValue {
  user: SessionUser | null;
  isAuthenticated: boolean;
  isCheckingSession: boolean;
  login: (credentials: LoginData) => Promise<SessionUser | null>;
  logout: () => void;
  refreshSession: () => Promise<SessionUser | null>;
}

export const ClientAuthContext = createContext<AuthContextValue | undefined>(
  undefined
);