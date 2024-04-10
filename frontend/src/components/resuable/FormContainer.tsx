import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { CustomSnackBar } from "./WarningAlert";

interface FormContainterProps {
    children: React.ReactNode;
    border: "outlined" | "plain" | "soft";
    titleText: string;
    containterWidth?: number;
    errorMessage?: string;
}

export default function FormContainer({
    children,
    errorMessage,
    border,
    titleText,
    containterWidth = 50,
}: FormContainterProps) {
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            {errorMessage && <CustomSnackBar alertText={errorMessage} />}
            <Typography sx={{ textAlign: "center" }} level="h2">
                {titleText}
            </Typography>
            <Sheet
                sx={{
                    width: `${containterWidth}vw`,
                    minWidth: 600,
                    mx: "auto",
                    mt: 2,
                    pt: 10,
                    pb: 5,
                    px: 10,
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                    borderRadius: "sm",
                    boxShadow: "md",
                }}
                variant={border}
            >
                {children}
            </Sheet>
        </form>
    );
}
