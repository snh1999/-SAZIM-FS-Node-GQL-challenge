import { Box, Button } from "@mui/joy";
import { useMutation } from "@apollo/client";
import { useFormContext } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import FormInput from "../resuable/form_input/InputFeedback";
import SelectEnum from "../resuable/form_input/SelectEnum";
import { updateOnUpdate } from "../../../config/apollo_cache";
import { PositionElement, RequestStateWrapper } from "../containers";
import { getEnumLabel, getEnumLabels } from "../../../utils/helper";
import { Category, RentDuration } from "../../../constants/types/Product";
import { getProductCreationSteps } from "../../product/helper/creationSteps";
import { UPDATE_PRODUCT_MUTATION } from "../../../graphql/product/mutations";

export default function EditProductForm() {
    const { id } = useParams();

    const { handleSubmit } = useFormContext();
    const productCreationSteps = getProductCreationSteps();
    const navigate = useNavigate();

    const [updateProduct, { loading, error, data }] = useMutation(UPDATE_PRODUCT_MUTATION, {
        update: (cache, { data: updateProduct }) => {
            updateOnUpdate(cache, updateProduct.updateProduct);
        },
    });

    const handleSumbitClick = handleSubmit((editData) => {
        updateProduct({
            variables: {
                id,
                title: editData.title,
                description: editData.description,
                price: editData.price,
                rentPrice: editData.rentPrice,
                category: getEnumLabels(Category, editData.categories),
                rentDuration: getEnumLabel(RentDuration, editData.rentDuration),
            },
        });
        setTimeout(() => navigate(`/product/my`), 1000);
    });

    return (
        <RequestStateWrapper dataMessage="Updated Successfully" loading={loading} data={data} error={error?.message}>
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
                        <FormInput id="rentPrice" type="number" placeholder="Purchase Price" />
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
        </RequestStateWrapper>
    );
}
