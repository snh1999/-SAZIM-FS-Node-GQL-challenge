import { TransactionType } from "@prisma/client";
import { prismaClient } from "../../config/db";
import { AppError } from "../../utils";
import productService from "./product.service";

async function getRentTransactionHistory(productId: string) {
    return await prismaClient.transaction.findMany({
        where: {
            product: {
                id: productId,
            },
            transactionType: TransactionType.RENT,
        },
    });
}

// rent validation
// the start date can not conflict with another date (not in between any transaction start-end)
// get the closest start date after start date- the end date has to be less than that
async function rentProduct(productId: string, userId: string, startDate: Date, endDate: Date) {
    if (endDate < startDate) throw new AppError("Invalid Rent Duration", 400);

    const product = await productService.getProductById(productId);
    if (!product) throw new AppError("Product not found", 404);

    await _checkRentValidity(productId, startDate, endDate);

    return await prismaClient.transaction.create({
        data: {
            originalOwner: {
                connect: {
                    id: product.ownerId,
                },
            },
            newHolder: {
                connect: {
                    id: userId,
                },
            },
            product: {
                connect: {
                    id: productId,
                },
            },
            transactionType: TransactionType.RENT,
            rentStartDate: startDate,
            rentEndDate: endDate,
        },
    });
}

async function _checkRentValidity(productId: string, startDate: Date, endDate: Date) {
    const sortedRentHistory = (await getRentTransactionHistory(productId)).sort((a, b) => {
        return (a.rentStartDate?.getTime() ?? 0) - (b.rentStartDate?.getTime() ?? 0);
    });
    let i;
    for (i = 0; i < sortedRentHistory.length; i++) {
        console.log(startDate, sortedRentHistory[i].rentStartDate);
        if (
            startDate >= (sortedRentHistory[i].rentStartDate ?? 0) &&
            startDate < (sortedRentHistory[i].rentEndDate ?? 0)
        ) {
            throw new AppError("Rent starts in occupied date", 400);
        }
        if (startDate < (sortedRentHistory[i].rentStartDate ?? 0)) break;
    }

    if (i < sortedRentHistory.length) {
        if (endDate > (sortedRentHistory[i].rentStartDate ?? 0)) {
            throw new AppError(`Rent has to end before ${sortedRentHistory[i].rentStartDate ?? 0}`, 400);
        }
    }
}

async function buyProduct(productId: string, newBuyerId: string) {
    // check if there is any sell entry in transaction
    await _checkProductStatus(productId);
    const ownerId = await _getProductOwner(productId);

    if (ownerId === newBuyerId) throw new AppError("You already are the owner", 400);

    return await prismaClient.product.update({
        where: {
            id: productId,
        },
        data: {
            ownerId: newBuyerId,
            transaction: {
                create: {
                    newHolder: {
                        connect: {
                            id: newBuyerId,
                        },
                    },
                    originalOwner: {
                        connect: {
                            id: ownerId,
                        },
                    },
                    transactionType: TransactionType.SELL,
                },
            },
        },
    });
}

async function _checkProductStatus(productId: string) {
    const sellEntry = await prismaClient.transaction.findFirst({
        where: {
            product: {
                id: productId,
            },
            transactionType: TransactionType.SELL,
        },
    });

    if (sellEntry) throw new AppError("Product is already sold", 400);
}

async function _getProductOwner(productId: string) {
    const product = await productService.getProductById(productId);
    if (!product) throw new AppError("Product not found", 404);
    return product.ownerId;
}

export default { buyProduct, getRentTransactionHistory, rentProduct };
