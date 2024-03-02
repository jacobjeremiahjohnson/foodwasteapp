const sessionTokens: {
    [key: string]: Session
} = {}

function generateSessionToken(): string {
    return "t" + Date.now() + Math.random();
}

export function putSessionToken(email: string): Session {
    sessionTokens[email] = {
        token: generateSessionToken(),
        creation: Date.now()
    };
    return sessionTokens[email];
}

// run every 5 min
function pruneSessionTokens() {
    for(const session in sessionTokens) {
        if(sessionTokens[session].creation - (Date.now() + 20 * 60000) < 0) delete sessionTokens[session];
    }
}
