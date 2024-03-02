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

## POST /api/v1/create-account

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

```
{
    username: string,
    password: string
}
```

- code 200: success, data: { session-token: string }
- anything else: bad