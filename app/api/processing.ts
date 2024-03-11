import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import TokensService from './_services/_tokens';
import WalletsService from './_services/_wallets';
import { IToken, IWallet } from '@/core/types';

const tokensService = new TokensService()
const walletsService = new WalletsService()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { projectId, productId, tokenId, from, clientEmail, price } = req.body;

    if (!projectId || !tokenId || !from || !clientEmail || !price) {
      return res.status(400).json({ error: 'Missing required fields in request' });
    }

    const token = await tokensService.getToken(Number(tokenId));

    console.log({
      price,
      tokenPrice: token.price,
      tokenAmount: Number(price) / Number(token.price),
      fixedString: (Number(price) / Number(token.price)).toFixed(token.stable ? 2 : 8),
    });

    const tokenAmount = (Number(price) / Number(token.price)).toFixed(token.stable ? 2 : 8);

    const merchantWallet = await walletsService.getWallet(projectId);

    const getMerchantAddress = (token: IToken, wallet: IWallet) => {
      switch (token.network) {
        case 'ethereum':
        case 'bsc':
        case 'polygon':
          return wallet.evm;
        case 'bitcoin':
          return wallet.btc;
        case 'litecoin':
          return wallet.ltc;
        case 'tron':
          return wallet.tron;
        default:
          return res.status(400).json({ error: 'Unsupported token network' });
      }
    };

    const invoiceResponse = await axios.post(`${process.env.PROCESSING_SERVER_URL}/invoice`, {
      merchantId: process.env.CLIENT_ID,
      projectId,
      productId: productId ? productId : undefined,
      tokenId: token.id,
      tokenAmount,
      from,
      to: getMerchantAddress(token, merchantWallet),
      clientEmail: clientEmail.trim(),
    });

    if (invoiceResponse.data && invoiceResponse.data.invoiceId) {
      return res.json({ invoiceId: invoiceResponse.data.invoiceId });
    } else {
      console.error('Error creating invoice:', invoiceResponse.data);
      return res.status(500).json({ error: 'Failed to create invoice' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
