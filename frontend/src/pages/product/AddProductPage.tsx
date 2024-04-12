import { FormProvider, useForm } from "react-hook-form";
import MultiPageForm from "../components/MultiPageForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { productCreationSchema } from "../../config/yup/schema/createProduct";
import { getProductCreationSteps } from "./helper/creationSteps";

export default function AddProductPage() {
    const methods = useForm({
        resolver: yupResolver(productCreationSchema),
    });
    const { handleSubmit, trigger, getValues } = methods;

    const handleSumbitClick = handleSubmit((data) => {
        console.log(data);
    });

    const productCreationSteps = getProductCreationSteps(getValues);

    return (
        <FormProvider {...methods}>
            <form onSubmit={(e) => e.preventDefault()}>
                <MultiPageForm onSubmit={handleSumbitClick} steps={productCreationSteps} trigger={trigger} />
            </form>
        </FormProvider>
    );
}
