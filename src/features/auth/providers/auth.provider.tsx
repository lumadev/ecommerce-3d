import { ReactNode, useEffect, useState } from "react";
import { authRepository } from "../repositories/authRepository";
import { LoginData, SessionUser } from "../types/auth.types";
import { AuthContextValue, ClientAuthContext } from "../auth.context";

const AUTHENTICATED_SESSION_KEY = "auth:authenticated";

export const ClientAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  const refreshSession = async () => {
    try {
      const sessionUser = await authRepository.checkSession();

      if (sessionUser.role !== "CUSTOMER") {
        window.localStorage.removeItem(AUTHENTICATED_SESSION_KEY);
        setUser(null);
        return null;
      }

      setUser(sessionUser);
      return sessionUser;
    } catch {
      window.localStorage.removeItem(AUTHENTICATED_SESSION_KEY);
      setUser(null);
      return null;
    } finally {
      setIsCheckingSession(false);
    }
  };

  const login = async (credentials: LoginData) => {
    await authRepository.login(credentials);

    const sessionUser = await authRepository.checkSession();

    if (sessionUser.role !== "CUSTOMER") {
      window.localStorage.removeItem(AUTHENTICATED_SESSION_KEY);
      setUser(null);
      return null;
    }

    window.localStorage.setItem(AUTHENTICATED_SESSION_KEY, "true");
    setUser(sessionUser);

    return sessionUser;
  };

  const logout = async () => {
    try {
      await authRepository.logout();
    } catch {
      // Ignora erros caso a chamada de logout falhe
    } finally {
      window.localStorage.removeItem(AUTHENTICATED_SESSION_KEY);
      setUser(null);
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem(AUTHENTICATED_SESSION_KEY) !== "true") {
      setIsCheckingSession(false);
      return;
    }

    void refreshSession();
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: Boolean(user),
    isCheckingSession,
    login,
    logout,
    refreshSession,
  };

  return (
    <ClientAuthContext.Provider value={value}>
      {children}
    </ClientAuthContext.Provider>
  );
};