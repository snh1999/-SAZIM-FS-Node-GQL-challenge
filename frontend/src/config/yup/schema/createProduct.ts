import * as yup from "yup";
import { RequiredStringValidation } from "..";

import { Category, RentDuration } from "../../../constants/types/Product";
import { REQUIRED_FIELD_FEEDBACK, REQUIRED_NUMBER_FEEDBACK } from "../../../constants/feedbacks";

export const productCreationSchema = yup.object().shape({
    title: RequiredStringValidation,
    description: RequiredStringValidation,
    categories: yup.array(yup.mixed<Category>().oneOf(Object.values(Category))).required(REQUIRED_FIELD_FEEDBACK),
    price: yup.number().typeError(REQUIRED_NUMBER_FEEDBACK).positive().required(REQUIRED_FIELD_FEEDBACK),
    rentPrice: yup.number().typeError(REQUIRED_NUMBER_FEEDBACK).positive().required(REQUIRED_FIELD_FEEDBACK),
    rentDuration: yup
        .mixed<RentDuration>()
        .oneOf(Object.values(RentDuration), "Select one")
        .required(REQUIRED_FIELD_FEEDBACK),
});
