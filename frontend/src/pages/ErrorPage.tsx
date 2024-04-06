import { Box, Button, Container, Typography } from "@mui/joy";

export default function ErrorPage() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                marginLeft: "10%",
            }}
        >
            <Container>
                <Typography level="h1">404</Typography>
                <Typography level="h4">The page you’re looking for doesn’t exist.</Typography>
                <Button>Back Home</Button>
            </Container>
        </Box>
    );
}
