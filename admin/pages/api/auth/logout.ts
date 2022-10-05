import { findUserById } from '@/helpers/dbFinds';
import { dbCheck } from '../../../middleware/dbCheck';
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
  user?: null;
  success: boolean;
  error?: string;
};

apiRoute.post(
  dbCheck,
  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const _id = req.body._id;
    try {
      findUserById(_id)
        .then(async (oldUser) => {
          oldUser.accessToken = '';
          await oldUser.save();
          res.status(200).json({ success: true, user: null });
        })
        .catch((err) => {
          res.status(401).json({ success: false, error: err.toString() });
        });
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  }
);

export default apiRoute;
