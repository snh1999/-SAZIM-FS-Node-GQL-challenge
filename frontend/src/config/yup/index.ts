import * as yup from "yup";
import { REQUIRED_FIELD_FEEDBACK, INVALID_EMAIL_FEEDBACK } from "../../constants/feedbacks";

export const AlphaValidation = yup.string().matches(/^[a-zA-Z ]*$/, "Only characters Allowed.");

export const RequiredAlphaValidation = AlphaValidation.required(REQUIRED_FIELD_FEEDBACK);

export const NoSymbolValidation = yup
    .string()
    .matches(/^[^.]*$/, {
        message: "No symnols",
    })
    .matches(/^[^!@#$%^&*+=<>:;|~]*$/, {
        message: "No symbols",
    });

export const PhoneValidation = NoSymbolValidation.matches(/^[\s\d)(-]+$/, {
    message: "Invalid Input.",
}).length(11, "Must be 11 digits");

export const EmailValidation = yup.string().email(INVALID_EMAIL_FEEDBACK);

export const RequiredEmailValidation = EmailValidation.required(REQUIRED_FIELD_FEEDBACK);

export const RequiredStringValidation = yup.string().required(REQUIRED_FIELD_FEEDBACK);
