const SERVER_URL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
const CLIENT_URL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
const AUTH_SERVER_URL = "https://s-auth.org"

const updateLinks = async () => {
    const response = await fetch(`${AUTH_SERVER_URL}/updateApp?clientId=${CLIENT_ID}&websiteUrl=${CLIENT_URL}&callbackUrl=${SERVER_URL}/api/auth?callback=true`);
    const updateUrl = await response.json();
    return updateUrl
}

updateLinks()