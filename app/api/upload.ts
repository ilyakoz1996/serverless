import { NextApiRequest, NextApiResponse } from 'next';
import UploadService from './_services/_upload';

const uploadService = new UploadService()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const image = req.body.image;

    if (!image) {
      return res.status(400).json({ error: 'Missing image data in request' });
    }

    const url = await uploadService.uploadImage(image);

    res.status(201).json({ url }); // Created status code with the uploaded image URL
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
