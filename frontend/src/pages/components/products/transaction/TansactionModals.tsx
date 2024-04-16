import { useState } from "react";
import { useMutation } from "@apollo/client";

import ConfirmationModal from "../../ConfirmationModal";
import DatePicker from "../../resuable/Datepicker";
import RequestStateWrapper from "../../containers/RequestStateWrapper";
import { TRANSACTION_HISTORY_QUERY } from "../../../../graphql/product/queries";
import { BUY_PRODUCT_MUTATION, RENT_PRODUCT_MUTATION } from "../../../../graphql/product/mutations";

interface ModalProps {
    openModal: boolean;
    setOpenModal: (newState: boolean) => void;
    productId?: string;
}

export function BuyProduct({ openModal, setOpenModal, productId }: Readonly<ModalProps>) {
    const [buyProduct, { loading, error, data }] = useMutation(BUY_PRODUCT_MUTATION, {
        refetchQueries: [TRANSACTION_HISTORY_QUERY],
    });

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
    productId?: string;
}

export function RentProduct({ openModal, setOpenModal, transactionHistory, productId }: Readonly<RentModalProps>) {
    const [fromValue, setFromValue] = useState<string>("");
    const [toValue, setToValue] = useState<string>("");

    const [rentProduct, { loading, error, data }] = useMutation(RENT_PRODUCT_MUTATION, {
        refetchQueries: [TRANSACTION_HISTORY_QUERY],
    });

    const sortedHistory = transactionHistory?.sort((a, b) => {
        return a?.rentStartDate - (b?.rentStartDate ?? 0);
    });

    const onClick = () => {
        rentProduct({
            variables: {
                id: productId,
                startDate: new Date(fromValue).toISOString(),
                endDate: new Date(toValue).toISOString(),
            },
        });
        setFromValue("");
        setToValue("");
    };

    const disableDates = sortedHistory?.map((history) => {
        return {
            from: new Date(parseInt(history.rentStartDate)),
            to: new Date(parseInt(history.rentEndDate)),
        };
    });

    return (
        <RequestStateWrapper loading={loading} error={error?.message} data={data} dataMessage="Added Rent">
            <ConfirmationModal
                open={openModal}
                setOpen={setOpenModal}
                dialogueText="Rental Period"
                rightText="Confirm rent"
                leftText="Go Back"
                onClick={onClick}
            >
                <DatePicker
                    disabledDates={disableDates}
                    fromValue={fromValue}
                    setFromValue={setFromValue}
                    toValue={toValue}
                    setToValue={setToValue}
                />
            </ConfirmationModal>
        </RequestStateWrapper>
    );
}
