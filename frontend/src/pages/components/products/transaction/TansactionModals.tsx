import { useMutation, useQuery } from "@apollo/client";
import { ConfirmationModal } from "../../ConfirmationModal";
import RequestStateWrapper from "../../containers/RequestStateWrapper";
import { BUY_PRODUCT_MUTATION } from "../../../../graphql/product/mutations";
import { Box, Input } from "@mui/joy";
import { TRANSACTION_HISTORY_QUERY } from "../../../../graphql/product/queries";
import * as yup from "yup";

interface ModalProps {
    openModal: boolean;
    setOpenModal: (newState: boolean) => void;
    productId?: string;
}

export function BuyProduct({ openModal, setOpenModal, productId }: Readonly<ModalProps>) {
    const [buyProduct, { loading, error, data }] = useMutation(BUY_PRODUCT_MUTATION);

    return (
        <RequestStateWrapper
            loading={loading}
            error={error?.message}
            data={data}
            dataMessage={"Product bought successfully"}
        >
            <ConfirmationModal
                open={openModal}
                setOpen={setOpenModal}
                dialogueText="Are you sure you want to buy this product?"
                onClick={() => {
                    buyProduct({ variables: { id: productId } });
                }}
            />
        </RequestStateWrapper>
    );
}

interface RentModalProps {
    transactionHistory?: any[];
    openModal: boolean;
    setOpenModal: (newState: boolean) => void;
}

export function RentProduct({ openModal, setOpenModal, transactionHistory }: Readonly<RentModalProps>) {
    // const rentDateSchema = yup.object().shape({
    //     from: yup.date().min(new Date()).required("Required"),
    //     to: yup.string().required("Required"),
    // })

    yup.addMethod(yup.date, "newMethod", function (this: yup.DateSchema, date: Date, message?: string) {
        return this.test("min-date", message, function (value) {
            // check if data is in the middle of two
        });
    });

    return (
        <ConfirmationModal
            open={openModal}
            setOpen={setOpenModal}
            dialogueText="Rental Period"
            rightText="Confirm rent"
            leftText="Go Back"
        >
            <Box sx={{ display: "flex", gap: 5 }}>
                <Box>
                    From
                    {/* <Input type="date"></Input> */}
                    <input type="date" min={Date.now()}></input>
                </Box>
                <Box>
                    To
                    <Input type="date"></Input>
                </Box>
            </Box>
        </ConfirmationModal>
    );
}
