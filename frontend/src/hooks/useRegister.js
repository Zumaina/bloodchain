import { useState } from "react";
import api from "../utils/api";
import useAuthContext from "./useAuthContext";

const useRegister = () => {
  const { setAuth } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const register = async ({ name, email, phone, password }) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        phone,
        password,
      });
      setAuth({ user: data.user, token: data.token });
      return data.user;
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        (Array.isArray(err?.response?.data?.errors) &&
          err.response.data.errors[0]?.msg) ||
        "Registration failed";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};

export default useRegister;
