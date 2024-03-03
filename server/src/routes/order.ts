import express from "express";

import { getEmailFromSessionToken } from "../services/sessionManagerService";
import { sendBadRequestMessage, sendCreatedMessage, sendOkMessage, sendOkOrBadRequestMessage } from "../services/responseService";
import { claimOrderDB, closeOrderDB, expireOrders, getNearbyOrdersDB, getOrdersByEmailDB, sendOrderDB } from "../services/databaseService";
import { rangeInMeters } from "../constants";

const router = express.Router();

router.post("/send-order", async (req, res) => {
    const email = getEmailFromSessionToken(req.header("Session-Token"));
    if(!email) return sendBadRequestMessage(res, "Invalid session token");

    const orderRequest: OrderRequest = {
        minutes_to_expire: parseInt(req.body.minutes_to_expire?.toString()),
        description: req.body.description?.toString(),
        image_url: req.body.image_url?.toString(),
        pounds: parseInt(req.body.pounds?.toString())
    }

    try {
        await sendOrderDB(email, orderRequest);
        return sendCreatedMessage(res, "Order successfully created");
    } catch(ex: any) {
        return sendBadRequestMessage(res, ex.message || "Unknown error");
    }
});

router.get("/my-orders", async (req, res) => {
    const email = getEmailFromSessionToken(req.header("Session-Token"));
    if(!email) return sendBadRequestMessage(res, "Invalid session token");

    try {
        const myOrders = await getOrdersByEmailDB(email);
        return sendOkMessage(res, "", { orders: myOrders })
    } catch(ex: any) {
        return sendBadRequestMessage(res, ex.message || "Unknown error");
    }
});

router.get("/nearby-orders", async (req, res) => {
    const email = getEmailFromSessionToken(req.header("Session-Token"));
    if(!email) return sendBadRequestMessage(res, "Invalid session token");

    try {
        const nearbyOrders = await getNearbyOrdersDB(email, rangeInMeters);
        return sendOkMessage(res, "", { orders: nearbyOrders });
    } catch(ex: any) {
        return sendBadRequestMessage(res, ex.message || "Unknown error");
    }
});

router.post("/claim-order", async (req, res) => {
    const email = getEmailFromSessionToken(req.header("Session-Token"));
    if(!email) return sendBadRequestMessage(res, "Invalid session token");

    const id = req.body.id;
    return sendOkOrBadRequestMessage(res, await claimOrderDB(id));
});

router.post("/close-order", async (req, res) => {
    const email = getEmailFromSessionToken(req.header("Session-Token"));
    if(!email) return sendBadRequestMessage(res, "Invalid session token");

    const id = req.body.id;
    return sendOkOrBadRequestMessage(res, await closeOrderDB(id));
});

export default router;