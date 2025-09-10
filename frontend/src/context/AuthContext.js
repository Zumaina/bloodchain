import { createContext, useMemo, useState } from "react";
import { loadAuth, saveAuth, clearAuth } from "../utils/authStorage";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const stored = loadAuth();
  const [user, setUser] = useState(stored?.user || null);
  const [token, setToken] = useState(stored?.token || null);

  const isAuthenticated = Boolean(user && token);

  const setAuth = (payload) => {
    if (payload?.user && payload?.token) {
      setUser(payload.user);
      setToken(payload.token);
      saveAuth({ user: payload.user, token: payload.token });
    } else {
      setUser(null);
      setToken(null);
      clearAuth();
    }
  };

  const logout = () => setAuth(null);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      setAuth,   
      logout,    
      setUser,   
      setToken,  
    }),
    [user, token, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
