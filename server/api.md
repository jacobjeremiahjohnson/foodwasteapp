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

## /me

```
{
    session_token: string
}
```

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

## /nearby-producers

```
{
    session_token: string
}
```

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
