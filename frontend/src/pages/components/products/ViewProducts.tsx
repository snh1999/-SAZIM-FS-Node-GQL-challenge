import { Box, Typography } from "@mui/joy";
import { Category, Product, RentDuration } from "../../../constants/types/Product";
import ProductCard from "./ProductCard";
import PositionElement from "../containers/PositionElement";
import { getEnumValues } from "../../../utils/helper";

interface Props {
    products: Product[];
    title: string;
    linkPrefix: string;
    forMyPage?: boolean;
}

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
                        product={{
                            ...product,
                            categories: getEnumValues(Category, product.category),
                            rentDuration: RentDuration[product.rentDuration],
                        }}
                    ></ProductCard>
                ))}
            </Box>
        </PositionElement>
    );
}
