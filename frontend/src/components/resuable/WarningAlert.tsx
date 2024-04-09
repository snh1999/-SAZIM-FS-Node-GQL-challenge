import Snackbar from "@mui/joy/Snackbar";
import IconButton from "@mui/joy/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import WarningIcon from "@mui/icons-material/Warning";
import { useState } from "react";

export function WarningAlert({ alertText }: { alertText: string }) {
    const [open, setOpen] = useState(true);
    return (
        <Snackbar
            autoHideDuration={4000}
            open={open}
            variant="solid"
            color="danger"
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={() => {
                setOpen(false);
            }}
            startDecorator={<WarningIcon />}
            endDecorator={
                <IconButton size="sm" color="danger" variant="plain" onClick={() => setOpen(false)}>
                    <CloseIcon />
                </IconButton>
            }
        >
            {alertText}
        </Snackbar>
    );
}
