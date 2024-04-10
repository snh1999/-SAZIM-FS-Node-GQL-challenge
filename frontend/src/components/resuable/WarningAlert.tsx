import Snackbar from "@mui/joy/Snackbar";
import IconButton from "@mui/joy/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import WarningIcon from "@mui/icons-material/Warning";
import { useState } from "react";

interface Props {
    alertText: string;
    startDecorator?: React.ReactNode;
    color?: "danger" | "primary" | "success" | "warning";
}

export function CustomSnackBar({ alertText, startDecorator, color = "danger" }: Props) {
    const [open, setOpen] = useState(true);
    return (
        <Snackbar
            autoHideDuration={4000}
            open={open}
            variant="solid"
            color={color}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={() => {
                setOpen(false);
            }}
            startDecorator={startDecorator ?? <WarningIcon />}
            endDecorator={
                <IconButton size="sm" variant="plain" onClick={() => setOpen(false)}>
                    <CloseIcon />
                </IconButton>
            }
        >
            {alertText}
        </Snackbar>
    );
}
