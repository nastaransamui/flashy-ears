import { authenticate, localStrategy } from '@/helpers/passport';
import { dbCheck } from '../../../middleware/dbCheck';
import passport from 'passport';
import cors from 'cors';
import { updateAccessToken } from '@/helpers/hashing';
import { IUser } from '@/models/Users';
import { AccessRoleType } from '@/models/Roles';
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res
      .status(405)
      .json({ success: false, Error: `Method '${req.method}' Not Allowed` });
  },
});

type Data = {
  name?: string;
  success: boolean;
  error?: string;
  accessToken?: string;
  accessRole?: AccessRoleType[];
};

passport.use(localStrategy);

apiRoute
  .use(cors())
  .use(passport.initialize())
  .post(dbCheck, async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
      const { strategy } = req.body;
      const user = await authenticate(strategy, req, res);
      // console.log(user);
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
        res.status(200).json({ success: false, error: (user as any).message });
      }
    } catch (error) {
      res.status(401).json({ success: false, error: (error as Error).message });
    }
  });

export default apiRoute;
