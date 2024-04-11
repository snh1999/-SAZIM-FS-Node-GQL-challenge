import { Box, Typography } from "@mui/joy";

interface Prop {
    title: string;
    categories: unknown[];
    description: string;
    price: number;
    rentPrice: number;
    rentDuration: string;
}

export default function ProductSummary(prop: Readonly<Prop>) {
    return (
        <Box sx={{ letterSpacing: "1px", display: "flex", flexDirection: "column", gap: 1.5, mb: 5 }}>
            <Typography level="body-md">
                <b>Title:</b> {prop.title}
            </Typography>
            <Typography>
                <b>Categries:</b> {prop.categories.join(", ")}
            </Typography>
            <Typography>
                <b>Description:</b> {prop.description}
            </Typography>
            <Typography>
                <b>Price:</b> ${prop.price} <b>To Rent</b>: ${prop.rentPrice} {prop.rentDuration}
            </Typography>
        </Box>
    );
}
