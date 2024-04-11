import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

interface ModalProps {
    open: boolean;
    setOpen: (newState: boolean) => void;
    dialogueText: string;
}

export function ConfirmationModal({ open, setOpen, dialogueText }: ModalProps) {
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog variant="outlined" role="alertdialog">
                <DialogTitle>
                    <WarningRoundedIcon />
                    Confirmation
                </DialogTitle>
                <Divider />
                <DialogContent>{dialogueText}</DialogContent>
                <DialogActions>
                    <Button variant="solid" color="primary" onClick={() => setOpen(false)}>
                        Yes
                    </Button>
                    <Button variant="solid" color="danger" onClick={() => setOpen(false)}>
                        No
                    </Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    );
}
