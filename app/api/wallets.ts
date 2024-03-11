import { NextApiRequest, NextApiResponse } from 'next';
import WalletsService from './_services/_wallets';

const walletsService = new WalletsService()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!req.query.projectId) {
    return res.status(400).json({ error: 'Missing project ID in request' });
  }

  try {
    const wallet = await walletsService.getWallet(req.query.projectId as string);

    if (wallet) {
      res.status(200).json(wallet);
    } else {
      res.status(404).json({ error: 'Wallet not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
