import { prismaClient } from "../../config/db";
import { AppError, getPrismaAppError, inputValidationCallback } from "../../utils";
import { PartialProductDto, ProductDto } from "./dto/product.dto";

async function createProduct(dto: ProductDto) {
    console.log(dto);
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

async function updateProduct(userId: string, id: string, dto: PartialProductDto) {
    _checkAuthorization(userId, id);
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

async function deleteProduct(userId: string, id: string) {
    _checkAuthorization(userId, id);
    return prismaClient.product
        .delete({
            where: {
                id,
            },
        })
        .catch((error) => getPrismaAppError(error));
}

async function getProductById(id: string) {
    return prismaClient.product.findUnique({
        where: {
            id,
        },
    });
}

async function getAllProducts() {
    return prismaClient.product.findMany();
}

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

export default { createProduct, updateProduct, getProductById, getAllFromOwner, deleteProduct, getAllProducts };
