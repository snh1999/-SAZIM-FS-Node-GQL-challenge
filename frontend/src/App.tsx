import { RouterProvider } from "react-router-dom";
import router from "./config/router";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./config/apollo_client";

function App() {
    return (
        <ApolloProvider client={apolloClient}>
            <RouterProvider router={router} />;
        </ApolloProvider>
    );
}

export default App;
