import { Box, Button } from "@mui/joy";
import { FormInput } from "../components/resuable/form_input/InputFeedback";
import { Category, RentDuration, getProductToDefaultValue } from "../../constants/types/Product";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { productCreationSchema } from "../../config/yup/schema/createProduct";
import { getProductCreationSteps } from "./helper/creationSteps";
import SelectEnum from "../components/resuable/form_input/SelectEnum";
import PositionElement from "../components/containers/PositionElement";
import { useMutation, useQuery } from "@apollo/client";
import { PREVIEW_PRODUCT_QUERY } from "../../graphql/product/queries";
import RequestStateWrapper from "../components/containers/RequestStateWrapper";
import { getEnumLabel, getEnumLabels } from "../../utils/helper";
import { UPDATE_PRODUCT_MUTATION } from "../../graphql/product/mutations";
import { useEffect } from "react";
import { updateOnUpdate } from "../../config/apollo_cache";

export default function EditMyProduct() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(PREVIEW_PRODUCT_QUERY, { variables: { id } });
    const product = getProductToDefaultValue(data?.getProduct);

    const methods = useForm({
        defaultValues: {
            ...product,
            categories: data?.getProduct?.category,
        },
        resolver: yupResolver(productCreationSchema),
    });

    useEffect(() => {
        if (product) {
            methods.reset({ ...product }, { keepDefaultValues: true });
        }
    }, [data]);

    return (
        <RequestStateWrapper dataMessage="" loading={loading} data={product !== undefined} error={error?.message}>
            <FormProvider {...methods}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <EditProductForm />
                </form>
            </FormProvider>
        </RequestStateWrapper>
    );
}

function EditProductForm() {
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
