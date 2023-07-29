import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { useLocalStorage } from "./useLocalStorage";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  const authetication = new AuthService("sign_in");

  const updateLocalStorage =(data)=>{
    console.log("setting user data in storage",data)
    setUser(data)
  }
  // call this function when you want to authenticate the user
  const login = async (data) => {

    await authetication.login(data).then((res) => {
      console.log("auth res", res.data);
      updateLocalStorage(res.data);
      navigate("/dashboard");
    });
  };

  // call this function to sign out logged in user
  const logout = () => {
    updateLocalStorage(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {

  return useContext(AuthContext);
};