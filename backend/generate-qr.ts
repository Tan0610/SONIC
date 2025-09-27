import type { NextApiRequest, NextApiResponse } from 'next';
import * as QRCode from 'qrcode';


type QRCodeResponse = {
  qrCode?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QRCodeResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { userAddress, attributes } = req.body;
  if (!userAddress) {
    return res.status(400).json({ error: 'Missing userAddress' });
  }

  try {
    const qrPayload = {
      address: userAddress,
      attributes: attributes || ['unique_human', 'age_over_18', 'country', 'language'],
    };

    // Generate QR code data URL from JSON string of the payload
    const qr = await QRCode.toDataURL(JSON.stringify(qrPayload));

    res.status(200).json({ qrCode: qr });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
}
