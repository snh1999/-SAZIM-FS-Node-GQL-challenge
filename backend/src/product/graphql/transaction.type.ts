import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import ProductType from "./product.type";
const TransactionsType = new GraphQLObjectType({
    name: "Transaction",
    fields: {
        id: { type: GraphQLInt },
        transactionType: { type: GraphQLString },
        productID: { type: GraphQLString },
        originalOwnerId: { type: GraphQLString },
        newHolderId: { type: GraphQLString },
        rentStartDate: { type: GraphQLString },
        rentEndDate: { type: GraphQLString },
        transactionDate: { type: GraphQLString },
        product: { type: ProductType },
    },
});

export default TransactionsType;
