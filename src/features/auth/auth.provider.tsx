import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./auth.context";
import {
  authRepository,
  LoginData,
  SessionUser,
} from "./repositories/authRepository";

const AUTH_USER_ID_STORAGE_KEY = "auth:userId";

function getStoredUserId() {
  return window.localStorage.getItem(AUTH_USER_ID_STORAGE_KEY);
}

function persistUserId(userId: string) {
  window.localStorage.setItem(AUTH_USER_ID_STORAGE_KEY, userId);
}

function clearPersistedUserId() {
  window.localStorage.removeItem(AUTH_USER_ID_STORAGE_KEY);
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  const refreshSession = async () => {
    const userId = getStoredUserId();

    if (!userId) {
      setUser(null);
      setIsCheckingSession(false);
      return null;
    }

    setIsCheckingSession(true);

    try {
      const sessionUser = await authRepository.checkSession(userId);
      setUser(sessionUser);
      return sessionUser;
    } catch {
      clearPersistedUserId();
      setUser(null);
      return null;
    } finally {
      setIsCheckingSession(false);
    }
  };

  const login = async (credentials: LoginData) => {
    const authResponse = await authRepository.login(credentials);
    persistUserId(authResponse.id);

    const sessionUser = await authRepository.checkSession(authResponse.id);
    setUser(sessionUser);
    setIsCheckingSession(false);

    return sessionUser;
  };

  const logout = () => {
    clearPersistedUserId();
    setUser(null);
    setIsCheckingSession(false);
  };

  useEffect(() => {
    void refreshSession();
  }, []);

  return (
    <AuthContext.Provider
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
    </AuthContext.Provider>
  );
};