import { Outlet } from "react-router-dom";
import AppBar from "../components/Appbar";

/**
 * Adds AppBar and to component.
 * Renders the main layout of the application.
 *
 * @return {JSX.Element} The main layout component
 */
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
