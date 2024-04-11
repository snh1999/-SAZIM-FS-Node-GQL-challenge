import { useFormContext } from "react-hook-form";
import { InputFeedbackContainer } from "../containers/InputFeedbackContainer";
import { Textarea } from "@mui/joy";

export default function DescriptionField({ id }: Readonly<{ id: string }>) {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const error = errors[id]?.message ?? "";

    return (
        <InputFeedbackContainer message={error}>
            <Textarea size="lg" sx={{ height: "200px" }} {...register(id)} />
        </InputFeedbackContainer>
    );
}
