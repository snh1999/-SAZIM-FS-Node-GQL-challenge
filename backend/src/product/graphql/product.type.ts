import { Category, RentDuration } from "@prisma/client";
import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

const ProductType = new GraphQLObjectType({
    name: "Product",
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        category: {
            type: new GraphQLList(GraphQLString),
            description: `Category of the product, the value has to be the one of ${Object.values(Category)}`,
        },
        createdAt: { type: GraphQLString, description: "Default exists (not updated later)" },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
        rentPrice: { type: GraphQLInt },
        rentDuration: {
            type: GraphQLString,
            description: `The allowed values are ${Object.values(RentDuration)}`,
        },
        view: {
            type: GraphQLInt,
            description:
                "Automatically set, updated. The value updates on query at `getProduct` endpoint. To not update view, use `previewProduct` query.",
        },
        ownerId: {
            type: GraphQLID,
            description: "Set automatically(current logged in user). Buying the product updates this field",
        },
    },
});

export default ProductType;
