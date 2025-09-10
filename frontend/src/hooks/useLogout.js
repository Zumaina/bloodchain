import { useNavigate } from "react-router-dom"; 
import useAuthContext from "./useAuthContext";

const useLogout = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();               

  const performLogout = () => {
    logout(); 
    setTimeout(() => navigate("/", { replace: true }), 0); 
  };

  return { logout: performLogout };
};

export default useLogout;
