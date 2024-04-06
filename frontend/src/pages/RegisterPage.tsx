import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import { useState } from "react";
import { Link } from "react-router-dom";
import getRegisterPasswordFeedback from "../utils/validations/registerPassword";
import getPasswordRepeatFeedback from "../utils/validations/passwordRepeat";
import PasswordFieldInput from "../components/resuable/PasswordField";
import FormContainer from "../components/resuable/FormContainer";
import CenteredElement from "../components/resuable/CenteredElement";

export default function RegisterPage() {
    const [password, setPassword] = useState("");

    return (
        <div>
            <FormContainer border="outlined" titleText="REGISTER">
                {/* TODO- can not be numbers or special characters */}

                <Box sx={{ display: "flex", gap: 2 }}>
                    <Input size="lg" sx={{ flex: 1 }} name="firstName" type="text" placeholder="First Name" />
                    <Input size="lg" sx={{ flex: 1 }} name="lastName" type="text" placeholder="Last Name" />
                </Box>

                <Input size="lg" name="address" type="text" placeholder="Address" />

                <Box sx={{ display: "flex", gap: 2 }}>
                    <Input size="lg" sx={{ flex: 1 }} name="email" type="email" placeholder="Email" />
                    <Input size="lg" sx={{ flex: 1 }} name="phone" type="phone" placeholder="Phone" />
                </Box>

                <PasswordFieldInput
                    getInputFeedback={getRegisterPasswordFeedback}
                    value={password}
                    setValue={setPassword}
                />

                <PasswordFieldInput
                    getInputFeedback={(value) => getPasswordRepeatFeedback(value, password)}
                    value={password}
                    setValue={setPassword}
                    placeholder="Repeat Password"
                />
                <CenteredElement>
                    <Button size="lg" sx={{ mt: 2 }} type="submit">
                        REGISTER
                    </Button>
                </CenteredElement>

                <Typography endDecorator={<Link to="/login">Sign In</Link>} fontSize="md" sx={{ alignSelf: "center" }}>
                    Already have an account?
                </Typography>
            </FormContainer>
        </div>
    );
}
