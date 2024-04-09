import { Stack, Typography } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

interface CustomInputProps {
    children?: React.ReactNode;
    message: unknown;
    styles?: SxProps;
}

export function InputFeedbackContainer({ children, message, styles }: CustomInputProps) {
    return (
        <Stack sx={styles} spacing={0.5}>
            {children}
            {typeof message === "string" && message && (
                <Typography level="body-xs" sx={{ alignSelf: "flex-end" }}>
                    <b>{message.toUpperCase()}</b>
                </Typography>
            )}
        </Stack>
    );
}
