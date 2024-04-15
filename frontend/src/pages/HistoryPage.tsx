import { useQuery } from "@apollo/client";
import { CURRENT_USER_TRANSACTIONS_QUERY } from "../graphql/product/queries";
import { Box, TabList, TabPanel, Tabs, Button } from "@mui/joy";
import Tab, { tabClasses } from "@mui/joy/Tab";
import { useTheme } from "@mui/joy/styles";
import useAuth from "../config/hooks/useAuth";
import ProductCard from "./components/products/ProductCard";
import { Product } from "../constants/types/Product";
import { getFormattedDate } from "../utils/helper";

export default function HistoryPage() {
    const { loading, data, error } = useQuery(CURRENT_USER_TRANSACTIONS_QUERY);
    const allTransactions = data?.getMyTransactions;
    const {
        userData: { id },
    } = useAuth();
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

    const paneldata = [boughtList, soldList, borrowedList, lentList];

    console.log(paneldata);
    return (
        <>
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

                {paneldata.map((transactionList, index) => (
                    <TabPanel key={index} value={index}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "50%", minWidth: 600 }}>
                            {transactionList.map((transaction) => (
                                <ProductCard key={transaction.id} product={transaction.product} productLink="/product/">
                                    <Box>
                                        <Button size="sm" disabled>
                                            {transaction.transactionType === "SELL" &&
                                                `AT: ${getFormattedDate(transaction?.transactionDate)}`}
                                            {transaction.transactionType === "RENT" &&
                                                `Rent From: ${getFormattedDate(transaction.rentStartDate)}  ||  To: ${getFormattedDate(transaction.rentEndDate)}`}
                                        </Button>
                                    </Box>
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
            </Tabs>
        </>
    );
}
