import ProductType from "./product.type";
import { FieldConfigGraphQL, IntegerGQ, NonNullStringGQ, StringGQ } from "../../constants/graphql_types";
import productService from "../service/product.service";

const createProduct: FieldConfigGraphQL = {
    type: ProductType,
    args: {
        title: NonNullStringGQ,
        category: NonNullStringGQ,
        description: NonNullStringGQ,
        price: IntegerGQ,
        rentPrice: IntegerGQ,
        rentDuration: NonNullStringGQ,
    },
    resolve(_, args, context) {
        if (!context.isAuthenticated) {
            return new Error("You must be logged in for this operation");
        }
        return productService.createProduct({ ...args, ownerId: context.user });
    },
};

const updateProduct: FieldConfigGraphQL = {
    type: ProductType,
    args: {
        id: NonNullStringGQ,
        title: StringGQ,
        category: StringGQ,
        description: StringGQ,
        price: IntegerGQ,
        rentPrice: IntegerGQ,
        rentDuration: StringGQ,
    },
    resolve(_, args, context) {
        if (!context.isAuthenticated) {
            return new Error("You must be logged in for this operation");
        }
        return productService.updateProduct(context.user, args.id, args);
    },
};

const deleteProduct: FieldConfigGraphQL = {
    type: ProductType,
    args: {
        id: NonNullStringGQ,
    },
    resolve(_, args, context) {
        if (!context.isAuthenticated) {
            return new Error("You must be logged in for this operation");
        }
        return productService.deleteProduct(context.user, args.id);
    },
};

export default {
    createProduct,
    updateProduct,
    deleteProduct,
};
