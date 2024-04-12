import { Box, Button } from "@mui/joy";
import { Category, RentDuration } from "../../constants/types/Product";
import PositionElement from "../components/containers/PositionElement";
import ViewProducts from "../components/products/ViewProducts";

export default function MyProducts() {
    const products = [
        {
            id: "1",
            title: "test",
            categories: [Category.ELECTRONICS, Category.HOME_APPLIANCES],
            description:
                "Lorem ipsum dolor sit amet, Loren ipsum dolor sit amet,Loren ipsum dolor sit amet,Loren ipsum dolor sit amet,",
            createdAt: new Date(),
            ownerId: "test",
            price: 1,
            rentPrice: 1,
            rentDuration: RentDuration.DAY,
        },
        {
            id: "1",
            title: "test",
            categories: [Category.ELECTRONICS, Category.HOME_APPLIANCES],
            description:
                "Lorem ipsum dolor sit amet, Loren ipsum dolor sit amet,Loren ipsum dolor sit amet,Loren ipsum dolor sit amet,",
            createdAt: new Date(),
            ownerId: "test",
            price: 1,
            rentPrice: 1,
            rentDuration: RentDuration.DAY,
        },
    ];
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "50%", minWidth: 600 }}>
            <ViewProducts products={products} title="MY PRODUCTS" />
            <PositionElement position="end">
                <Button>Add Product</Button>
            </PositionElement>
        </Box>
    );
}
