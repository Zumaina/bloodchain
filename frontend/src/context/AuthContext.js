import { createContext, useEffect, useMemo, useState } from "react";
import { loadAuth, saveAuth, clearAuth } from "../utils/authStorage"; // ✅ NEW

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Hydrate from storage on first load
  useEffect(() => {
    const stored = loadAuth();                 // ✅ use wrapper
    if (stored?.user && stored?.token) {
      setUser(stored.user);
      setToken(stored.token);
    }
  }, []);

  const isAuthenticated = Boolean(user && token);

  // Set or clear auth in one place
  const setAuth = (payload) => {
    if (payload?.user && payload?.token) {
      setUser(payload.user);
      setToken(payload.token);
      saveAuth({ user: payload.user, token: payload.token }); // ✅ use wrapper
    } else {
      setUser(null);
      setToken(null);
      clearAuth();                                            // ✅ use wrapper
    }
  };

  const logout = () => setAuth(null);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      setAuth,   // for login/register success
      logout,    // clear auth everywhere
      setUser,   // optional: update profile locally later
      setToken,  // optional: if we ever refresh tokens
    }),
    [user, token, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
