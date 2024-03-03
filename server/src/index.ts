import express from "express";

import auth from "./routes/auth";
import account from "./routes/account";

const cors = require("cors");

require("./services/databaseService");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth/", auth);
app.use("/api/v1/account/", account);

app.get("/api/v1/", (_, res) => {
    res.end("Welcome to the api!");
});

app.listen(port, () => {
    return console.log(`Server live on localhost:${port}/api/v1/`);
});
