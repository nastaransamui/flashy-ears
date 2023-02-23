import nextConnect from 'next-connect';
import { NextApiResponse, NextApiRequest } from 'next';
import { dbCheck } from 'middleware/dbCheck';
import Colors, { IColors } from 'homeModels/Colors';
import { verifyToken } from 'middleware/verifyToken';
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
  data?: IColors;
};
apiRoute.use(cors());
apiRoute.post(
  verifyToken,
  dbCheck,
  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
      console.log(req.body);
      const newColor = new Colors(req.body);
      newColor.save((err: Error, result: IColors) => {
        if (err) {
          res
            .status(401)
            .json({ success: false, Error: (err as Error).message });
        } else {
          res.status(200).json({
            success: true,
            data: result,
          });
        }
      });
    } catch (error) {
      res.status(401).json({ success: false, Error: (error as Error).message });
    }
  }
);
export default apiRoute;
