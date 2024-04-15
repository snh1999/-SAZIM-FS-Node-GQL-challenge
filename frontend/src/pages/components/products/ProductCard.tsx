import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, IconButton, Sheet, Typography } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";

import { Category, Product, RentDuration } from "../../../constants/types/Product";
import ConfirmationModal from "../ConfirmationModal";
import { getEnumValues, getFormattedDate } from "../../../utils/helper";
import { updateOnDelete } from "../../../config/apollo_cache";
import RequestStateWrapper from "../containers/RequestStateWrapper";
import { DELETE_PRODUCT_MUTATION } from "../../../graphql/product/mutations";

interface Props {
    product: Product;
    showDelete?: boolean;
    productLink: string;
    children?: React.ReactNode;
}

/**
 * Renders a Product Card component necessary details, clickable card.
 *
 * @param {Readonly<Props>} product - The product object containing details like title, categories, price, description, and view count.
 * @param {string} productLink - The link to navigate to when the card is clicked (TO differentiate between my product and all products page).
 * @param {ReactNode} children - Additional components or text to be displayed within the card (eg- rent/buying info)
 * @param {boolean} showDelete - Boolean flag to determine if the delete action should be shown.
 * @return {JSX.Element} The JSX element representing the Product Card component.
 */
export default function ProductCard({ product, productLink, children, showDelete = false }: Readonly<Props>) {
    const navigate = useNavigate();
    console.log(product);
    const categories = getEnumValues(Category, product.category);
    const rentDuration = RentDuration[product.rentDuration];
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
                <Typography level="body-sm">Categories: {categories}</Typography>
                <Typography level="body-sm">
                    Price: ${product.price} | Rent: ${product.rentPrice} {rentDuration}
                </Typography>
            </Sheet>

            {showDelete && <DeleteButton id={product.id} />}
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

function DeleteButton({ id }: { id: string }) {
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
