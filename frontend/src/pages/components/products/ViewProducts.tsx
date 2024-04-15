import { Box, Typography } from "@mui/joy";
import { Product } from "../../../constants/types/Product";
import ProductCard from "./ProductCard";
import PositionElement from "../containers/PositionElement";

interface Props {
    products: Product[];
    title: string;
    linkPrefix: string;
    forMyPage?: boolean;
}

/**
 * View The Page title for my products and all products.
 * Deligate the product rendering task to Product card component
 *
 * @param {Readonly<Props>} products - the list of products to display
 * @param {string} title - the title to display above the list of products
 * @param {string} linkPrefix - the prefix to add to each product link (differentiate between my products and all products page)
 * @param {boolean} forMyPage - flag indicating if the products are for the user's page
 * @return {JSX.Element} the JSX element representing the list of products
 */
export default function ViewProducts({ products, title, linkPrefix, forMyPage = false }: Readonly<Props>) {
    if (!products || products.length === 0) {
        return <Typography level="title-lg">No Products Found</Typography>;
    }
    return (
        <PositionElement>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 600 }}>
                <Typography sx={{ textAlign: "center", fontSize: "2.2rem", fontWeight: "300" }}>{title}</Typography>
                {products.map((product) => (
                    <ProductCard
                        productLink={linkPrefix + product.id}
                        key={product.id}
                        showDelete={forMyPage}
                        product={product}
                    ></ProductCard>
                ))}
            </Box>
        </PositionElement>
    );
}
