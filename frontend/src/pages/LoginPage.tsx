import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";

import { Link } from "react-router-dom";
import FormContainer from "../components/resuable/FormContainer";
import CenteredElement from "../components/resuable/CenteredElement";
import { useState } from "react";
import PasswordFieldInput from "../components/resuable/PasswordField";

export default function LoginPage() {
    const [password, setPassword] = useState("");

    return (
        <div>
            <FormContainer border="outlined" titleText="SIGN IN" containterWidth={35}>
                <Input size="lg" name="email" type="email" placeholder="Email" />
                <PasswordFieldInput getInputFeedback={(_) => ""} value={password} setValue={setPassword} />

                <CenteredElement>
                    <Button size="lg" sx={{ mt: 2 }} type="submit">
                        LOGIN
                    </Button>
                </CenteredElement>

                <Typography
                    endDecorator={<Link to="/register">Sign up</Link>}
                    fontSize="md"
                    sx={{ alignSelf: "center" }}
                >
                    Don&apos;t have an account?
                </Typography>
            </FormContainer>
        </div>
    );
}
