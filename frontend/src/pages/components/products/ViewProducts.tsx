import { Box, Typography } from "@mui/joy";
import { Product } from "../../../constants/types/Product";
import ProductCard from "./ProductCard";
import PositionElement from "../resuable/containers/PositionElement";

export default function ViewProducts({ products, title }: Readonly<{ products: Product[]; title: string }>) {
    return (
        <PositionElement>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 600 }}>
                <Typography sx={{ textAlign: "center", fontSize: "2.3rem", fontWeight: "300" }}>{title}</Typography>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product}></ProductCard>
                ))}
            </Box>
        </PositionElement>
    );
}
