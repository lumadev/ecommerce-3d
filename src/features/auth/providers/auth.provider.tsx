import { ReactNode, useEffect, useState } from "react";
import { authRepository, LoginData, SessionUser } from "../repositories/authRepository";
import {
  AdminAuthContext,
  ClientAuthContext,
  AuthContextValue,
} from "../auth.context";

type AuthType = "CUSTOMER" | "ADMIN";

function getStorageKey(type: AuthType) {
  return `auth:${type}:userId`;
}

function getStoredUserId(type: AuthType) {
  return window.localStorage.getItem(getStorageKey(type));
}

function persistUserId(userId: string, type: AuthType) {
  window.localStorage.setItem(getStorageKey(type), userId);
}

function clearPersistedUserId(type: AuthType) {
  window.localStorage.removeItem(getStorageKey(type));
}

function assertRole(user: SessionUser, expectedRole: AuthType) {
  return user.role === expectedRole;
}

export function createAuthProvider(
  role: AuthType,
  Context: React.Context<AuthContextValue | undefined>
) {
  return function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<SessionUser | null>(null);
    const [isCheckingSession, setIsCheckingSession] = useState(true);

    const refreshSession = async () => {
      const userId = getStoredUserId(role);

      if (!userId) {
        setUser(null);
        setIsCheckingSession(false);
        return null;
      }

      try {
        const sessionUser = await authRepository.checkSession(userId);

        if (!assertRole(sessionUser, role)) {
          clearPersistedUserId(role);
          setUser(null);
          return null;
        }

        setUser(sessionUser);
        return sessionUser;
      } catch {
        clearPersistedUserId(role);
        setUser(null);
        return null;
      } finally {
        setIsCheckingSession(false);
      }
    };

    const login = async (credentials: LoginData) => {
      const authResponse = await authRepository.login(credentials);
      persistUserId(authResponse.id, role);

      const sessionUser = await authRepository.checkSession(authResponse.id);

      if (!assertRole(sessionUser, role)) {
        clearPersistedUserId(role);
        setUser(null);
        return null;
      }

      setUser(sessionUser);

      return sessionUser;
    };

    const logout = () => {
      clearPersistedUserId(role);
      setUser(null);
    };

    useEffect(() => {
      void refreshSession();
    }, []);

    return (
      <Context.Provider
        value={{
          user,
          isAuthenticated: Boolean(user),
          isCheckingSession,
          login,
          logout,
          refreshSession,
        }}
      >
        {children}
      </Context.Provider>
    );
  };
}

export const ClientAuthProvider = createAuthProvider(
  "CUSTOMER", ClientAuthContext
);
export const AdminAuthProvider = createAuthProvider(
  "ADMIN", AdminAuthContext
);