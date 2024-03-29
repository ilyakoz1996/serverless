const updateLinks = async () => {

  const SERVER_URL = process.env.NEXT_PUBLIC_DOMAIN ? `${process.env.NEXT_PUBLIC_DOMAIN}/api` : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`;
  const CLIENT_URL = process.env.NEXT_PUBLIC_DOMAIN ? process.env.NEXT_PUBLIC_DOMAIN : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const AUTH_SERVER_URL = "https://api.s-auth.org";

  const url = `${AUTH_SERVER_URL}/updateApp?clientId=${CLIENT_ID}&websiteUrl=${CLIENT_URL}&callbackUrl=${SERVER_URL}/auth?callback=true`;
  console.log("url: ", url);
  try {
      const response = await fetch(url, {
        method: 'GET'
      })
      console.log('response: ',response.json())
      return response;
  } catch (err) {
    console.log(err)
    return 
  }
};

updateLinks();
