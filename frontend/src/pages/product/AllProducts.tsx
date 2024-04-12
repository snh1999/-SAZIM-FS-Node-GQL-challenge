import { Box } from "@mui/joy";
import { Category, RentDuration } from "../../constants/types/Product";
import ViewProducts from "../components/products/ViewProducts";

export default function AllProducts() {
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
            <ViewProducts products={products} title="ALL PRODUCTS" />
        </Box>
    );
}
