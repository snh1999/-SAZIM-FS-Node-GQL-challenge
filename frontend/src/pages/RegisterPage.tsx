import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "./components/containers/FormContainer";
import PositionElement from "./components/containers/PositionElement";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "./components/resuable/form_input/InputFeedback";

import FormPasswordInput from "./components/resuable/form_input/PasswordField";
import { registerSchema } from "../config/yup/schema/register";
import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "../graphql/user/mutations";
import RequestStateWrapper from "./components/containers/RequestStateWrapper";

export default function RegisterPage() {
    const navigate = useNavigate();

    const methods = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            address: "",
            email: "",
            password: "",
            phone: "",
        },
        resolver: yupResolver(registerSchema),
    });

    const [register, { loading, error, data }] = useMutation(REGISTER_MUTATION);

    const handleRegister = methods.handleSubmit((data) => {
        register({
            variables: {
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                email: data.email,
                phone: data.phone,
                password: data.password,
            },
        }).then(() => {
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        });
    });

    return (
        <RequestStateWrapper dataMessage="Registered Successfully" loading={loading} data={data} error={error?.message}>
            <FormProvider {...methods}>
                <FormContainer border="outlined" titleText="REGISTER">
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <FormInput styles={{ width: "49%" }} id="firstName" placeholder="First Name" type="text" />
                        <FormInput styles={{ width: "49%" }} id="lastName" placeholder="Last Name" type="text" />
                    </Box>

                    <FormInput id="address" type="text" placeholder="Address" />

                    <Box sx={{ display: "flex", gap: 2 }}>
                        <FormInput styles={{ width: "49%" }} id="email" placeholder="Email" type="email" />
                        <FormInput styles={{ width: "49%" }} id="phone" placeholder="Phone" type="phone" />
                    </Box>

                    <FormPasswordInput id="password" placeholder="Password" />
                    <FormPasswordInput id="confirmPassword" placeholder="ConfirmPassword" />

                    <PositionElement>
                        <Button onClick={handleRegister}>REGISTER</Button>
                    </PositionElement>

                    <Typography
                        endDecorator={<Link to="/login">Sign In</Link>}
                        fontSize="md"
                        sx={{ alignSelf: "center" }}
                    >
                        Already have an account?
                    </Typography>
                </FormContainer>
            </FormProvider>
        </RequestStateWrapper>
    );
}
