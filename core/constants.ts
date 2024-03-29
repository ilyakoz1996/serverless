export const SERVER_URL = process.env.NEXT_PUBLIC_DOMAIN ? `${process.env.NEXT_PUBLIC_DOMAIN}/api` : (process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api` : 'http://localhost:3000/api')
export const ROOT_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN ? process.env.NEXT_PUBLIC_DOMAIN : (process.env.NEXT_PUBLIC_VERCEL_URL ? process.env.NEXT_PUBLIC_VERCEL_URL : 'localhost:3000')
export const CLIENT_URL = process.env.NEXT_PUBLIC_DOMAIN ? process.env.NEXT_PUBLIC_DOMAIN : (process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000')
export const PRICES_SERVER = "https://rates.simplepay.ai"
export const PROCESSING_SERVER = "https://processing.simplepay.ai"
export const AUTH_CLIENT_URL = "https://s-auth.org"
export const AUTH_SERVER_URL = "https://api.s-auth.org"
export const TOKEN_ENDPOINT = "https://api.s-auth.org/auth/token"
export const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
export const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET