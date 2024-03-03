import { Response } from "express";

export function sendMessage(res: Response, message: string, statusCode: number, data: object = {}): void {
    res.status(statusCode);
    if(data) res.json({ message: message, data: data });
    else res.json({ message: message });
}

export function sendBadRequestMessage(res: Response, message: string, data: object = {}): void {
    sendMessage(res, message, 400, data);
}

export function sendOkMessage(res: Response, message: string, data: object = {}): void {
    sendMessage(res, message, 200, data);
}

export function sendCreatedMessage(res: Response, message: string, data: object = {}): void {
    sendMessage(res, message, 201, data);
}

export function sendOkOrBadRequestMessage(res: Response, message: Message) {
    if(message.messageType === "error") sendBadRequestMessage(res, message.message, message.data);
    else sendOkMessage(res, message.message, message.data);
}

export function sendCreatedOrBadRequestMessage(res: Response, message: Message) {
    if(message.messageType === "error") sendBadRequestMessage(res, message.message, message.data);
    else sendCreatedMessage(res, message.message, message.data);
}
