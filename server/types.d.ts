interface Account {
    name: string,
    description: string,
    address: string,
    location: {
        type: "Point",
        coordinates: [number, number] // longitude, latitude
    },
    email: string,
    password: string,
    type: string
}

type MessageType = "info" | "error"

interface Message {
    message: string,
    messageType: MessageType
    data?: any
}

interface Session {
    email: string,
    creation: number // unix timestamp
}

interface OrderRequest {
    minutes_to_expire: number,
    description: string,
    image_url: string,
    pounds: number
}

interface RequestResponse {
    minutes_to_expire: number,
    description: string,
    image_url: string,
    pounds: number,
    status: "open" | "claimed" | "expired" | "closed",
    _id: string
}
