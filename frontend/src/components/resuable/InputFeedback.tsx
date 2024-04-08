import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

interface InputFeedBackProps {
    children: React.ReactNode;
    getInputFeedback(value: string): string;
    value: string;
}

export default function InputFeedBack({ children, getInputFeedback, value }: InputFeedBackProps) {
    return (
        <Stack spacing={0.5}>
            {children}
            <Typography level="body-xs" sx={{ alignSelf: "flex-end" }}>
                <b>{getInputFeedback(value)}</b>
            </Typography>
        </Stack>
    );
}
