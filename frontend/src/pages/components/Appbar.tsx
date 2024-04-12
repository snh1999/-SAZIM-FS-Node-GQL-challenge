import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import { useColorScheme } from "@mui/joy/styles";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../config/context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function AppBar() {
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <nav style={{ display: "flex", justifyContent: "space-between" }}>
            <Logo />
            <span>
                <ModeToggle />
                {context.userData.token && (
                    <Button
                        color="danger"
                        sx={{ margin: 1 }}
                        onClick={() => {
                            context.logout();
                            navigate("/login");
                        }}
                    >
                        Logout
                    </Button>
                )}
            </span>
        </nav>
    );
}

function ModeToggle() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return <Button variant="soft">Change Theme</Button>;
    }

    return (
        <Button
            variant="soft"
            sx={{ margin: 1 }}
            onClick={() => {
                setMode(mode === "light" ? "dark" : "light");
            }}
        >
            {mode === "light" ? "Dark Mode" : "Light Mode"}
        </Button>
    );
}

function Logo() {
    return (
        <Typography
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
                mr: 2,
                display: "inline",
                margin: 1.5,
                marginLeft: 5,
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: "1.2rem",
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
            }}
        >
            Teebay
        </Typography>
    );
}
