import { useNavigate } from "react-router-dom"; //  NEW
import useAuthContext from "./useAuthContext";

const useLogout = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();               //  NEW

  const performLogout = () => {
    logout(); // clears state + localStorage
    // Ensure navigation wins over ProtectedRoute’s redirect
    setTimeout(() => navigate("/", { replace: true }), 0); //  NEW
  };

  return { logout: performLogout };
};

export default useLogout;
