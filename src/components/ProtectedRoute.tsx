import { Navigate, Outlet } from "react-router";
import {getRoles, isAuthenticated} from "../service/authService";

interface Props {
    requiredRole?: string;
}

export function ProtectedRoute({ requiredRole }: Props){
    if(!isAuthenticated()){
        return <Navigate to="/login" replace />;
    }

    if (requiredRole) {
        const roles = getRoles();
        const hasRole = roles.some(
            (role) => role === requiredRole || role === `ROLE_${requiredRole}`
        );

        if (!hasRole) {
            return <Navigate to="/login" replace />;
        }
    }
    return <Outlet />;
}