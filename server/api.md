# auth

## POST /api/v1/create-account

body:
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

## POST /api/v1/login

body:
```
{
    username: string,
    password: string
}
```

- code 200: success, body:
```
{
    session-token: string
}
```
- anything else: bad