import { prismaClient } from "../../config/db";
import { PartialProductDto, ProductDto } from "./dto/product.dto";
import { AppError, getPrismaAppError, inputValidationCallback } from "../../utils";

/**
 * Asynchronously creates a product using the provided ProductDto after validating the input.
 *
 * @param {ProductDto} dto - The product data transfer object to create the product with.
 * @return {Promise<any>} A promise that resolves with the created product or rejects with an error.
 */
async function createProduct(dto: ProductDto) {
    return inputValidationCallback(ProductDto, dto, async () => {
        return prismaClient.product
            .create({
                data: {
                    ...dto,
                },
            })
            .catch((error) => getPrismaAppError(error));
    });
}

/**
 * Updates a product by id after checking authorization (owner same as logged in user) and validating input(post data).
 *
 * @param {string} userId - The user id (of logged in user)
 * @param {string} id - The id of the product to update.
 * @param {PartialProductDto} dto - The partial product data to update.
 * @return {Promise} A promise that resolves to the updated product or throws an error.
 */
async function updateProduct(userId: string, id: string, dto: PartialProductDto) {
    await _checkAuthorization(userId, id);
    return inputValidationCallback(PartialProductDto, dto, async () => {
        return prismaClient.product
            .update({
                where: {
                    id,
                },
                data: {
                    ...dto,
                },
            })
            .catch((error) => getPrismaAppError(error));
    });
}

/**
 * Deletes a product after checking authorization (owner same as logged in user).
 *
 * @param {string} userId - The user ID (for logged in user).
 * @param {string} id - The ID of the product to delete.
 * @return {Promise<any>} A Promise that resolves after deleting the product or rejects with an error.
 */

async function deleteProduct(userId: string, id: string) {
    await _checkAuthorization(userId, id);
    return prismaClient.product
        .delete({
            where: {
                id,
            },
        })
        .catch((error) => getPrismaAppError(error));
}

/**
 * Updates the view count of a product by the given id and returns the product.
 *
 * @param {string} id - The id of the product to view.
 * @return {Promise<Product>} The updated product with the incremented view count.
 */
async function viewProduct(id: string) {
    return prismaClient.product.update({
        where: {
            id,
        },
        data: {
            view: { increment: 1 },
        },
    });
}

/**
 * Retrieve a product by its ID (without updating view).
 *
 * @param {string} id - The ID of the product to retrieve.
 * @return {Promise<Product>} The product object if found, otherwise null.
 */
async function getProductById(id: string) {
    return await prismaClient.product.findUnique({
        where: {
            id,
        },
    });
}

/**
 * Retrieves all products by all users.
 *
 * @return {Promise<Product[]>} An array of all products.
 */
async function getAllProducts() {
    return prismaClient.product.findMany();
}

/**
 * Retrieves all products owned by a specific user.
 *
 * @param {string} ownerId - The ID of the user whose products are to be retrieved.
 * @return {Promise<Product[]>} An array of products owned by the specified user.
 */
async function getAllFromOwner(ownerId: string) {
    return prismaClient.product.findMany({
        where: {
            ownerId,
        },
    });
}

async function _checkAuthorization(userId: string, productId: string) {
    const product = await getProductById(productId);
    if (product && product.ownerId === userId) {
        return;
    }
    throw new AppError("Unauthorized", 401);
}

export default {
    createProduct,
    updateProduct,
    viewProduct,
    getAllFromOwner,
    deleteProduct,
    getAllProducts,
    getProductById,
};
