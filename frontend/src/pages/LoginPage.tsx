import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";

import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/resuable/FormContainer";
import CenteredElement from "../components/resuable/CenteredElement";
import FormPasswordInput from "../components/resuable/form_input/PasswordField";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "../components/resuable/form_input/InputFeedback";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLazyQuery } from "@apollo/client";
import CircularProgress from "@mui/joy/CircularProgress";
import { LOGIN_QUERY } from "../graphql/queries";
import { useContext } from "react";
import { AuthContext } from "../config/context/auth_context";
import { loginSchema } from "../config/yup/schema";

export default function LoginPage() {
    // const navigate = useNavigate();
    // const context = useContext(AuthContext);

    const methods = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(loginSchema),
    });

    const { handleSubmit } = methods;

    // const [login, { loading, error }] = useLazyQuery(LOGIN_QUERY);

    const handleLogin = (data: any) => {
        console.log(data);
        // login({ variables: { email: data.email, password: data.password } }).then((response) => {
        //     const token = response.data?.login?.token;
        //     const id = response.data?.login?.id;
        //     if (token) {
        //         context.login({ token, id });
        //         navigate("/");
        //     }
        // });
    };

    // if (loading) {
    //     return <CircularProgress size="lg" />;
    // }

    return (
        <div>
            <FormProvider {...methods}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <FormContainer
                        border="outlined"
                        titleText="SIGN IN"
                        containterWidth={35}
                        // errorMessage={error?.message}
                    >
                        <FormInput id="email" placeholder="Email" type="email" />
                        <FormPasswordInput id="password" placeholder="Password" />

                        <CenteredElement>
                            <Button onClick={handleSubmit(handleLogin)}>LOGIN</Button>
                        </CenteredElement>

                        <Typography endDecorator={<Link to="/register">Sign up</Link>} sx={{ alignSelf: "center" }}>
                            Don&apos;t have an account?
                        </Typography>
                    </FormContainer>
                </form>
            </FormProvider>
        </div>
    );
}
