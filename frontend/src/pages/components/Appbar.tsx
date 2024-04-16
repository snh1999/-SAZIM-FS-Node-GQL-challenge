import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import { useColorScheme } from "@mui/joy/styles";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../config/hooks/useAuth";

export default function AppBar() {
    const context = useAuth();
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
            sx={{
                mr: 2,
                display: "inline",
                margin: 1.5,
                marginLeft: 10,
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: "1.5rem",
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
            }}
        >
            <Link to="/" style={{ textDecoration: "none" }}>
                Teebay
            </Link>
        </Typography>
    );
}
