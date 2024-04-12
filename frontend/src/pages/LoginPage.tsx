import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";

import { Link, useNavigate } from "react-router-dom";
import FormContainer from "./components/resuable/containers/FormContainer";
import PositionElement from "./components/resuable/containers/PositionElement";
import FormPasswordInput from "./components/resuable/form_input/PasswordField";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "./components/resuable/form_input/InputFeedback";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLazyQuery } from "@apollo/client";
import CircularProgress from "@mui/joy/CircularProgress";
import { LOGIN_QUERY } from "../graphql/queries";
import { loginSchema } from "../config/yup/schema";
import useAuth from "../config/hooks/useAuth";

export default function LoginPage() {
    const navigate = useNavigate();
    const context = useAuth();

    const methods = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(loginSchema),
    });

    const { handleSubmit } = methods;

    const [login, { loading, error }] = useLazyQuery(LOGIN_QUERY);

    const handleLogin = (data: any) => {
        login({ variables: { email: data.email, password: data.password } }).then((response) => {
            const token = response.data?.login?.token;
            const id = response.data?.login?.id;
            if (token) {
                context.login({ token, id });
                navigate("/");
            }
        });
    };

    if (loading) {
        return <CircularProgress size="lg" />;
    }
    return (
        <div>
            <FormProvider {...methods}>
                <FormContainer border="outlined" titleText="SIGN IN" containterWidth={35} errorMessage={error?.message}>
                    <FormInput id="email" placeholder="Email" type="email" />
                    <FormPasswordInput id="password" placeholder="Password" />

                    <PositionElement>
                        <Button onClick={handleSubmit(handleLogin)}>LOGIN</Button>
                    </PositionElement>

                    <Typography endDecorator={<Link to="/register">Sign up</Link>} sx={{ alignSelf: "center" }}>
                        Don&apos;t have an account?
                    </Typography>
                </FormContainer>
            </FormProvider>
        </div>
    );
}
