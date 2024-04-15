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

async function getMyTransactions(userId: string) {
    return await prismaClient.transaction.findMany({
        where: {
            OR: [
                {
                    originalOwner: {
                        id: userId,
                    },
                },
                {
                    newHolder: {
                        id: userId,
                    },
                },
            ],
        },
        include: {
            product: true,
        },
    });
}

async function _checkRentValidity(productId: string, startDate: Date, endDate: Date) {
    const sortedRentHistory = (await getRentTransactionHistory(productId)).sort((a, b) => {
        return a.rentStartDate!.getTime() - b.rentStartDate!.getTime();
    });

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    for (let i = 0; i < sortedRentHistory.length; i++) {
        const currentStart = sortedRentHistory[i].rentStartDate!.getTime();
        const currentEnd = sortedRentHistory[i].rentEndDate!.getTime();
        if (start >= currentStart && start <= currentEnd) {
            throw new AppError("Rent starts in occupied date", 400);
        }
        if (start < currentStart && end >= currentEnd) {
            throw new AppError(`Rent has to end before ${sortedRentHistory[i].rentStartDate ?? 0}`, 400);
        }
    }
}

async function _checkProductStatus(productId: string) {
    if (await checkIfSold(productId)) throw new AppError("Product is already sold", 400);
}

async function _getProductOwner(productId: string) {
    const product = await productService.getProductById(productId);
    if (!product) throw new AppError("Product not found", 404);
    return product.ownerId;
}

async function checkIfSold(productId: string) {
    return await prismaClient.transaction.findFirst({
        where: {
            product: {
                id: productId,
            },
            transactionType: TransactionType.SELL,
        },
    });
}

export default { buyProduct, getRentTransactionHistory, rentProduct, getMyTransactions, checkIfSold };
