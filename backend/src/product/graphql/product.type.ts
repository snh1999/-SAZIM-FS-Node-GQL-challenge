import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

const ProductType = new GraphQLObjectType({
    name: "Product",
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        category: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
        rentPrice: { type: GraphQLInt },
        rentDuration: { type: GraphQLString },
    },
});

export default ProductType;
