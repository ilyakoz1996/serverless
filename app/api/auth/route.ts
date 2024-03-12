import { AUTH_CLIENT_URL, AUTH_SERVER_URL, CLIENT_ID, CLIENT_SECRET, CLIENT_URL, SERVER_URL, TOKEN_ENDPOINT } from '@/core/constants';
import axios from 'axios';

import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';


export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const login = searchParams.get('login')
    const callback = searchParams.get('callback')
    const code = searchParams.get('code')
    try {
        if (login) {
            const url = `${AUTH_SERVER_URL}/auth/auth?client_id=${CLIENT_ID}&redirect_uri=${SERVER_URL}/auth?callback=true&scope=openid email`;
            return NextResponse.redirect(new URL(url))
        } else if (callback && code) {
            try {
                const response = await axios.post(`${TOKEN_ENDPOINT}`, {
                  grant_type: 'authorization_code',
                  code: code,
                  redirect_uri: `${SERVER_URL}/auth?callback=true`,
                  client_id: CLIENT_ID,
                  client_secret: CLIENT_SECRET,
                });
                
                const { access_token } = response.data;
                const redirectURL = new URL(`${AUTH_CLIENT_URL}/grantAccess/success`);
                redirectURL.searchParams.append('code', access_token);
                return NextResponse.redirect(new URL(redirectURL))

              } catch (error) {
                console.error(error);
                return NextResponse.json({ error: 'Internal Server Error' });
              }
    } else  {
        return NextResponse.json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
