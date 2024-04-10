import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { userMutation, userQuery } from "../user";
import { productMutation, productQuery } from "../product";

const query = new GraphQLObjectType({
    name: "Query",
    fields: {
        ...userQuery,
        ...productQuery,
    },
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        ...userMutation,
        ...productMutation,
    },
});

const schema = new GraphQLSchema({
    query,
    mutation,
});

export default schema;
