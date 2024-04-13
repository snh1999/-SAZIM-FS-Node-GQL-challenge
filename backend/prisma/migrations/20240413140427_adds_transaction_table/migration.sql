-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('SELL', 'RENT');

-- CreateTable
CREATE TABLE "Transaction" (
    "transactionID" SERIAL NOT NULL,
    "transactionType" "TransactionType" NOT NULL,
    "productID" TEXT NOT NULL,
    "originalOwnerId" TEXT NOT NULL,
    "newHolderId" TEXT NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rentStartDate" TIMESTAMP(3),
    "rentEndDate" TIMESTAMP(3),

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transactionID")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_productID_fkey" FOREIGN KEY ("productID") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_originalOwnerId_fkey" FOREIGN KEY ("originalOwnerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_newHolderId_fkey" FOREIGN KEY ("newHolderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
