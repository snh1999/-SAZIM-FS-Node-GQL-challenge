import { GraphQLFieldConfig, GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";

export type FieldConfigGraphQL = GraphQLFieldConfig<any, any, any>;
export const NonNullStringGQ = { type: new GraphQLNonNull(GraphQLString) };
export const StringGQ = { type: new GraphQLNonNull(GraphQLString) };
export const IntegerGQ = { type: new GraphQLNonNull(GraphQLInt) };
export const IDGQ = { type: new GraphQLNonNull(GraphQLID) };
