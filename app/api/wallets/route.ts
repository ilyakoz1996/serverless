import { NextRequest, NextResponse } from 'next/server';
import WalletsService from '../_services/_wallets';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const walletsService = new WalletsService()
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const projectId = searchParams.get('projectId')

  if (!projectId) {
    return NextResponse.json({ error: 'Missing project ID in request' });
  }

  try {
    const wallet = await walletsService.getWallet(projectId);

    if (wallet) {
      return NextResponse.json(wallet)
    } else {
      return NextResponse.json({ error: 'Wallet not found' });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}


