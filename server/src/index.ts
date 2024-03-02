import express from "express";

const app = express();
const port = 3000;

app.get("/api/v1/", (req, res) => {
    res.end("Welcome to the api!");
});

app.listen(port, () => {
    return console.log(`Server live on localhost:${port}/api/v1/`);
});
