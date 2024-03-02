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

    if(account.type !== "producer" && account.type !== "consumer") return sendBadRequestMessage("Invalid account type", res);
    if(account.location.longitude < -90 || account.location.longitude >= 90) return sendBadRequestMessage("Invalid longitude", res);
    if(account.location.latitude < -180 || account.location.latitude >= 180) return sendBadRequestMessage("Invalid latitude", res);
    if(account.password.length < 8) return sendBadRequestMessage("Password must be 8 or more characters", res);
    if(!/^\S+@\S+\.\S+$/.test(account.email)) return sendBadRequestMessage("Invalid email", res);

    return sendCreatedMessage("Account successfully created", res);
});

export default router;
