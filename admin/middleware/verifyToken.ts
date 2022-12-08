import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { deleteCookie } from 'cookies-next';

export async function verifyToken(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  const authHeader = req.headers.token as string;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(
      token,
      process.env.NEXT_PUBLIC_SECRET_KEY,
      (err: any, user: any) => {
        if (err) {
          deleteCookie('adminAccessToken', { req, res });
          res.status(401).json({
            success: false,
            error: 'Your Login is expired please relogin again!',
          });
        } else {
          next();
        }
      }
    );
  } else {
    return res
      .status(500)
      .json({ success: false, Error: 'You are not authenticated!' });
  }
}
