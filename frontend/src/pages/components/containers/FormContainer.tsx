import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";

interface FormContainterProps {
    children: React.ReactNode;
    border: "outlined" | "plain" | "soft";
    titleText: string;
    containterWidth?: number;
    paddingx?: number;
}

export default function FormContainer({
    children,
    titleText,
    border = "outlined",
    containterWidth = 50,
    paddingx = 10,
}: Readonly<FormContainterProps>) {
    return (
        <form onSubmit={(e) => e.preventDefault()}>
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
                    px: paddingx,
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                    borderRadius: "sm",
                }}
                variant={border}
            >
                {children}
            </Sheet>
        </form>
    );
}
