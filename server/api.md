all responses are in the format of this object:
```
{
    message: string,
    data: {
        // data here
    }
}
```
if the api doc here specifies some kind of data, then it will be in the response.data object

# auth

## POST /create-account

```
{
    name: string,
    description: string,
    location: {
        address: string,
        longitude: number,
        latitude: number
    },
    email: string,
    password: string,
    type: "producer" | "consumer"
}
```

- code 201: success
- anything else: bad

## POST /login

```
{
    email: string,
    password: string
}
```

- code 200: success, data: { session_token: string, type: "producer" | "consumer" }
- anything else: bad

# account

For all of these you need Session-Token = (token) set in the headers

## GET /me

- code 200: success, data: {
    name: string,
    description: string,
    location: {
        address: string
        latitude: number,
        longitude: number
    },
    email: string,
    type: "producer" | "consumer"
}

## GET /nearby-producers

- code 200: success, data: {
    producers: [
        ...
        {
            name: string,
            description: string,
            location: {
                address: string,
                latitude: number,
                longitude: number
            },
            email: string
        }
    ]
}

# orders

need a Session-Token like above

## POST /send-order

Used by producers.

```
{
    minutes_to_expire: number,
    description: string,
    image_url: string, // this url is created in browser
    pounds: number
}
```

- code 200: success

## GET /my-orders
response message data:

Used by producers.

```
{
    orders: [
        ...
        {
            email: string,
            name: string
            time_to_expire: number (unix milliseconds),
            description: string,
            image_url: string,
            pounds: number,
            location: {
                address: string,
                longitude: number,
                latitude: number
            }
            status: "open" | "claimed" | "expired" | "closed",
            id: ObjectID
        }
    ] 
}
// open means it's ok
// claimed means it's ok and a consumer pinged the order to claim it
// expired means it was thrown out
// closed means it was picked up successfully
```

## GET /nearby-orders

Used by consumers.

response data:
```
{
    orders: [
        ...
        {
            // same as above
        }
    ]
}
```

## POST /claim-order/:ObjectID

Used by consumers.

ok or error message
