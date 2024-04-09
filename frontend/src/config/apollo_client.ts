import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
    uri: import.meta.env.BACKEND_URL,
    cache: new InMemoryCache(),
});
