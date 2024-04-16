import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

const UserType = new GraphQLObjectType({
    name: "User",
    description: "Type is set for creating user only, this field might change in case of updating of user inclusion",
    fields: {
        id: { type: GraphQLID },
        firstName: { type: new GraphQLNonNull(GraphQLString), description: "Should only contain letters" },
        lastName: { type: GraphQLString, description: "Should only contain letters" },
        email: { type: new GraphQLNonNull(GraphQLString), description: "Must be unique and a valid string" },
        phone: { type: new GraphQLNonNull(GraphQLString), description: "Must be a valid phone Number" },
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
