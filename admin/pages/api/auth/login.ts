import apiRoute from '@/helpers/nextConnect';
import { authenticate, localStrategy } from '@/helpers/passport';
import type { NextApiRequest, NextApiResponse } from 'next';
import { dbCheck } from '../../../middleware/dbCheck';
import passport from 'passport';
import cors from 'cors';
import { updateAccessToken } from '@/helpers/hashing';
import { IUser } from '@/models/Users';

type Data = {
  name?: string;
  success: boolean;
  error?: string;
  accessToken?: string;
  accessRole?: string;
};

passport.use(localStrategy);

apiRoute
  .use(cors())
  .use(passport.initialize())
  .post(dbCheck, async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
      const { strategy } = req.body;
      const user = await authenticate(strategy, req, res);
      if (!(user as any).message) {
        if ((user as any).isAdmin) {
          const { accessToken, accessRole, errorMessage } =
            await updateAccessToken(user as IUser, res);
          if (errorMessage !== null) {
            res.status(401).json({ success: false, error: errorMessage });
          } else {
            res.status(200).send({
              success: true,
              accessToken: accessToken,
              accessRole: accessRole,
            });
          }
        } else {
          res.status(401).json({ success: false, error: 'notAdmin' });
        }
      } else {
        console.log(user);
        res.status(200).json({ success: false, error: (user as any).message });
      }
    } catch (error) {
      res.status(401).json({ success: false, error: (error as Error).message });
    }
  });

export default apiRoute;
