import UserType from "./user.type";
import { FieldConfigGraphQL, NonNullStringGQ, StringGQ } from "../../constants/graphql_types";
import UserService from "../service/user.service";

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
