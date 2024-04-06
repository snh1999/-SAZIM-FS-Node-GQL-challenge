import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import { useColorScheme } from "@mui/joy/styles";
import { useEffect, useState } from "react";

export default function AppBar() {
    return (
        <nav style={{ display: "flex", justifyContent: "space-between" }}>
            <Logo />
            <ModeToggle />
        </nav>
    );
}

function ModeToggle() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = useState(false);

    // necessary for server-side rendering
    // because mode is undefined on the server
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
