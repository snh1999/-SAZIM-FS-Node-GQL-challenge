import { Box, Typography } from "@mui/joy";
import { useFormContext } from "react-hook-form";

/**
 * Component for displaying product summary information at the end step of product creation form.
 */
export default function ProductSummary() {
    const { getValues } = useFormContext();

    return (
        <Box sx={{ letterSpacing: "1px", display: "flex", flexDirection: "column", gap: 1.5, mb: 5 }}>
            <Typography level="body-md">
                <b>Title:</b> {getValues("title")}
            </Typography>
            <Typography>
                <b>Categries:</b> {getValues("categories").join(", ")}
            </Typography>
            <Typography>
                <b>Description:</b> {getValues("description")}
            </Typography>
            <Typography>
                <b>Price:</b> ${getValues("price")} <b>To Rent</b>: ${getValues("rentPrice")}{" "}
                {getValues("rentDuration")}
            </Typography>
        </Box>
    );
}
