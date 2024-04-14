export default interface Transaction {
    id?: string;
    transactionType: string;
    productId: string;
    originalOwnerId: string;
    newHolderId: string;
    rentStartDate?: Date;
    rentEndDate?: Date;
    transactionDate?: Date;
}
