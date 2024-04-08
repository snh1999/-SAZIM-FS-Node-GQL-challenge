import UserType from "./user.type";
import { FieldConfigGraphQL, IDGQ, NonNullStringGQ, StringGQ } from "../../constants/graphql_types";
import UserService from "../service/user.service";

// TODO - add error handling
const createUser: FieldConfigGraphQL = {
    type: UserType,
    args: {
        firstName: NonNullStringGQ,
        lastName: StringGQ,
        email: NonNullStringGQ,
        phone: NonNullStringGQ,
        address: StringGQ,
        password: NonNullStringGQ,
    },
    resolve(_, args) {
        return UserService.createUser(args);
    },
};

export const updateUser: FieldConfigGraphQL = {
    type: UserType,
    args: {
        id: IDGQ,
        firstName: StringGQ,
        lastName: StringGQ,
        email: StringGQ,
        phone: StringGQ,
        address: StringGQ,
    },
    resolve(_, args) {
        return UserService.updateUser(args.id, args);
    },
};

const deleteUser: FieldConfigGraphQL = {
    type: UserType,
    args: {
        id: IDGQ,
    },
    resolve(_, args) {
        return UserService.deleteUser(args.id);
    },
};

export default {
    createUser,
    updateUser,
    deleteUser,
};
