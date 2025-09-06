import { useState } from "react";
import api from "../utils/api";
import useAuthContext from "./useAuthContext";

const useLogin = () => {
  const { setAuth } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async ({ email, password }) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      // data => { message, user, token }
      setAuth({ user: data.user, token: data.token });
      return data.user;
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        (Array.isArray(err?.response?.data?.errors) &&
          err.response.data.errors[0]?.msg) ||
        "Login failed";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin;
