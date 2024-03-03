import { createAccount, doesAccountExist } from "./databaseService";
import { putSessionToken } from "./sessionManagerService";

const bcrypt = require("bcryptjs");

export function verifyNewAccount(account: Account): string {
    if(account.type !== "producer" && account.type !== "consumer") return "Invalid account type";
    if(account.location[0] < -180 || account.location[0] > 180) return "Invalid longitude";
    if(account.location[1] < -90 || account.location[1] > 90) return "Invalid latitude";
    if(account.password.length < 8) return "Password must be 8 or more characters";
    if(!/^\S+@\S+\.\S+$/.test(account.email)) return "Invalid email";
    return "valid";
}

export async function createNewAccount(account: Account): Promise<Message> {
    try {
        await doesAccountExist(account.email);
        return { message: "Account with that email already exists", messageType: "error" }
    } catch {
        // account doesn't exist!
    }

    const databaseResponse = await createAccount(account);

    if(databaseResponse.messageType === "error") return { 
        message: databaseResponse.message,
        messageType: "error"
    };
    return {
        message: "",
        messageType: "info"
    };
}

export async function login(email: string, password: string): Promise<Message> {
    try {
        const account = await doesAccountExist(email);
        return new Promise((res, rej) => {
            bcrypt.compare(password, account.password, (err, result) => {
                if(err || !result) rej({ message: "Password does not match", messageType: "error" });
                res({
                    message: "",
                    messageType: "info",
                    data: {
                        session_token: putSessionToken(email),
                        type: account.type
                    }
                });
            })
        })
    } catch(ex: any) {
        return { message: ex.message || "Unknown error", messageType: "error" };
    }
}
