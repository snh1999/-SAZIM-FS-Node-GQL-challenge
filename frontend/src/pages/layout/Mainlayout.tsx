import { Outlet } from "react-router-dom";
import AppBar from "../components/Appbar";

export default function MainLayout() {
    return (
        <>
            <AppBar />
            <main
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <Outlet />
            </main>
        </>
    );
}
