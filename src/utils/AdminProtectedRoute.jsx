import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const AdminProtectedRoute=({children})=>{
    const navigate=useNavigate();
    const {isAuthenticated}=useSelector(state=>state.auth)  
    return (isAuthenticated ) ? children :  navigate("/login");
}   

export default AdminProtectedRoute;