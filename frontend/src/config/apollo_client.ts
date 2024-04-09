import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
    uri: import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8000/graphql",
    cache: new InMemoryCache(),
});
