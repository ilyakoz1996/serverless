import UsersService from "../_services/_users";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const usersService = new UsersService()

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const userId = searchParams.get('userId')
    const email = searchParams.get('email')
    const code = searchParams.get('code')
    if (userId) {
        const user = await usersService.getUserById(userId as string);
        return NextResponse.json(user)
    } else if (email) {
        const user = await usersService.getUserByEmail(email as string);
        return NextResponse.json(user)
    } else {
        const users = await usersService.getUsers();
        return NextResponse.json(users)
    }
}
export async function POST(req: NextRequest) {
    const body = await req.json()
    const user = await usersService.createUser(body.access_token, body.email, body.title, body.img);
    return NextResponse.json(user)
}
export async function PUT(req: NextRequest) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const userId = searchParams.get('userId')
    const email = searchParams.get('email')
    const body = await req.json()
    if (userId) {
        const user = await usersService.updateUserById(userId, body.title, body.img);
        return NextResponse.json(user)
    } else if (email) {
        const user = await usersService.updateUserByEmail(email as string, body.title, body.img);
        return NextResponse.json(user)
    } else {
        return NextResponse.json({ error: 'Missing user ID or email in request' })
    }
}
export async function DELETE(req: NextRequest) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const userId = searchParams.get('userId')
    if (userId) {
        const user = await usersService.deleteUserById(userId as string);
        return NextResponse.json(user)
    } else {
        return NextResponse.json({ error: 'Missing user ID or email in request' })
    }
}
