import { Navigate, Outlet } from "react-router";
import { isAuthenticated } from "../service/authService";

export function ProtectedRoute(){
    if(!isAuthenticated()){
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}