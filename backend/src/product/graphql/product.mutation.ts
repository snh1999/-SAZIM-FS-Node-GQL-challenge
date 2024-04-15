import ProductType from "./product.type";
import { FieldConfigGraphQL, IntegerGQ, NonNullStringGQ, StringGQ } from "../../constants/graphql_types";
import productService from "../service/product.service";
import { GraphQLList, GraphQLString } from "graphql";
import transactionService from "../service/transaction.service";
import TransactionsType from "../graphql/transaction.type";

const createProduct: FieldConfigGraphQL = {
    type: ProductType,
    description: "Any logged in user can create",
    args: {
        title: NonNullStringGQ,
        category: { type: new GraphQLList(GraphQLString) },
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
    description: "Only owner (logged in) can update",
    args: {
        id: NonNullStringGQ,
        title: StringGQ,
        category: { type: new GraphQLList(GraphQLString) },
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
    description: "Only owner (logged in) can delete",
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

const buyProduct: FieldConfigGraphQL = {
    type: ProductType,
    description: "A product can be bought only once(Owner can not buy). Rents are unaffected for this implementation",
    args: {
        id: NonNullStringGQ,
    },
    resolve(_, args, context) {
        if (!context.isAuthenticated) {
            return new Error("You must be logged in for this operation");
        }
        return transactionService.buyProduct(args.id, context.user);
    },
};

const rentProduct: FieldConfigGraphQL = {
    type: TransactionsType,
    description:
        "`startDate` and `endDate`  has to be a non overlapping date with existing Rent entries, Otherwise fails. Owner can not rent product.",
    args: {
        id: NonNullStringGQ,
        startDate: NonNullStringGQ,
        endDate: NonNullStringGQ,
    },
    resolve(_, args, context) {
        return transactionService.rentProduct(args.id, context.user, args.startDate, args.endDate);
    },
};

export default {
    createProduct,
    updateProduct,
    deleteProduct,
    buyProduct,
    rentProduct,
};
