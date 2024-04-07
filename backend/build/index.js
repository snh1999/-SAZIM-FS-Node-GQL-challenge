"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("graphql-http/lib/use/express");
const schema_1 = __importDefault(require("./schema/schema"));
const { ruruHTML } = require("ruru/server");
require("dotenv").config();
const app = (0, express_1.default)();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
// Create and use the GraphQL handler.
app.all("/graphql", (0, express_2.createHandler)({
    schema: schema_1.default,
}));
// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
    if (process.env.NODE_ENV === "development") {
        res.type("html");
        res.end(ruruHTML({ endpoint: "/graphql" }));
    }
});
// Start the server at port
app.listen(PORT, () => console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`));
