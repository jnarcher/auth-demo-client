import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function ProtectedRoute() {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated || user === null) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}

export default ProtectedRoute;
