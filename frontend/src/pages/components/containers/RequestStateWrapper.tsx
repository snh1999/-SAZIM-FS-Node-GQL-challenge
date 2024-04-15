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

/**
 * 1. Renders a loading spinner if loading is true (on netwoek request)
 * then shows error message in a sncakbar if it is passed
 * or success message and chilren is rendered
 *
 * @param {Readonly<Props>} loading - Indicates if the component is in a loading state
 * @param {Readonly<Props>} children - The children components to be rendered
 * @param {Readonly<Props>} error - The error message to be displayed (Optional because of network delay)
 * @param {Readonly<Props>} data - The data to be displayed
 * @param {Readonly<Props>} dataMessage - The message associated with the data
 * @return {JSX.Element} The JSX element to be rendered
 */

export default function RequestStateWrapper({ loading, children, error, data, dataMessage }: Readonly<Props>) {
    return loading ? (
        <CircularProgress size="lg" />
    ) : (
        <>
            {error && <CustomSnackBar alertText={error} />}
            {data && dataMessage && (
                <CustomSnackBar alertText={dataMessage} color="success" startDecorator={<CheckCircleIcon />} />
            )}
            {children}
        </>
    );
}
