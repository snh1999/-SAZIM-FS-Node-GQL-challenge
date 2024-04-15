import { FieldConfigGraphQL, IDGQ, NonNullStringGQ } from "../../constants/graphql_types";
import ProductType from "./product.type";
import productService from "../service/product.service";
import { GraphQLList } from "graphql";
import { AppError } from "../../utils";
import TransactionsType from "./transaction.type";
import transactionService from "../service/transaction.service";

const getProduct: FieldConfigGraphQL = {
    type: ProductType,
    args: { id: IDGQ },
    resolve(_, args) {
        return productService.viewProduct(args.id);
    },
};

const previewProduct: FieldConfigGraphQL = {
    type: ProductType,
    args: { id: IDGQ },
    resolve(_, args) {
        return productService.getProductById(args.id);
    },
};

const getAllProducts: FieldConfigGraphQL = {
    type: new GraphQLList(ProductType),
    resolve() {
        return productService.getAllProducts();
    },
};

const getMyProducts: FieldConfigGraphQL = {
    type: new GraphQLList(ProductType),
    resolve(_parent, _args, context) {
        if (!context.isAuthenticated) {
            throw new AppError("Unauthorized", 401);
        }
        return productService.getAllFromOwner(context.user);
    },
};

const getTransactionHistory: FieldConfigGraphQL = {
    type: new GraphQLList(TransactionsType),
    args: {
        id: NonNullStringGQ,
    },
    async resolve(_, args, context) {
        const sellHistory = await transactionService.checkIfSold(args.id);
        const rentHistory = await transactionService.getRentTransactionHistory(args.id);
        if (sellHistory) rentHistory.push(sellHistory);
        return rentHistory;
    },
};

const getMyTransactions: FieldConfigGraphQL = {
    type: new GraphQLList(TransactionsType),
    async resolve(_, args, context) {
        return await transactionService.getMyTransactions(context.user);
    },
};

export default {
    getProduct,
    getAllProducts,
    getMyProducts,
    getTransactionHistory,
    previewProduct,
    getMyTransactions,
};
