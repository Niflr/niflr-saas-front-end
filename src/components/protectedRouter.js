import { Navigate ,useNavigate} from "react-router-dom";
import {useAuth } from "./useAuth";


export const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
  const { user } = useAuth();
  if (!user) {
    console.log("checking authentication",user)
    // user is not authenticated
    return <Navigate to="/" />; 
    // return <Navigate to="/login" />;
  }
    console.log("checking auth", user)
   return children;

  
};