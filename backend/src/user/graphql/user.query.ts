import { FieldConfigGraphQL, IDGQ, NonNullStringGQ } from "../../constants/graphql_types";
import UserType, { AuthResponseType } from "./user.type";
import userService from "../service/user.service";

const user: FieldConfigGraphQL = {
    type: UserType,
    args: { id: IDGQ },
    resolve(_, args) {
        return userService.getUserById(args.id);
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
    login,
};
