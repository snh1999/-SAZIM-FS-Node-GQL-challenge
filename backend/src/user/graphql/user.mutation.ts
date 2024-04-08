import { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLFieldConfig } from "graphql";
import UserType from "./user.type";
import { prismaClient } from "../../config/db";
import { FieldConfigGraphQL } from "../../constants";

// move the definition from field to separate variables

const addUser: FieldConfigGraphQL = {
    type: UserType,
    args: {
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLString },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLString },
        password: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
        const { firstName, lastName, password, email, phone, address } = args;

        return prismaClient.user.create({
            data: {
                firstName,
                lastName,
                password,
                email,
                phone,
                address,
            },
        });
    },
};

export const updateUser: GraphQLFieldConfig<any, any, any> = {
    type: UserType,
    args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        address: { type: GraphQLString },
    },
    resolve(parent, args) {
        const { firstName, lastName, email, phone, address } = args;
        return prismaClient.user.update({
            where: {
                id: args.id,
            },
            data: {
                firstName,
                lastName,
                email,
                phone,
                address,
            },
        });
    },
};

const deleteUser: GraphQLFieldConfig<any, any, any> = {
    type: UserType,
    args: {
        id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
        return prismaClient.user.delete({
            where: {
                id: args.id,
            },
        });
    },
};

export default {
    addUser,
    updateUser,
    deleteUser,
};
