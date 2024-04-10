/*
  Warnings:

  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentDuration` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentPrice` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RentDuration" AS ENUM ('DAY', 'WEEK', 'BIWEEK', 'MONTH', 'QUARTER', 'HALFYEAR', 'YEAR');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "rentDuration" "RentDuration" NOT NULL,
ADD COLUMN     "rentPrice" INTEGER NOT NULL;
