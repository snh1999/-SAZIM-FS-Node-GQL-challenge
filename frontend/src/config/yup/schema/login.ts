import * as yup from "yup";
import { RequiredEmailValidation, RequiredStringValidation } from "..";

export const loginSchema = yup.object().shape({
    email: RequiredEmailValidation,
    password: RequiredStringValidation,
});
