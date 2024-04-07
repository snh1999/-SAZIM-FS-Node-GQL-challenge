"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const users = [
    {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        email: "F6 DataGridViewCellStyle",
        phone: "555-555-5555",
        address: "123 Main St, New York, NY 10001",
    },
    {
        id: "2",
        firstName: "Jane",
        lastName: "Doe",
        email: "F6CellStyle",
        phone: "555-555-5555",
        address: "123 Main St, New York, NY 10001",
    },
];
const products = [
    {
        id: "1",
        title: "Product 1",
        category: "Category 1",
        description: "Description 1",
        price: 9.99,
        summary: "Summary 1",
        owner: "1",
    },
    {
        id: "2",
        title: "Product 2",
        category: "Category 2",
        description: "Description 2",
        price: 19.99,
        summary: "Summary 2",
        owner: "1",
    },
    {
        id: "3",
        title: "Product 3",
        category: "Category 3",
        description: "Description 3",
        price: 29.99,
        summary: "Summary 3",
        owner: "2",
    },
    {
        id: "4",
        title: "Product 4",
        category: "Category 4",
        description: "Description 4",
        price: 39.99,
        summary: "Summary 4",
        owner: "2",
    },
];
const UserType = new graphql_1.GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        firstName: { type: graphql_1.GraphQLString },
        lastName: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        phone: { type: graphql_1.GraphQLString },
        address: { type: graphql_1.GraphQLString },
    }),
});
const ProductType = new graphql_1.GraphQLObjectType({
    name: "Product",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        title: { type: graphql_1.GraphQLString },
        category: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        price: { type: graphql_1.GraphQLString },
        summary: { type: graphql_1.GraphQLString },
        owner: {
            type: UserType,
            resolve(parent, args) {
                return users.find((user) => user.id == parent.ownerId);
            },
        },
    }),
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return users.find((user) => user.id === args.id);
            },
        },
        users: {
            type: new graphql_1.GraphQLList(UserType),
            resolve: () => users,
        },
        products: {
            type: new graphql_1.GraphQLList(ProductType),
            resolve: () => products,
        },
        product: {
            type: ProductType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return products.find((product) => product.id === args.id);
            },
        },
    },
});
const schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
});
exports.default = schema;
