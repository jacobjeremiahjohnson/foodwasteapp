import express from "express";

import { sendBadRequestMessage, sendCreatedMessage, sendOkMessage } from "../services/responseService";
import { verifyNewAccount, createNewAccount } from "../services/authenticationService";

const router = express.Router();

router.post("/create-account", async (req, res) => {
    const account = {
        name: req.body.name?.toString(),
        description: req.body?.description?.toString(),
        location: {
            address: req.body.location?.address?.toString(),
            longitude: parseFloat(req.body.location?.longitude?.toString()),
            latitude: parseFloat(req.body.location?.latitude?.toString())
        },
        email: req.body.email?.toString(),
        password: req.body.password?.toString(),
        type: req.body.type?.toString()
    };

    const verification = verifyNewAccount(account);
    if(verification !== "valid") return sendBadRequestMessage(res, verification);

    try {
        const databaseResponse = await createNewAccount(account);
        if(databaseResponse.messageType === "error") return sendBadRequestMessage(res, databaseResponse.message);
    } catch(ex: any) {
        return sendBadRequestMessage(res, ex.message ? ex.message : "An unknown error has occurred");
    }
    
    return sendCreatedMessage(res, "Account successfully created");
});

router.post("/login", (req, res) => {
    const login = {
        username: req.body.username,
        password: req.body.password
    };

    return sendOkMessage(res, "Login successful", { session_token: "yummy" })
});

export default router;
