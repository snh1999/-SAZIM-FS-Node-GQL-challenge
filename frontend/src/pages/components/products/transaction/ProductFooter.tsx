import { Product } from "../../../../constants/types/Product";
import RequestStateWrapper from "../../containers/RequestStateWrapper";
import { Typography } from "@mui/joy";
import PositionElement from "../../containers/PositionElement";

interface ProductFooterProps {
    product?: Product;
    userId?: string;
    children?: React.ReactNode;
    transactionHistory?: any[];
    loading: boolean;
}

export default function ProductFooter({
    product,
    children,
    userId,
    transactionHistory,
    loading,
}: Readonly<ProductFooterProps>) {
    // const { loading, data } = useQuery(TRANSACTION_HISTORY_QUERY, {
    //     variables: { id: product?.id ?? "random" },
    //     fetchPolicy: "no-cache",
    // });
    const lastHistory = transactionHistory?.slice(-1)[0];
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
