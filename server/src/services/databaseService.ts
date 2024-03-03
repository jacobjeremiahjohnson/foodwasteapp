const { MongoClient } = require("mongodb");

const bcrypt = require("bcryptjs");

const connectionString = `mongodb+srv://rogermc:${process.env.db_password}@foodwasteapp.ooikvb5.mongodb.net/?retryWrites=true&w=majority&appName=foodwasteapp`;
const client = new MongoClient(connectionString);

const db = client.db("foodwasteapp");
const accounts = db.collection("accounts");

const saltRounds = 10;
export async function createAccount(account: Account): Promise<Message> {
    return new Promise((res, rej) => {
        bcrypt.hash(account.password, saltRounds, (err, hash) => {
            if(err) rej({ message: "Error in password hashing", messageType: "error" });
    
            account.password = hash;
            accounts.insertOne(account).then(() => res({ message: "", messageType: "info" }));
        });
    })
}

export async function getAccount(email: string): Promise<Account> {
    const account = await accounts.findOne({ email: email });
    if(account === null) throw new Error("An account with that email does not exist");
    return account;
}

export async function getNearbyProducers(email: string, meters: number): Promise<Account[]> {
    const account = await getAccount(email);
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