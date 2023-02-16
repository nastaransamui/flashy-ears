import nextConnect from 'next-connect';
import { NextApiResponse, NextApiRequest } from 'next';
// import { HazelcastType } from '@/interfaces/next.interface';
import { dbCheck } from 'middleware/dbCheck';
import Theme, { ITheme } from 'homeModels/Theme';
import cors from 'cors';

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
  data?: object[];
};

apiRoute.use(cors());

apiRoute.get(
  dbCheck,
  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
      var theme = await Theme.find({});
      if (theme.length == 0) {
        Theme.insertMany([
          {
            name: 'oceanBlue',
          },
        ])
          .then(async () => {
            var theme = await Theme.find({});
            res.status(200).json({
              success: true,
              data: theme[0],
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        res.status(200).json({
          success: true,
          data: theme[0],
        });
      }
    } catch (error) {
      res.status(401).json({ success: false, Error: (error as Error).message });
    }
  }
);
export default apiRoute;
