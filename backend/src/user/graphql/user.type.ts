import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        address: { type: GraphQLString },
    },
});

export const AuthResponseType = new GraphQLObjectType({
    name: "LoginToken",
    fields: {
        id: { type: GraphQLID },
        token: { type: GraphQLString },
        message: { type: GraphQLString },
    },
});

export default UserType;
