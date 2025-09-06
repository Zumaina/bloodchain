import useAuthContext from "./useAuthContext";

const useLogout = () => {
  const { logout } = useAuthContext();

  const performLogout = () => {
    logout(); // clears state + localStorage
  };

  return { logout: performLogout };
};

export default useLogout;
