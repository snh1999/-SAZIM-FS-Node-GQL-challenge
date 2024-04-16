import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { InputFeedbackContainer } from "../../containers";

interface Props {
    id: string;
    placeholder?: string;
}

/**
 * Generates a password input form field with toggle visibility functionality.
 *
 * @param {Props} id - The unique identifier for the input field
 * @param {Props} placeholder - The placeholder text for the input field (default is "Password")
 * @return {JSX.Element} The password input form field component
 */
export default function FormPasswordInput({ id, placeholder = "Password" }: Props) {
    const [showPassword, setShowPassword] = useState(false);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const {
        register,
        formState: { errors },
    } = useFormContext();
    const error = errors[id]?.message ?? "";

    return (
        <InputFeedbackContainer message={error}>
            <Input
                id={id}
                type={showPassword ? "text" : "password"}
                endDecorator={
                    <IconButton
                        //   aria-label="toggle password visibility"
                        onClick={() => setShowPassword((show) => !show)}
                        onMouseDown={handleMouseDownPassword}
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                }
                variant="outlined"
                size="lg"
                placeholder={placeholder}
                {...register(id)}
            />
        </InputFeedbackContainer>
    );
}
