interface Account {
    name: string,
    description: string,
    location: {
        address: string,
        longitude: number,
        latitude: number
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
