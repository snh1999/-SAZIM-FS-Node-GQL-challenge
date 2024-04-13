import { Box, Button } from "@mui/joy";
import PositionElement from "../components/containers/PositionElement";
import ViewProducts from "../components/products/ViewProducts";
import { useQuery } from "@apollo/client";
import { MY_PRODUCTS_QUERY } from "../../graphql/product/queries";
import RequestStateWrapper from "../components/containers/RequestStateWrapper";
import { Link } from "react-router-dom";

export default function MyProducts() {
    const { loading, error, data } = useQuery(MY_PRODUCTS_QUERY);

    return (
        <RequestStateWrapper loading={loading} error={error?.message} dataMessage="">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "50%", minWidth: 600 }}>
                <ViewProducts
                    forMyPage={true}
                    linkPrefix="/product/my/"
                    products={data?.getMyProducts}
                    title="MY PRODUCTS"
                />
                <PositionElement position="end">
                    <Link to="/product/new">
                        <Button>Add Product</Button>
                    </Link>
                </PositionElement>
            </Box>
        </RequestStateWrapper>
    );
}
