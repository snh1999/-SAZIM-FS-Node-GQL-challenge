import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                getAllProducts: {
                    merge(_, incoming) {
                        return incoming;
                    },
                },
                getMyProducts: {
                    merge(_, incoming) {
                        return incoming;
                    },
                },
            },
        },
    },
});

const httpLink = createHttpLink({
    uri: import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3000/graphql",
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token") ?? "";
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: cache,
});
