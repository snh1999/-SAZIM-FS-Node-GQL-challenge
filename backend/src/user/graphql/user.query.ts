import { GraphQLID, GraphQLList } from "graphql";
import { FieldConfigGraphQL } from "../../constants";
import UserType from "./user.type";
import { prismaClient } from "../../config/db";

const users: FieldConfigGraphQL = {
    type: new GraphQLList(UserType),
    resolve: () => prismaClient.user.findMany(),
};

const user: FieldConfigGraphQL = {
    type: UserType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
        return prismaClient.user.findUnique({
            where: {
                id: args.id,
            },
        });
    },
};

export default {
    user,
    users,
};
