import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const updateLocalStorage =(data)=>{
    console.log("setting user data in storage",data)
    setUser(data)
  }
  // call this function when you want to authenticate the user
  const login = async (data) => {
    console.log("checking login in auth context", data)
    updateLocalStorage(data)
    navigate("/dashboard");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );
  return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>);
};

export const useAuth = () => {
  console.log("using auth context in protected router")
  return useContext(AuthContext);
};