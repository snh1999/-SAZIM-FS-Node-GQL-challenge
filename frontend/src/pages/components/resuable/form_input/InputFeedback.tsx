import { Input } from "@mui/joy";
import { useFormContext } from "react-hook-form";
import { SxProps } from "@mui/joy/styles/types";

import { InputFeedbackContainer } from "../../containers";

interface FormInputProps {
    id: string;
    placeholder: string;
    type: string;
    styles?: SxProps;
    inputStyles?: SxProps;
}

export default function FormInput(props: FormInputProps) {
    const { id, placeholder, type, styles, inputStyles } = props;
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const error = errors[id]?.message ?? "";

    return (
        <InputFeedbackContainer styles={styles} message={error}>
            <Input size="lg" sx={inputStyles} id={id} type={type} placeholder={placeholder} {...register(id)} />
        </InputFeedbackContainer>
    );
}
