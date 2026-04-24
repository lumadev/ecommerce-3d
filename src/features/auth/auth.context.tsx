import { createContext } from "react";
import { LoginData, SessionUser } from "./repositories/authRepository";

export interface AuthContextValue {
  user: SessionUser | null;
  isAuthenticated: boolean;
  isCheckingSession: boolean;
  login: (credentials: LoginData) => Promise<SessionUser | null>;
  logout: () => void;
  refreshSession: () => Promise<SessionUser | null>;
}

const createAuthContext = () => createContext<AuthContextValue | undefined>(undefined);

export const ClientAuthContext = createAuthContext();
export const AdminAuthContext = createAuthContext();