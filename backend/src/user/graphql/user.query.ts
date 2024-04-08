import { GraphQLList } from "graphql";
import { FieldConfigGraphQL, IDGQ, NonNullStringGQ } from "../../constants/graphql_types";
import UserType, { AuthResponseType } from "./user.type";
import { prismaClient } from "../../config/db";
import userService from "../service/user.service";

const users: FieldConfigGraphQL = {
    type: new GraphQLList(UserType),
    resolve: () => prismaClient.user.findMany(),
};

const user: FieldConfigGraphQL = {
    type: UserType,
    args: { id: IDGQ },
    resolve(parent, args) {
        return prismaClient.user.findUnique({
            where: {
                id: args.id,
            },
        });
    },
};

const login: FieldConfigGraphQL = {
    type: AuthResponseType,
    args: {
        email: NonNullStringGQ,
        password: NonNullStringGQ,
    },
    resolve(_, args) {
        return userService.loginUser(args);
    },
};

export default {
    user,
    users,
    login,
};
