import express from "express";
import { createHandler } from "graphql-http/lib/use/express";

import schema from "./schema/schema";
import { authMiddleware } from "./middleware/auth.middleware";
import { errorHandler } from "./utils/errorHandler";

const { ruruHTML } = require("ruru/server");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(authMiddleware);
app.use(cors());
// Create and use the GraphQL handler.

app.all(
    "/graphql",
    createHandler({
        schema,
        formatError: errorHandler,
        context: async (req, args) => {
            return {
                user: req.raw.userId,
                isAuthenticated: req.raw.isAuthenticated,
            };
        },
    })
);

app.get("/", (_req, res) => {
    if (process.env.NODE_ENV === "development") {
        res.type("html");
        res.end(ruruHTML({ endpoint: "/graphql" }));
    }
});

// Start the server at port
app.listen(PORT, () => console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`));
