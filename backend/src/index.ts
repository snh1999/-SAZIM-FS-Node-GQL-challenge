import express from "express";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.get("/", (req, res) => {
    res.json({});
});

// create graphql server

// start graphql server

app.listen(PORT, () => console.log(`Listening to ${PORT}`));
