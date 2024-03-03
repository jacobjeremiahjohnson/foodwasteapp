const { MongoClient, ObjectId } = require("mongodb");

const bcrypt = require("bcryptjs");

const connectionString = `mongodb+srv://rogermc:${process.env.db_password}@foodwasteapp.ooikvb5.mongodb.net/?retryWrites=true&w=majority&appName=foodwasteapp`;
const client = new MongoClient(connectionString);

const db = client.db("foodwasteapp");
const accounts = db.collection("accounts");
const orders = db.collection("orders");

const saltRounds = 10;
export async function createAccountDB(account: Account): Promise<Message> {
    return new Promise((res, rej) => {
        bcrypt.hash(account.password, saltRounds, (err, hash) => {
            if(err) rej({ message: "Error in password hashing", messageType: "error" });
    
            account.password = hash;
            accounts.insertOne(account).then(() => res({ message: "", messageType: "info" }));
        });
    })
}

export async function getAccountDB(email: string): Promise<Account> {
    const account = await accounts.findOne({ email: email });
    if(account === null) throw new Error("An account with that email does not exist");
    return account;
}

export async function getNearbyProducersDB(email: string, meters: number): Promise<Account[]> {
    const account = await getAccountDB(email);
    const nearbyAccounts = await accounts.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: account.location.coordinates
                },
                $maxDistance: meters
            }
        },
        type: "producer"
    }).toArray();
    return nearbyAccounts;
}

export async function sendOrderDB(email: string, orderRequest: OrderRequest): Promise<Message> {
    const account = await getAccountDB(email);
    const request = {
        email: email,
        name: account.name,
        time_to_expire: Date.now() + orderRequest.minutes_to_expire * 60 * 1000,
        description: orderRequest.description,
        image_url: orderRequest.image_url,
        pounds: orderRequest.pounds,
        address: account.address,
        location: {
            type: "Point",
            coordinates: account.location.coordinates
        },
        status: "open"
    };

    try {
        await orders.insertOne(request);
        return { message: "Order successfully created", messageType: "info" };
    } catch(ex: any) {
        return { message: ex.message || "Unknown error", messageType: "error" };
    }
}

export async function getOrdersByEmailDB(email: string): Promise<RequestResponse[]> {
    const myOrders = await orders.find({ email: email }).toArray();
    const formattedOrders = myOrders.map(o => {
        return {
            email: o.email,
            name: o.name,
            minutes_to_expire: (o.time_to_expire - Date.now()) / 1000 / 60,
            description: o.description,
            image_url: o.image_url,
            pounds: o.pounds,
            status: o.status,
            location: {
                address: o.address,
                longitude: o.location.coordinates[0],
                latitude: o.location.coordinates[1]
            },
            id: o._id
        };
    });
    return formattedOrders;
}

export async function getNearbyOrdersDB(email: string, meters: number): Promise<RequestResponse[]> {
    const account = await getAccountDB(email);
    const nearbyOrders = await orders.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: account.location.coordinates
                },
                $maxDistance: meters
            }
        }
    }).toArray();
    const formattedOrders = nearbyOrders.map(o => {
        return {
            email: o.email,
            name: o.name,
            minutes_to_expire: (o.time_to_expire - Date.now()) / 1000 / 60,
            description: o.description,
            image_url: o.image_url,
            pounds: o.pounds,
            status: o.status,
            location: {
                address: o.address,
                longitude: o.location.coordinates[0],
                latitude: o.location.coordinates[1]
            },
            id: o._id
        };
    });
    return formattedOrders;
}

export async function claimOrderDB(id: string): Promise<Message> {
    try {
        const results = await orders.updateOne({ _id: new ObjectId(id) }, { $set: { status: "claimed" } });
        if(results.matchedCount === 0) return { message: "No order found with that ID", messageType: "error" };
        return { message: "Successfully claimed order", messageType: "info" };
    } catch(ex: any) {
        return { message: ex.message || "Unknown error", messageType: "error" };
    }
}

export async function closeOrderDB(id: string): Promise<Message> {
    try {
        const results = await orders.updateOne({ _id: new ObjectId(id) }, { $set: { status: "closed" } });
        if(results.matchedCount === 0) return { message: "No order found with that ID", messageType: "error" };
        return { message: "Successfully closed order", messageType: "info" };
    } catch(ex: any) {
        return { message: ex.message || "Unknown error", messageType: "error" };
    }
}

// run once every 5 minutes
export function expireOrders() {
    orders.updateMany(
        {
            time_to_expire: {
                $lte: Date.now()
            },
            status: "open"
        },
        {
            $set: {
                status: "expired"
            } 
        }
    );
}

export function pruneOrders() {
    orders.deleteMany(
        {
            time_to_expire: {
                $lte: Date.now() - 1000 * 60 * 60 * 24 * 2 // now - 2 days
            }
        }
    );
}
