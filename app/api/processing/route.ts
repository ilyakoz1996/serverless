import axios from 'axios';
import TokensService from '../_services/_tokens';
import WalletsService from '../_services/_wallets';
import { IToken, IWallet } from '@/core/types';
import { NextRequest, NextResponse } from 'next/server';
import { CLIENT_ID, PROCESSING_SERVER } from '@/core/constants';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const tokensService = new TokensService()
const walletsService = new WalletsService()

export async function POST(req: NextRequest) {

  try {
    const body = await req.json();

    if (!body.projectId || !body.tokenId || !body.from || !body.clientEmail || !body.price) {
      return NextResponse.json({ error: 'Missing required fields in request' });
    }

    const token = await tokensService.getToken(Number(body.tokenId));

    const tokenAmount = (Number(body.price) / Number(token.price)).toFixed(token.stable ? 2 : 8);

    const merchantWallet = await walletsService.getWallet(body.projectId);

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
          return NextResponse.json({ error: 'Unsupported token network' });
      }
    };

    const invoiceResponse = await axios.post(`${PROCESSING_SERVER}/invoice`, {
      merchantId: CLIENT_ID,
      projectId: body.projectId,
      productId: body.productId ? body.productId : undefined,
      tokenId: token.id,
      tokenAmount: tokenAmount,
      tokenPrice: token.price,
      from: body.from,
      to: getMerchantAddress(token, merchantWallet),
      clientEmail: body.clientEmail.trim(),
    });

    if (invoiceResponse.data && invoiceResponse.data.invoiceId) {
      return NextResponse.json({ invoiceId: invoiceResponse.data.invoiceId });
    } else {
      console.error('Error creating invoice:', invoiceResponse.data);
      return NextResponse.json({ error: 'Failed to create invoice' });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
