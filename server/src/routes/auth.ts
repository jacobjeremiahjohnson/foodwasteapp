import express from "express";

import { sendBadRequestMessage, sendCreatedOrBadRequestMessage, sendOkOrBadRequestMessage } from "../services/responseService";
import { verifyNewAccount, createNewAccount, login } from "../services/authenticationService";

const router = express.Router();

router.post("/create-account", async (req, res) => {
    const accountRequest: Account = {
        name: req.body.name?.toString(),
        description: req.body?.description?.toString(),
        address: req.body.location?.address?.toString(),
        location: {
            type: "Point",
            coordinates: [
                parseFloat(req.body.location?.longitude?.toString()),
                parseFloat(req.body.location?.latitude?.toString())
            ]
        },
        email: req.body.email?.toString(),
        password: req.body.password?.toString(),
        type: req.body.type?.toString()
    };

    const verification = verifyNewAccount(accountRequest);
    if(verification !== "valid") return sendBadRequestMessage(res, verification);

    return sendCreatedOrBadRequestMessage(res, await createNewAccount(accountRequest));
});

router.post("/login", async (req, res) => {
    const loginRequest = {
        email: req.body.email?.toString(),
        password: req.body.password?.toString()
    };

    return sendOkOrBadRequestMessage(res, await login(loginRequest.email, loginRequest.password));
});

export default router;
