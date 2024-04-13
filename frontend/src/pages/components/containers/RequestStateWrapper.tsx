import { CircularProgress } from "@mui/joy";
import { CustomSnackBar } from "../resuable/WarningAlert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface Props {
    loading: boolean;
    children?: React.ReactNode;
    error?: string;
    data?: boolean;
    dataMessage: string;
}

export default function RequestStateWrapper({ loading, children, error, data, dataMessage }: Readonly<Props>) {
    return loading ? (
        <CircularProgress size="lg" />
    ) : (
        <>
            {error && <CustomSnackBar alertText={error} />}
            {data && dataMessage && <CustomSnackBar alertText={dataMessage} color="success" startDecorator={<CheckCircleIcon />} />}
            {children}
        </>
    );
}
