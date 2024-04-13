import { FormProvider, useForm } from "react-hook-form";
import MultiPageForm from "../components/MultiPageForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { productCreationSchema } from "../../config/yup/schema/createProduct";
import { getProductCreationSteps } from "./helper/creationSteps";
import { CREATE_PRODUCT_MUTATION } from "../../graphql/product/mutations";
import { useMutation } from "@apollo/client";
import { getEnumLabel, getEnumLabels } from "../../utils/helper";
import { Category, RentDuration } from "../../constants/types/Product";
import RequestStateWrapper from "../components/containers/RequestStateWrapper";
import { useNavigate } from "react-router-dom";
import { updateOnNew } from "../../config/apollo_cache";

export default function AddProductPage() {
    const methods = useForm({
        resolver: yupResolver(productCreationSchema),
    });
    const { handleSubmit, trigger } = methods;
    const navigate = useNavigate();

    const [createProduct, { loading, error, data }] = useMutation(CREATE_PRODUCT_MUTATION, {
        update(cache, { data: { createProduct } }) {
            console.log(createProduct);
            updateOnNew(cache, createProduct);
            //     const { getMyProducts } = cache.readQuery({ query: MY_PRODUCTS_QUERY });
            //     cache.writeQuery({
            //         query: My_PRODUCTS_QUERY,
            //         data: { getAllProducts: getAllProducts.concat([createProduct]) },
            //     });
        },
    });

    const handleSumbitClick = handleSubmit((data) => {
        createProduct({
            variables: {
                title: data.title,
                description: data.description,
                price: data.price,
                rentPrice: data.rentPrice,
                category: getEnumLabels(Category, data.categories),
                rentDuration: getEnumLabel(RentDuration, data.rentDuration),
            },
        });
        setTimeout(() => {
            navigate("/product/my");
        }, 1000);
    });

    const productCreationSteps = getProductCreationSteps();

    return (
        <RequestStateWrapper dataMessage="Added Successfully" loading={loading} data={data} error={error?.message}>
            <FormProvider {...methods}>
                <MultiPageForm onSubmit={handleSumbitClick} steps={productCreationSteps} trigger={trigger} />
            </FormProvider>
        </RequestStateWrapper>
    );
}
