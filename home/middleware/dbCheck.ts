import dbConnect from '@/helpers/dbConnect';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next';

export async function dbCheck(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  const dbConnected = await dbConnect();
  const { success } = dbConnected;
  console.log(success);
  if (!success) {
    return NextResponse.json({ success: false, Error: dbConnected.error });
  } else {
    next();
  }
}
