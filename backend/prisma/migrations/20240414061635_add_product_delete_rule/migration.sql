-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_productID_fkey";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_productID_fkey" FOREIGN KEY ("productID") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
