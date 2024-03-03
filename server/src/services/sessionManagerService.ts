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
function pruneSessionTokens() {
    for(const session in sessionTokens) {
        if(sessionTokens[session].creation - (Date.now() + 20 * 60000) < 0) delete sessionTokens[session];
    }
}
