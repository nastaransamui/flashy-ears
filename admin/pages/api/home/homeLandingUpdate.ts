import nextConnect from 'next-connect';
import { NextApiResponse, NextApiRequest } from 'next';
// import { HazelcastType } from '@/interfaces/next.interface';
import { dbCheck } from 'middleware/dbCheck';
import Theme, { ITheme } from 'homeModels/Theme';
import cors from 'cors';
import { verifyToken } from 'middleware/verifyToken';

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
  success: boolean;
  Error?: string;
  data?: object;
};
apiRoute.use(cors());

apiRoute.post(
  verifyToken,
  dbCheck,
  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
      const filter = {};
      const update = { homePageType: req.body.homePageType };
      let doc = await Theme.findOneAndUpdate(filter, update);
      doc = await Theme.findOne(filter);
      res.status(200).json({
        success: true,
        data: doc,
      });
    } catch (error) {
      res.status(401).json({ success: false, Error: (error as Error).message });
    }
  }
);
export default apiRoute;
