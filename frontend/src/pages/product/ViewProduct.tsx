import { Box, Button, Input, Typography } from "@mui/joy";
import PositionElement from "../components/containers/PositionElement";
import { useState } from "react";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { VIEW_PRODUCT_QUERY } from "../../graphql/product/queries";
import RequestStateWrapper from "../components/containers/RequestStateWrapper";
import useAuth from "../../config/hooks/useAuth";

export default function ViewProduct() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(VIEW_PRODUCT_QUERY, { variables: { id } });

    const product = data?.getProduct;
    const {
        userData: { id: userID },
    } = useAuth();
    console.log(product?.ownerId, userID);

    const [openBuyModal, setBuyModalOpen] = useState(false);
    const [openRentModal, setRentModalOpen] = useState(false);

    //  rent date has to start after current rent period ends
    // buy is available after the last rent date

    return (
        <RequestStateWrapper loading={loading} error={error?.message} dataMessage="">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "70%" }}>
                <Typography fontSize={"2.2rem"}>{product?.title}</Typography>
                <Typography level="body-sm" fontSize={"1rem"}>
                    Categories: {product?.category.join(", ")}
                </Typography>
                <Typography level="body-sm" fontSize={"1rem"}>
                    Price: ${product?.price}
                </Typography>
                <Typography fontSize={"1.2rem"}>{product?.description}</Typography>
                <PositionElement position="end">
                    {product?.ownerId !== userID && (
                        <Box sx={{ display: "flex", gap: 5, mt: 10 }}>
                            <Button onClick={() => setRentModalOpen(true)}>Rent</Button>
                            <Button onClick={() => setBuyModalOpen(true)}>Buy</Button>
                        </Box>
                    )}
                </PositionElement>
            </Box>
            <ConfirmationModal
                open={openBuyModal}
                setOpen={setBuyModalOpen}
                dialogueText="Are you sure you want to buy this product?"
            />

            <ConfirmationModal
                open={openRentModal}
                setOpen={setRentModalOpen}
                dialogueText="Rental Period"
                rightText="Confirm rent"
                leftText="Go Back"
            >
                <Box sx={{ display: "flex", gap: 5 }}>
                    <Box>
                        From
                        <Input type="date"></Input>
                    </Box>
                    <Box>
                        To
                        <Input type="date"></Input>
                    </Box>
                </Box>
            </ConfirmationModal>
        </RequestStateWrapper>
    );
}
