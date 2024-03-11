import { NextApiRequest, NextApiResponse } from "next";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import UsersService from "./_services/_users";
const usersService = new UsersService()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            if (req.query.userId) {
                const user = await usersService.getUserById(req.query.userId as string);
                res.status(200).json(user);
            } else if (req.query.email) {
                const user = await usersService.getUserByEmail(req.query.email as string);
                res.status(200).json(user);
            } else {
                const users = await usersService.getUsers();
                res.status(200).json(users);
            }
            break;
        case 'POST':
            const user = await usersService.createUser(req.body.access_token, req.body.email, req.body.title, req.body.img);
            res.status(201).json(user);
            break;
        case 'PUT':
            if (req.query.userId) {
                const user = await usersService.updateUserById(req.body.userId, req.body.title, req.body.img);
                res.status(200).json(user);
            } else if (req.query.email) {
                const user = await usersService.updateUserByEmail(req.query.email as string, req.body.title, req.body.img);
                res.status(200).json(user);
            } else {
                res.status(400).json({ error: 'Missing user ID or email in request' });
            }
            break;
        case 'DELETE':
            if (req.query.userId) {
                const user = await usersService.deleteUserById(req.query.userId as string);
                res.status(200).json(user); // Consider returning a success message instead
            } else {
                res.status(400).json({ error: 'Missing user ID in request' });
            }
            break;
        default:
            res.status(405).json({ error: 'Method not allowed' });
    }
}
