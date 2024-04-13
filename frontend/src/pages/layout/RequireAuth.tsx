import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../config/hooks/useAuth";

export default function RequireAuth() {
    const {
        userData: { id },
    } = useAuth();
    const location = useLocation();

    return id ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}
