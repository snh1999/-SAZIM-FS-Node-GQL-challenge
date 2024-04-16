import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

import EditProductForm from "../components/products/EditProductForm";
import { PREVIEW_PRODUCT_QUERY } from "../../graphql/product/queries";
import { getProductToDefaultValue } from "../../constants/types/Product";
import { productCreationSchema } from "../../config/yup/schema/createProduct";
import RequestStateWrapper from "../components/containers/RequestStateWrapper";

export default function EditMyProduct() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(PREVIEW_PRODUCT_QUERY, { variables: { id }, fetchPolicy: "no-cache" });
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
