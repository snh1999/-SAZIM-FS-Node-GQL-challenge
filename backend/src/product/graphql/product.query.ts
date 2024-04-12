import { FieldConfigGraphQL, IDGQ } from "../../constants/graphql_types";
import ProductType from "./product.type";
import productService from "../service/product.service";
import { GraphQLList } from "graphql";
import { AppError } from "../../utils";

const getProduct: FieldConfigGraphQL = {
    type: ProductType,
    args: { id: IDGQ },
    resolve(_, args) {
        return productService.viewProduct(args.id);
    },
};

const getAllProduct: FieldConfigGraphQL = {
    type: new GraphQLList(ProductType),
    resolve() {
        return productService.getAllProducts();
    },
};

const getMyProducts: FieldConfigGraphQL = {
    type: new GraphQLList(ProductType),
    resolve(_parent, _args, context) {
        if (!context.isAuthenticated) {
            throw new AppError("Unauthorized", 401);
        }
        return productService.getAllFromOwner(context.user);
    },
};

export default {
    getProduct,
    getAllProduct,
    getMyProducts,
};
