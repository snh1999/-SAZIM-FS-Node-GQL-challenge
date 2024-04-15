import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import ProductType from "./product.type";
const TransactionsType = new GraphQLObjectType({
    name: "Transaction",
    fields: {
        id: { type: GraphQLInt },
        transactionType: {
            type: GraphQLString,
            description: "Two accepted values, RENT and SELL. Value is set automatically",
        },
        productID: { type: GraphQLString },
        originalOwnerId: { type: GraphQLString, description: "Field for owner at product creation" },
        newHolderId: { type: GraphQLString, description: "Field for new buyer/one taking the rent" },
        rentStartDate: { type: GraphQLString, description: "Only available at RENT, for sell null value" },
        rentEndDate: { type: GraphQLString, description: "Only available at RENT, for sell null value" },
        transactionDate: { type: GraphQLString, description: "Default exists (not updated later)" },
        product: { type: ProductType, description: "Product associated with current Transaction" },
    },
});

export default TransactionsType;
