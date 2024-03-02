import { createAccount } from "./databaseService";

export function verifyNewAccount(account: Account): string {
    if(account.type !== "producer" && account.type !== "consumer") return "Invalid account type";
    if(account.location.longitude < -90 || account.location.longitude >= 90) return "Invalid longitude";
    if(account.location.latitude < -180 || account.location.latitude >= 180) return "Invalid latitude";
    if(account.password.length < 8) return "Password must be 8 or more characters";
    if(!/^\S+@\S+\.\S+$/.test(account.email)) return "Invalid email";
    return "valid";
}

export async function createNewAccount(account: Account): Promise<Message> {
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