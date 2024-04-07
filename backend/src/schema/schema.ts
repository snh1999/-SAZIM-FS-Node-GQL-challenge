import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

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

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        address: { type: GraphQLString },
    }),
});

const ProductType = new GraphQLObjectType({
    name: "Product",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        category: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLString },
        summary: { type: GraphQLString },
        owner: {
            type: UserType,
            resolve(parent, args) {
                return users.find((user) => user.id == parent.ownerId);
            },
        },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return users.find((user) => user.id === args.id);
            },
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: () => users,
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve: () => products,
        },
        product: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return products.find((product) => product.id === args.id);
            },
        },
    },
});

const schema = new GraphQLSchema({
    query: RootQuery,
});

export default schema;
