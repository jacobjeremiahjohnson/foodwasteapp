import express from "express";
import * as cors from "cors";

import auth from "./routes/auth";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/api/v1/auth/", auth);

app.get("/api/v1/", (req, res) => {
    res.end("Welcome to the api!");
});

app.listen(port, () => {
    return console.log(`Server live on localhost:${port}/api/v1/`);
});
