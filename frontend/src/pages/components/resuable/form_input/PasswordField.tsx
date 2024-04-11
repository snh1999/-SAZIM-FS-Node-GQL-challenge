import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { InputFeedbackContainer } from "../containers/InputFeedbackContainer";

interface Props {
    id: string;
    placeholder?: string;
}

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
