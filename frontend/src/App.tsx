import { RouterProvider } from "react-router-dom";
import router from "./pages/router";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./config/apollo_client";
import { AuthContextProvider } from "./config/context/auth_context";

function App() {
    return (
        <ApolloProvider client={apolloClient}>
            <AuthContextProvider>
                <RouterProvider router={router} />;
            </AuthContextProvider>
        </ApolloProvider>
    );
}

export default App;
