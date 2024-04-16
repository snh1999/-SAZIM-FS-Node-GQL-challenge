import UserType from "./user.type";
import UserService from "../service/user.service";
import { FieldConfigGraphQL, NonNullStringGQ, StringGQ } from "../../constants/graphql_types";

const createUser: FieldConfigGraphQL = {
    type: UserType,
    description: "user has to login seapartely after registration, Check `UserType` for constaints",
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

export default {
    createUser,
};
