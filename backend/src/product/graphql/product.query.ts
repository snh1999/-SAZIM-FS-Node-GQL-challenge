import { GraphQLList } from "graphql";

import { AppError } from "../../utils";
import ProductType from "./product.type";
import TransactionsType from "./transaction.type";
import productService from "../service/product.service";
import transactionService from "../service/transaction.service";
import { FieldConfigGraphQL, IDGQ, NonNullStringGQ } from "../../constants/graphql_types";

const getProduct: FieldConfigGraphQL = {
    type: ProductType,
    description: "Any logged in user can view (Updates view count)",
    args: { id: IDGQ },
    resolve(_, args) {
        return productService.viewProduct(args.id);
    },
};

const previewProduct: FieldConfigGraphQL = {
    type: ProductType,
    description: "Query for additional operations, when product information is needed without updating view count",
    args: { id: IDGQ },
    resolve(_, args) {
        return productService.getProductById(args.id);
    },
};

const getAllProducts: FieldConfigGraphQL = {
    type: new GraphQLList(ProductType),
    description: "List of products by all users",
    resolve() {
        return productService.getAllProducts();
    },
};

const getMyProducts: FieldConfigGraphQL = {
    type: new GraphQLList(ProductType),
    description: "All owned products of currently logged in user (created and bought)",
    resolve(_parent, _args, context) {
        if (!context.isAuthenticated) {
            throw new AppError("Unauthorized", 401);
        }
        return productService.getAllFromOwner(context.user);
    },
};

const getTransactionHistory: FieldConfigGraphQL = {
    type: new GraphQLList(TransactionsType),
    description: "All transactions(rent) of product. If the product is sold, it it added as last entry",
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
    description: "All transactions(rent, sell, buy, lending) of currently logged in user",
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
