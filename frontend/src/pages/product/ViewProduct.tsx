import { Box, Button, Input, Typography } from "@mui/joy";
import { Category, Product, RentDuration } from "../../constants/types/Product";
import PositionElement from "../components/resuable/containers/PositionElement";
import { useState } from "react";
import { ConfirmationModal } from "../components/ConfirmationModal";

export default function ViewProduct() {
    // const { id } = useParams();

    const product: Product = {
        id: "1",
        title: "test",
        categories: [Category.ELECTRONICS],
        description:
            "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,",
        createdAt: new Date(),
        ownerId: "test",
        price: 10,
        rentPrice: 10,
        rentDuration: RentDuration.DAY,
    };
    const [openBuyModal, setBuyModalOpen] = useState(false);
    const [openRentModal, setRentModalOpen] = useState(false);

    //  rent date has to start after current rent period ends
    // buy is available after the last rent date

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "70%" }}>
                <Typography fontSize={"2.2rem"}>{product.title}</Typography>
                <Typography level="body-sm" fontSize={"1rem"}>
                    Categories: {product.categories.join(", ")}
                </Typography>
                <Typography level="body-sm" fontSize={"1rem"}>
                    Price: ${product.price}
                </Typography>
                <Typography level="title-md">{product.description}</Typography>
                <PositionElement position="end">
                    <Box sx={{ display: "flex", gap: 5, mt: 10 }}>
                        <Button onClick={() => setRentModalOpen(true)}>Rent</Button>
                        <Button onClick={() => setBuyModalOpen(true)}>Buy</Button>
                    </Box>
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
        </>
    );
}
