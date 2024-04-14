import { Box, Button, Typography } from "@mui/joy";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { TRANSACTION_HISTORY_QUERY, VIEW_PRODUCT_QUERY } from "../../graphql/product/queries";
import RequestStateWrapper from "../components/containers/RequestStateWrapper";
import useAuth from "../../config/hooks/useAuth";
import { BuyProduct, RentProduct } from "../components/products/transaction/TansactionModals";
import ProductFooter from "../components/products/transaction/ProductFooter";

export default function ViewProduct() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(VIEW_PRODUCT_QUERY, { variables: { id } });

    const { loading: loadingHistory, data: dataHistory } = useQuery(TRANSACTION_HISTORY_QUERY, {
        variables: { id },
        fetchPolicy: "no-cache",
    });

    const product = data?.getProduct;
    const {
        userData: { id: userID },
    } = useAuth();

    const [openBuyModal, setBuyModalOpen] = useState(false);
    const [openRentModal, setRentModalOpen] = useState(false);

    return (
        <RequestStateWrapper loading={loading} error={error?.message} dataMessage="">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "50%", minWidth: 600 }}>
                <Typography fontSize={"2.2rem"}>{product?.title}</Typography>
                <Typography level="body-sm" fontSize={"1rem"}>
                    Categories: {product?.category.join(", ")}
                </Typography>
                <Typography level="body-sm" fontSize={"1rem"}>
                    Price: ${product?.price}
                </Typography>
                <Typography fontSize={"1.2rem"}>{product?.description}</Typography>
                <ProductFooter
                    product={product}
                    userId={userID}
                    transactionHistory={dataHistory?.getTransactionHistory}
                    loading={loadingHistory}
                >
                    <Box sx={{ display: "flex", gap: 5, mt: 10 }}>
                        <Button onClick={() => setRentModalOpen(true)}>Rent</Button>
                        <Button onClick={() => setBuyModalOpen(true)}>Buy</Button>
                    </Box>
                </ProductFooter>
            </Box>

            <BuyProduct openModal={openBuyModal} setOpenModal={setBuyModalOpen} productId={id} />
            <RentProduct
                openModal={openRentModal}
                setOpenModal={setRentModalOpen}
                transactionHistory={dataHistory?.getTransactionHistory}
                productId={id}
            />
        </RequestStateWrapper>
    );
}
