import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";

export type FieldConfigGraphQL = GraphQLFieldConfig<any, any, any>;
export const NonNullStringGQ = { type: GraphQLNonNull(GraphQLString) };
export const StringGQ = { type: GraphQLNonNull(GraphQLString) };
export const IDGQ = { type: GraphQLNonNull(GraphQLID) };
