import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../config/hooks/useAuth";

/**
 * Component that requires authentication before rendering the content.
 * Wrapper For the protected routes.
 *
 * @return {JSX.Element} The rendered JSX based on the authentication status.
 */
export default function RequireAuth() {
    const {
        userData: { id },
    } = useAuth();
    const location = useLocation();

    return id ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}
