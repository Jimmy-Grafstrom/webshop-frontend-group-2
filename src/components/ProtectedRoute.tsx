import { Navigate, Outlet } from "react-router";
import type { User } from "../types/auth";

type ProtectedRouteProps = {
    user: User | null;
    requiredRole?: string;
};

export function ProtectedRoute({ user, requiredRole }: ProtectedRouteProps) {
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && !user.roles?.includes(requiredRole)) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />
}