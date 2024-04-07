import express from "express";
import { createHandler } from "graphql-http/lib/use/express";

import schema from "./schema/schema";

const { ruruHTML } = require("ruru/server");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT ?? 3000;

// app.use(express.json())
// Create and use the GraphQL handler.
app.all(
    "/graphql",
    createHandler({
        schema: schema,
    })
);

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
    if (process.env.NODE_ENV === "development") {
        res.type("html");
        res.end(ruruHTML({ endpoint: "/graphql" }));
    }
});

// Start the server at port
app.listen(PORT, () => console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`));
