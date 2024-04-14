import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
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
    },
});

export default TransactionsType;
