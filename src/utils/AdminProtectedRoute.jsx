import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const AdminProtectedRoute=({children})=>{
    const navigate=useNavigate();
    const isAuth=useSelector(state=>state.auth.isAuthenticated)  
    return (isAuth ) ? children :  navigate("/login");
}   

export default AdminProtectedRoute;