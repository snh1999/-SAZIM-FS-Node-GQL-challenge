import { Box } from "@mui/joy";
import ViewProducts from "../components/products/ViewProducts";
import { useQuery } from "@apollo/client";
import { ALL_PRODUCTS_QUERY } from "../../graphql/product/queries";
import RequestStateWrapper from "../components/containers/RequestStateWrapper";

export default function AllProducts() {
    const { loading, error, data } = useQuery(ALL_PRODUCTS_QUERY, { fetchPolicy: "no-cache" });

    return (
        <RequestStateWrapper loading={loading} error={error?.message} dataMessage="">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "50%", minWidth: 600 }}>
                <ViewProducts linkPrefix="/product/" products={data?.getAllProducts} title="ALL PRODUCTS" />
            </Box>
        </RequestStateWrapper>
    );
}
