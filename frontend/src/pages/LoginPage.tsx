import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";

import { Link, useLocation, useNavigate } from "react-router-dom";
import FormContainer from "./components/containers/FormContainer";
import PositionElement from "./components/containers/PositionElement";
import FormPasswordInput from "./components/resuable/form_input/PasswordField";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "./components/resuable/form_input/InputFeedback";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_QUERY } from "../graphql/user/queries";
import { loginSchema } from "../config/yup/schema";
import useAuth from "../config/hooks/useAuth";
import RequestStateWrapper from "./components/containers/RequestStateWrapper";

export default function LoginPage() {
    const navigate = useNavigate();
    const context = useAuth();

    const location = useLocation();
    const fromPath = location.state?.from?.pathname || "/";

    const methods = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(loginSchema),
    });

    const [login, { loading, error }] = useLazyQuery(LOGIN_QUERY);

    const handleLogin = methods.handleSubmit((data) => {
        login({ variables: { email: data.email, password: data.password } }).then((response) => {
            const token = response.data?.login?.token;
            const id = response.data?.login?.id;
            console.log(response);

            if (token) {
                context.login({ token, id });
                navigate(fromPath, { replace: true });
            }
        });
    });

    return (
        <RequestStateWrapper error={error?.message} loading={loading} dataMessage="Logged in successfully">
            <FormProvider {...methods}>
                <FormContainer border="outlined" titleText="SIGN IN" containterWidth={35}>
                    <FormInput id="email" placeholder="Email" type="email" />
                    <FormPasswordInput id="password" placeholder="Password" />

                    <PositionElement>
                        <Button onClick={handleLogin}>LOGIN</Button>
                    </PositionElement>

                    <Typography endDecorator={<Link to="/register">Sign up</Link>} sx={{ alignSelf: "center" }}>
                        Don&apos;t have an account?
                    </Typography>
                </FormContainer>
            </FormProvider>
        </RequestStateWrapper>
    );
}
