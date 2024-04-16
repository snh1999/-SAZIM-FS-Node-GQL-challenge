import Button from "@mui/joy/Button";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";

interface ModalProps {
    open: boolean;
    setOpen: (newState: boolean) => void;
    dialogueText: string;
    children?: React.ReactNode;
    rightText?: string;
    leftText?: string;
    onClick?: () => void;
}

export default function ConfirmationModal({
    open,
    setOpen,
    dialogueText,
    children,
    onClick = () => {},
    rightText = "Yes",
    leftText = "No",
}: Readonly<ModalProps>) {
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog variant="outlined" role="alertdialog">
                <DialogContent sx={{ my: 3, textAlign: "center" }}>{dialogueText}</DialogContent>
                {children}
                <DialogActions>
                    <Button
                        variant="solid"
                        color="primary"
                        onClick={() => {
                            onClick();
                            setOpen(false);
                        }}
                    >
                        {rightText}
                    </Button>
                    <Button variant="solid" color="danger" onClick={() => setOpen(false)}>
                        {leftText}
                    </Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    );
}
