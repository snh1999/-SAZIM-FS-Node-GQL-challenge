import { FormProvider, useForm } from "react-hook-form";
import MultiPageForm from "./components/multi-page-form/MultiPageForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { productCreationSchema } from "../config/yup/schema/createProduct";
import { FormInput } from "./components/resuable/form_input/InputFeedback";
import SelectEnum from "./components/resuable/form_input/MultiSelect";
import { Category } from "../constants/types/Product";
import DescriptionField from "./components/resuable/form_input/DescriptionField";
import PricesField from "./components/products/AddProductPrice";
import ProductSummary from "./components/products/AddProductsSummary";

export default function AddProductPage() {
    const methods = useForm({
        resolver: yupResolver(productCreationSchema),
    });
    const { handleSubmit, trigger, getValues } = methods;

    const handleSumbitClick = handleSubmit((data) => {
        console.log(data);
    });

    const steps = [
        {
            title: "Select a title for your product",
            content: <FormInput id="title" type="text" placeholder="" />,
            inputField: ["title"],
        },
        {
            title: "Select Categories",
            content: <SelectEnum placeholder="Select a category" id="category" options={Category} />,
            inputField: ["category"],
        },
        {
            title: "Select Description",
            content: <DescriptionField id="description" />,
            inputField: ["description"],
        },
        {
            title: "Select Price",
            content: <PricesField />,
            inputField: ["price", "rentPrice", "rentDuration"],
        },
        {
            title: "Summary",
            content: (
                <ProductSummary
                    title={getValues("title")}
                    categories={getValues("category")}
                    description={getValues("description")}
                    price={getValues("price")}
                    rentPrice={getValues("rentPrice")}
                    rentDuration={getValues("rentDuration")}
                />
            ),
            inputField: [],
        },
    ];

    return (
        <FormProvider {...methods}>
            <form onSubmit={(e) => e.preventDefault()}>
                <MultiPageForm onSubmit={handleSumbitClick} steps={steps} trigger={trigger} />
            </form>
        </FormProvider>
    );
}
