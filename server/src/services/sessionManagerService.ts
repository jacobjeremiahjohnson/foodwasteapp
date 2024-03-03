const sessionTokens: {
    [key: string]: Session
} = {}

function generateSessionToken(): string {
    return "t" + Date.now() + Math.random().toString().substring(2) + Math.random().toString().substring(2);
}

export function getEmailFromSessionToken(token: string): string {
    return sessionTokens[token]?.email;
}

export function putSessionToken(email: string): string {
    const sessionToken = generateSessionToken();
    sessionTokens[sessionToken] = {
        email: email,
        creation: Date.now()
    };
    return sessionToken;
}

// run every 5 min
export function pruneSessionTokens() {
    for(const session in sessionTokens) {
        // current date is greater than when session started + 20 minutes, remove
        if(Date.now() > (sessionTokens[session].creation + 20 * 60000)) delete sessionTokens[session];
    }
}
