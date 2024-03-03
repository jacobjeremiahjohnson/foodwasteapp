import express from "express";

import { getEmailFromSessionToken } from "../services/sessionManagerService";
import { sendBadRequestMessage, sendOkOrBadRequestMessage } from "../services/responseService";
import { getAccount, getNearbyProducers } from "../services/accountService";
import { rangeInMeters } from "../constants";

const router = express.Router();

router.get("/me", async (req, res) => {
    const email = getEmailFromSessionToken(req.header("Session-Token"));
    if(!email) return sendBadRequestMessage(res, "Invalid session token");

    return sendOkOrBadRequestMessage(res, await getAccount(email));
});

router.get("/nearby-producers", async (req, res) => {
    const email = getEmailFromSessionToken(req.header("Session-Token"));
    if(!email) return sendBadRequestMessage(res, "Invalid session token");

    return sendOkOrBadRequestMessage(res, await getNearbyProducers(email, rangeInMeters));
})

export default router;