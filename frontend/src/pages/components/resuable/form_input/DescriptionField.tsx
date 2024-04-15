import { useFormContext } from "react-hook-form";
import { InputFeedbackContainer } from "../../containers";
import { Textarea } from "@mui/joy";

/**
 * Renders a DescriptionField component (eg- used for product creation/edit purpose).
 *
 * @param {string} id - The unique identifier for the input field.
 * @return {JSX.Element} The DescriptionField component.
 */
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
