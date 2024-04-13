import { useContext } from "react";
import { AuthContext, IAuthContext } from "../context/AuthProvider";

export default function useAuth() {
    return useContext(AuthContext) as IAuthContext;
}
