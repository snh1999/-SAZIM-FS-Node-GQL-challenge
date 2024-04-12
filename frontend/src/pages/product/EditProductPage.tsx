import { Box, Button, FormControl, FormLabel } from "@mui/joy";
import { FormInput } from "../components/resuable/form_input/InputFeedback";
import { Category, Product, RentDuration } from "../../constants/types/Product";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { productCreationSchema } from "../../config/yup/schema/createProduct";
import { getProductCreationSteps } from "./helper/creationSteps";
import { AddRent } from "../components/products/AddProductPrice";
import SelectEnum from "../components/resuable/form_input/SelectEnum";
import PositionElement from "../components/containers/PositionElement";

export default function EditMyProduct() {
    const { id } = useParams();

    const product: Product = {
        id: "1",
        title: "test",
        categories: [Category.ELECTRONICS, Category.FURNITURE],
        description:
            "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,",
        createdAt: new Date(),
        ownerId: "test",
        price: 10,
        rentPrice: 10,
        rentDuration: RentDuration.DAY,
    };
    const methods = useForm({
        defaultValues: {
            ...product,
        },
        resolver: yupResolver(productCreationSchema),
    });

    const { handleSubmit, getValues } = methods;

    const handleSumbitClick = handleSubmit((data) => {
        console.log(data);
    });

    const productCreationSteps = getProductCreationSteps(getValues);
    return (
        <FormProvider {...methods}>
            <form onSubmit={(e) => e.preventDefault()}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <Box>
                        Title
                        {productCreationSteps[0].content}
                    </Box>
                    <Box>
                        Categories
                        {productCreationSteps[1].content}
                    </Box>
                    <Box>
                        Description
                        {productCreationSteps[2].content}
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            gap: 4,
                            justifyContent: "start",
                        }}
                    >
                        <Box sx={{ width: "20%" }}>
                            Price
                            <FormInput id="price" type="number" placeholder="Purchase Price" />
                        </Box>

                        <Box sx={{ width: "20%" }}>
                            Rent
                            <FormInput id="price" type="number" placeholder="Purchase Price" />
                        </Box>
                        <Box sx={{ width: "30%", mt: 3 }}>
                            <SelectEnum
                                placeholder="Select Option"
                                id="rentDuration"
                                multiple={false}
                                options={RentDuration}
                            />
                        </Box>
                    </Box>
                    <PositionElement position="end">
                        <Button onClick={handleSumbitClick}>Edit Product</Button>
                    </PositionElement>
                </Box>
            </form>
        </FormProvider>
    );
}
