import Card from "@mui/joy/Card";
import Sheet from "@mui/joy/Sheet";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product } from "../../../constants/types/Product";
import { ConfirmationModal } from "../ConfirmationModal";
import { useState } from "react";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Readonly<Props>) {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <Card sx={{ pl: 5, letterSpacing: 1 }} size="lg">
            <Sheet
                sx={{
                    pt: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    gap: 2,
                    borderRadius: "sm",
                }}
            >
                <Typography fontSize="1.8rem">{product.title}</Typography>
                <Typography level="body-sm">Categories: {product.categories.join(", ")}</Typography>
                <Typography level="body-sm">
                    Price: ${product.price} | Rent: ${product.rentPrice} {product.rentDuration}
                </Typography>
            </Sheet>

            <IconButton
                variant="plain"
                color="neutral"
                size="lg"
                sx={{ position: "absolute", right: "1rem" }}
                onClick={() => setOpen(true)}
            >
                <DeleteIcon />
            </IconButton>

            <Typography fontSize="1.1rem" py={3} width="95%">
                {product.description}
            </Typography>
            <CardContent
                sx={{ display: "flex", justifyContent: "space-between", letterSpacing: 0 }}
                orientation="horizontal"
            >
                <Typography level="body-xs">Date Posted: {product.createdAt.toLocaleDateString()}</Typography>
                <Typography level="body-xs">views</Typography>
            </CardContent>

            <ConfirmationModal
                open={open}
                setOpen={setOpen}
                dialogueText="Are you sure you want to delete this product?"
            />
        </Card>
    );
}
