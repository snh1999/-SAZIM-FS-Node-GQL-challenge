import { Stack, Typography } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

interface Props {
    children?: React.ReactNode;
    message: unknown;
    styles?: SxProps;
}

/**
 * Generate a container for input to show custom error message below input field
 *
 * @param {ReactNode} children - The input field/other child component.
 * @param {string | undefined} message - The feedback(error) message to display.
 * @param {object} styles - Custom styles to be applied to the container.
 * @return {JSX.Element} The container with the input feedback elements.
 */
export default function InputFeedbackContainer({ children, message, styles }: Readonly<Props>) {
    return (
        <Stack sx={styles} spacing={0.5}>
            {children}
            {typeof message === "string" && message && (
                <Typography color="danger" level="body-xs" sx={{ alignSelf: "flex-end" }}>
                    <b>{message.toUpperCase()}</b>
                </Typography>
            )}
        </Stack>
    );
}
