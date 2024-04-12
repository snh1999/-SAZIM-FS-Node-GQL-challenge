import { createContext, useState } from "react";

type UserData = {
    token: string;
    id: string;
};

export interface IAuthContext {
    userData: UserData;
    login: (userData: UserData) => void;
    logout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

interface Props {
    children: React.ReactNode;
}

export function AuthContextProvider(props: Readonly<Props>) {
    const { children } = props;

    const initialState: UserData = {
        token: localStorage.getItem("token") ?? "",
        id: localStorage.getItem("id") ?? "",
    };
    const [state, setState] = useState(initialState);

    function login(userData: UserData) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("id", userData.id);
        setState(userData);
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        setState(initialState);
    }

    return <AuthContext.Provider value={{ userData: state, login, logout }}>{children}</AuthContext.Provider>;
}
