import { Box, Button } from "@mui/joy";
import { Link } from "react-router-dom";

export function Homepage() {
    return (
        <Box sx={{ display: "flex", gap: 2 }}>
            <Link style={{ textDecoration: "none" }} to="/product/my">
                <Button size="lg" color="primary" variant="solid">
                    My Products
                </Button>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/product">
                <Button size="lg" color="primary" variant="solid">
                    All Products
                </Button>
            </Link>
        </Box>
    );
}
