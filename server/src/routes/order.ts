import express from "express";

import { getEmailFromSessionToken } from "../services/sessionManagerService";
import { sendBadRequestMessage, sendOkMessage } from "../services/responseService";
import { getNearbyOrders, getOrdersByEmail, sendOrder } from "../services/databaseService";
import { rangeInMeters } from "../constants";

const router = express.Router();

router.post("/send-order", async (req, res) => {
    const sessionToken = req.header("Session-Token");
    const email = getEmailFromSessionToken(sessionToken);
    if(!email) return sendBadRequestMessage(res, "Invalid session token");

    const orderRequest: OrderRequest = {
        minutes_to_expire: parseInt(req.body.minutes_to_expire?.toString()),
        description: req.body.description?.toString(),
        image_url: req.body.image_url?.toString(),
        pounds: parseInt(req.body.pounds?.toString())
    }

    try {
        await sendOrder(email, orderRequest);
        return sendOkMessage(res, "Order successfully created");
    } catch(ex: any) {
        return sendBadRequestMessage(res, ex.message || "Unknown error");
    }
});

router.get("/my-orders", async (req, res) => {
    const sessionToken = req.header("Session-Token");
    const email = getEmailFromSessionToken(sessionToken);
    if(!email) return sendBadRequestMessage(res, "Invalid session token");

    try {
        const myOrders = await getOrdersByEmail(email);
        return sendOkMessage(res, "", { orders: myOrders })
    } catch(ex: any) {
        return sendBadRequestMessage(res, ex.message || "Unknown error");
    }
});

router.get("/nearby-orders", async (req, res) => {
    const sessionToken = req.header("Session-Token");
    const email = getEmailFromSessionToken(sessionToken);
    if(!email) return sendBadRequestMessage(res, "Invalid session token");

    try {
        const nearbyOrders = await getNearbyOrders(email, rangeInMeters);
        return sendOkMessage(res, "", { orders: nearbyOrders });
    } catch(ex: any) {
        return sendBadRequestMessage(res, ex.message || "Unknown error");
    }
});

router.post("/claim-order", async (req, res) => {
    const sessionToken = req.header("Session-Token");
    const email = getEmailFromSessionToken(sessionToken);
    if(!email) return sendBadRequestMessage(res, "Invalid session token");

    const claimOrderRequest = {
        
    }

    try {

    } catch(ex: any) {
        return sendBadRequestMessage(res, ex.message || "Unknown error");
    }
})

export default router;