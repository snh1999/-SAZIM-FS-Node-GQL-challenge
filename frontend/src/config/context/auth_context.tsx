import { createContext, useState } from "react";

type UserData = {
    token: string;
    id: string;
};

export const AuthContext = createContext({
    userData: { token: "", id: "" },
    login: (_: UserData) => {},
    logout: () => {},
});

interface Props {
    children: React.ReactNode;
}

export function AuthContextProvider(props: Props) {
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
