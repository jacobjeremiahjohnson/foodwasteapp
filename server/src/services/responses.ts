import { Response } from "express";

export function sendMessage(message: string, statusCode: number, res: Response): void {
    res.status(statusCode);
    res.json({ message: message });
}

export function sendBadRequestMessage(message: string, res: Response): void {
    sendMessage(message, 400, res);
}

export function sendOkMessage(message: string, res: Response): void {
    sendMessage(message, 200, res);
}

export function sendCreatedMessage(message: string, res: Response): void {
    sendMessage(message, 201, res);
}
