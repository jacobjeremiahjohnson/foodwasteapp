import express from "express";

import { sendBadRequestMessage, sendCreatedMessage } from "../services/responses";

const router = express.Router();

router.post("/create-account", (req, res) => {
    const account = {
        name: req.body.name,
        description: req.body?.description,
        location: {
            address: req.body.location?.address,
            longitude: parseFloat(req.body.location?.longitude),
            latitude: parseFloat(req.body.location?.latitude)
        },
        email: req.body.email,
        password: req.body.password,
        type: req.body.type
    };

    if(account.type !== "producer" && account.type !== "consumer") return sendBadRequestMessage(res, "Invalid account type");
    if(account.location.longitude < -90 || account.location.longitude >= 90) return sendBadRequestMessage(res, "Invalid longitude");
    if(account.location.latitude < -180 || account.location.latitude >= 180) return sendBadRequestMessage(res, "Invalid latitude");
    if(account.password.length < 8) return sendBadRequestMessage(res, "Password must be 8 or more characters");
    if(!/^\S+@\S+\.\S+$/.test(account.email)) return sendBadRequestMessage(res, "Invalid email");

    return sendCreatedMessage(res, "Account successfully created");
});

export default router;
