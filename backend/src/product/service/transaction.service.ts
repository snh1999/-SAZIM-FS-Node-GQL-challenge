import { TransactionType } from "@prisma/client";
import { AppError } from "../../utils";
import productService from "./product.service";
import { prismaClient } from "../../config/db";

/**
 * Retrieves the transaction history of renting for a specific product.
 *
 * @param {string} productId - The ID of the product for which to retrieve the transaction history.
 * @return {Promise<Transaction[]>} An array of transactions representing the rent history for the specified product.
 */
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

/**
 * Check the product status, update the owner if the new buyer is different (throw error if same as owner), and create a sell transaction.
 *
 * @param {string} productId - The ID of the product being bought.
 * @param {string} newBuyerId - The ID of the new buyer.
 * @return {Promise<Product>} The updated product after the transaction.
 */
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

/**
 * Rent a product for a specified duration (Non overlapping with the exisitng rents).
 *
 * @param {string} productId - The ID of the product to rent.
 * @param {string} userId - The ID of the user renting the product.
 * @param {Date} startDate - The start date of the rent.
 * @param {Date} endDate - The end date of the rent.
 * @return {Promise<Transaction>} A Promise that resolves to the created transaction.
 */
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

/**
 * Retrieves all transactions for a specific user.
 *
 * @param {string} userId - The ID of the user to retrieve transactions for
 * @return {Promise<Transaction[]>} A list of transactions associated with the user
 */
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

/**
 * Check the validity of a rent transaction(Non overlapping to other exising rents).
 *
 * @param {string} productId - The ID of the product for the rent transaction
 * @param {Date} startDate - The start date of the rent transaction
 * @param {Date} endDate - The end date of the rent transaction
 */
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

/**
 * Asynchronously checks if a product with the given ID has been sold.
 *
 * @param {string} productId - The ID of the product to check.
 * @return {Promise<Transaction>} A promise that resolves to the first transaction record if the product has been sold, otherwise null.
 */
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
