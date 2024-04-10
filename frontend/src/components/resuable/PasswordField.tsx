import Input from "@mui/joy/Input";
import InputFeedBack from "./InputFeedback";
import IconButton from "@mui/joy/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

interface Props {
    getInputFeedback(value: string): string;
    value: string;
    setValue: (value: string) => void;
    placeholder?: string;
}

export default function PasswordFieldInput({ getInputFeedback, value, setValue, placeholder = "Password" }: Props) {
    const [showPassword, setShowPassword] = useState(false);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <InputFeedBack getInputFeedback={getInputFeedback} value={value}>
            <Input
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
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
            {/* TODO - password repeat */}
            {/* TODO - use the value change on blur */}
        </InputFeedBack>
    );
}
