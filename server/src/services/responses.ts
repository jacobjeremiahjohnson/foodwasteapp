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
