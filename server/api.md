# auth

## POST /api/v1/create-account

body:
```
{
    name: string,
    description: string,
    address: string,
    location: {
        longitude: number,
        latitude: number
    },
    username: string,
    password: string
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