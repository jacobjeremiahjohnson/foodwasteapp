import express from "express";

import { getEmailFromSessionToken } from "../services/sessionManagerService";
import { sendBadRequestMessage, sendOkMessage } from "../services/responseService";
import { getAccount, getNearbyProducers } from "../services/databaseService";

const router = express.Router();

router.get("/me", async (req, res) => {
    const sessionToken = req.header("Session-Token");
    const email = getEmailFromSessionToken(sessionToken);
    if(!email) return sendBadRequestMessage(res, "Invalid session token");

    try {
        const myAccount = await getAccount(email);
        return sendOkMessage(res, "", {
            name: myAccount.name,
            description: myAccount.description,
            location: {
                address: myAccount.address,
                latitude: myAccount.location.coordinates[1],
                longitude: myAccount.location.coordinates[0]
            },
            email: myAccount.email,
            type: myAccount.type
        });
    } catch(ex: any) {
        return sendBadRequestMessage(res, ex.message || "Unknown error");
    }
});

const rangeInMeters = 10000;
router.get("/nearby-producers", async (req, res) => {
    const sessionToken = req.header("Session-Token");
    const email = getEmailFromSessionToken(sessionToken);
    if(!email) return sendBadRequestMessage(res, "Invalid session token");

    try {
        const nearbyAccounts = await getNearbyProducers(email, rangeInMeters);
        const formattedAccounts = nearbyAccounts.map(a => {
            return {
                name: a.name,
                description: a.description,
                location: {
                    address: a.address,
                    latitude: a.location.coordinates[1],
                    longitude: a.location.coordinates[0]
                },
                email: a.email
            };
        });
        return sendOkMessage(res, "", {
            producers: formattedAccounts
        });
    } catch(ex: any) {
        return sendBadRequestMessage(res, ex.message || "Unknown error");
    }
})

export default router;