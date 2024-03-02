import express from "express";

import { sendBadRequestMessage, sendCreatedMessage, sendOkMessage } from "../services/responseService";
import { verifyNewAccount, createNewAccount, login } from "../services/authenticationService";

const router = express.Router();

router.post("/create-account", async (req, res) => {
    const accountRequest = {
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

    const verification = verifyNewAccount(accountRequest);
    if(verification !== "valid") return sendBadRequestMessage(res, verification);

    try {
        const databaseResponse = await createNewAccount(accountRequest);
        if(databaseResponse.messageType === "error") return sendBadRequestMessage(res, databaseResponse.message);
    } catch(ex: any) {
        return sendBadRequestMessage(res, ex.message ? ex.message : "An unknown error has occurred");
    }
    
    return sendCreatedMessage(res, "Account successfully created");
});

router.post("/login", async (req, res) => {
    const loginRequest = {
        email: req.body.email?.toString(),
        password: req.body.password?.toString()
    };

    try {
        const message = await login(loginRequest.email, loginRequest.password);
        if(message.messageType === "error") return sendBadRequestMessage(res, message.message);
    } catch(ex: any) {
        return sendBadRequestMessage(res, ex.message || "An unknown error has occurred");
    }

    return sendOkMessage(res, "Login successful", { session_token: "yummy" })
});

export default router;
