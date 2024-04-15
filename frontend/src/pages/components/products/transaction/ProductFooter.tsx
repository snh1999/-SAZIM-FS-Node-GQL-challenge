import { Typography } from "@mui/joy";
import { useEffect } from "react";

import { Product } from "../../../../constants/types/Product";
import { PositionElement, RequestStateWrapper } from "../../containers";

interface ProductFooterProps {
    product?: Product;
    userId?: string;
    children?: React.ReactNode;
    transactionHistory?: any[];
    loading: boolean;
}

/**
 * Renders Buttons/State of Product with appropriate message.
 *
 * @param {Readonly<ProductFooterProps>} product - Product to retrieve ownerId and get if it is loaded
 * @param {ReactNode} children - The child elements to be rendered within the footer (if it is buyable)
 * @param {string} userId - logged in user id (useAuth creates some issue with multiple re-rendering)
 * @param {TransactionHistory[]} transactionHistory - The transaction history associated with the product.
 * @param {boolean} loading - A boolean indicating transaction history loading state.
 * @return {ReactNode} The rendered product footer component.
 */
export default function ProductFooter({
    product,
    children,
    userId,
    transactionHistory,
    loading,
}: Readonly<ProductFooterProps>) {
    const lastHistory = transactionHistory?.slice(-1)[0];

    useEffect(() => {}, [transactionHistory]);

    const isSold = lastHistory?.transactionType == "SELL";
    const isMyProduct = product?.ownerId === userId;
    const isBoughtByUser = isSold && isMyProduct;
    const isSoldByUser = isSold && lastHistory?.originalOwnerId === userId;
    const isBuyableProduct = !isMyProduct && !isSold;

    return (
        <RequestStateWrapper loading={loading} dataMessage="">
            <PositionElement position="end">
                {isBuyableProduct || !product ? (
                    children
                ) : (
                    <Typography border="outlined" color="danger">
                        <b>
                            {isBoughtByUser
                                ? "You Bought this Product"
                                : isSoldByUser
                                ? "You Sold this Product"
                                : "Product Sold"}
                        </b>
                    </Typography>
                )}
            </PositionElement>
        </RequestStateWrapper>
    );
}
