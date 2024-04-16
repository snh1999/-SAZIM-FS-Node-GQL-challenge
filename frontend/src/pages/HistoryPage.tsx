import { useQuery } from "@apollo/client";
import { Box, TabList, TabPanel, Tabs, Button, Tab, tabClasses } from "@mui/joy";

import useAuth from "../config/hooks/useAuth";
import { getFormattedDate } from "../utils/helper";
import ProductCard from "./components/products/ProductCard";
import { RequestStateWrapper } from "./components/containers";
import { CURRENT_USER_TRANSACTIONS_QUERY } from "../graphql/product/queries";

export default function HistoryPage() {
    const { loading, data, error } = useQuery(CURRENT_USER_TRANSACTIONS_QUERY, { fetchPolicy: "no-cache" });
    const allTransactions = data?.getMyTransactions;
    const {
        userData: { id },
    } = useAuth();
    const paneldata = getPanelData(id, allTransactions);

    return (
        <RequestStateWrapper loading={loading} error={error?.message} dataMessage="">
            <Tabs aria-label="tabs" defaultValue={0} sx={{ bgcolor: "transparent", position: "absolute", top: 10 }}>
                <TabList
                    disableUnderline
                    sx={{
                        p: 0.5,
                        gap: 0.5,
                        borderRadius: "xl",
                        bgcolor: "background.level1",
                        [`& .${tabClasses.root}[aria-selected="true"]`]: {
                            boxShadow: "sm",
                        },
                        margin: "auto",
                    }}
                >
                    <Tab disableIndicator>Bought</Tab> {/* newHolderId == user */}
                    <Tab disableIndicator>Sold</Tab> {/* originalOwnerId == user */}
                    <Tab disableIndicator>Borrowed</Tab> {/* newHolderId == user */}
                    <Tab disableIndicator>Lented</Tab> {/* originalOwnerId == user */}
                </TabList>
                <RenderProductCards paneldata={paneldata} />
            </Tabs>
        </RequestStateWrapper>
    );
}

function RenderProductCards({ paneldata }: { paneldata: any[][] }) {
    return (
        <>
            {paneldata.map((transactionList, index) => (
                <TabPanel key={index} value={index}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "50%", minWidth: 600 }}>
                        {transactionList.map((transaction) => (
                            <ProductCard key={transaction.id} product={transaction.product} productLink="#">
                                <Button sx={{ display: "block", mt: 2 }} size="sm" disabled>
                                    {transaction.transactionType === "SELL" &&
                                        `AT: ${getFormattedDate(transaction?.transactionDate)}`}
                                    {transaction.transactionType === "RENT" &&
                                        `Rent From: ${getFormattedDate(
                                            transaction.rentStartDate
                                        )}  ||  To: ${getFormattedDate(transaction.rentEndDate)}`}
                                </Button>
                            </ProductCard>
                        ))}
                        {transactionList.length === 0 && (
                            <Box sx={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold" }}>
                                Nothing here yet
                            </Box>
                        )}
                    </Box>
                </TabPanel>
            ))}
        </>
    );
}

function getPanelData(id: string, allTransactions: any[]) {
    const borrowedList = [],
        lentList = [],
        soldList = [],
        boughtList = [];

    for (let i = 0; i < allTransactions?.length; i++) {
        if (allTransactions[i].transactionType === "SELL") {
            if (allTransactions[i].newHolderId === id) boughtList.push(allTransactions[i]);
            if (allTransactions[i].originalOwnerId === id) soldList.push(allTransactions[i]);
        } else if (allTransactions[i].transactionType === "RENT") {
            if (allTransactions[i].newHolderId === id) borrowedList.push(allTransactions[i]);
            if (allTransactions[i].originalOwnerId === id) lentList.push(allTransactions[i]);
        }
    }

    return [boughtList, soldList, borrowedList, lentList];
}
