import Card from "@mui/joy/Card";
import Sheet from "@mui/joy/Sheet";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product } from "../../../constants/types/Product";
import { ConfirmationModal } from "../ConfirmationModal";
import { useState } from "react";
import { getFormattedDate } from "../../../utils/helper";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/joy";
import { useMutation } from "@apollo/client";
import { DELETE_PRODUCT_MUTATION } from "../../../graphql/product/mutations";
import RequestStateWrapper from "../containers/RequestStateWrapper";
import { updateOnDelete } from "../../../config/apollo_cache";

interface Props {
    product: Product & { categories: string };
    showDelete?: boolean;
    productLink: string;
    children?: React.ReactNode;
}

export default function ProductCard({ product, productLink, children, showDelete = false }: Readonly<Props>) {
    const navigate = useNavigate();
    return (
        <Card sx={{ pl: 5, letterSpacing: 1, cursor: "pointer" }} size="lg">
            <Sheet
                sx={{
                    pt: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    gap: 1,
                    borderRadius: "sm",
                }}
                onClick={() => navigate(productLink)}
            >
                <Typography fontSize="1.7rem">{product.title}</Typography>
                <Typography level="body-sm">Categories: {product.categories}</Typography>
                <Typography level="body-sm">
                    Price: ${product.price} | Rent: ${product.rentPrice} {product.rentDuration}
                </Typography>
            </Sheet>

            {showDelete && <DeleteProduct id={product.id} />}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }} onClick={() => navigate(productLink)}>
                <Typography my={2} fontSize="1.1rem" width="95%">
                    {product.description.slice(0, 200)}
                    <Typography level="body-sm" color="primary">
                        {product.description.length > 200 ? "...More Details" : ""}
                    </Typography>
                    {children}
                </Typography>
                <CardContent
                    sx={{ display: "flex", justifyContent: "space-between", letterSpacing: 0 }}
                    orientation="horizontal"
                >
                    <Typography level="body-xs">Date Posted: {getFormattedDate(product.createdAt)}</Typography>
                    <Typography level="body-xs">
                        {product.view} view{product.view > 1 ? "s" : ""}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
}

function DeleteProduct({ id }: { id: string }) {
    const [open, setOpen] = useState(false);
    const [deleteProduct, { error, loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
        update: (cache, { data: deleteProduct }) => {
            updateOnDelete(cache, deleteProduct?.deleteProduct?.id);
        },
    });

    return (
        <RequestStateWrapper loading={loading} error={error?.message} dataMessage="">
            <IconButton
                variant="plain"
                color="neutral"
                size="lg"
                sx={{ position: "absolute", right: "1rem" }}
                onClick={() => setOpen(true)}
            >
                <DeleteIcon />
            </IconButton>
            <ConfirmationModal
                open={open}
                setOpen={setOpen}
                dialogueText="Are you sure you want to delete this product?"
                onClick={() => {
                    deleteProduct({ variables: { id } });
                }}
            />
        </RequestStateWrapper>
    );
}
