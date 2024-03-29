import express from "express";

import auth from "./routes/auth";
import account from "./routes/account";
import order from "./routes/order";
import { port } from "./constants";
import { expireOrders, pruneOrders } from "./services/databaseService";
import { pruneSessionTokens } from "./services/sessionManagerService";

const cors = require("cors");

require("./services/databaseService");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth/", auth);
app.use("/api/v1/account/", account);
app.use("/api/v1/order/", order);

app.get("/api/v1/", (_, res) => {
    res.end("Welcome to the api!");
});

app.listen(port, () => {
    return console.log(`Server live on localhost:${port}/api/v1/`);
});

setInterval(() => {
    expireOrders(); // expire orders that are past expiry
    pruneSessionTokens(); // delete sessions older than 20 min
    pruneOrders(); // delete orders older than 2 days
}, 1000 * 60);
