import * as yup from "yup";
import {
    AlphaValidation,
    PhoneValidation,
    RequiredAlphaValidation,
    RequiredEmailValidation,
    RequiredStringValidation,
} from "..";

export const registerSchema = yup.object().shape({
    firstName: RequiredAlphaValidation,
    lastName: AlphaValidation,
    email: RequiredEmailValidation,
    address: yup.string(),
    phone: PhoneValidation,
    password: RequiredStringValidation.min(4, "Must be at least 4 characters"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
});
