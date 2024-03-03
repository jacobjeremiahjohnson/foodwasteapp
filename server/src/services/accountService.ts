import { getAccountDB, getNearbyProducersDB } from "./databaseService";

export async function getAccount(email: string): Promise<Message> {
    try {
        const account = await getAccountDB(email);
        return {
            message: "Successfully fetched account",
            messageType: "info",
            data: {
                name: account.name,
                description: account.description,
                location: {
                    address: account.address,
                    latitude: account.location.coordinates[1],
                    longitude: account.location.coordinates[0]
                },
                email: account.email,
                type: account.type
            }
        };
    } catch(ex: any) {
        return { message: ex.message || "Unknown error", messageType: "error" };
    }
}

export async function getNearbyProducers(email: string, rangeInMeters: number): Promise<Message> {
    try {
        const nearbyAccounts = await getNearbyProducersDB(email, rangeInMeters);
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
        return {
            message: "",
            messageType: "info",
            data: {
                producers: formattedAccounts
            }
        };
    } catch(ex: any) {
        return {
            message: ex.message || "Unknown error",
            messageType: "error"
        };
    }
}
