import UploadService from '../_services/_upload';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const uploadService = new UploadService()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const image = body.image;

    if (!image) {
      return NextResponse.json({ error: 'Missing image data in request' });
    }

    const url = await uploadService.uploadImage(image);

    return NextResponse.json({ url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
