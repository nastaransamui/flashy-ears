import nextConnect from 'next-connect';
import { NextApiResponse, NextApiRequest } from 'next';
import { dbCheck } from 'middleware/dbCheck';
import Colors, { IColors } from 'homeModels/Colors';
import Collections, { ICollection } from 'homeModels/Collections';

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

type allDataType = {
  collections: ICollection[];
  colors: IColors[];
};

type Data = {
  success: boolean;
  Error?: string;
  data?: allDataType;
};
apiRoute.use(cors());
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    let allColors = await Colors.find({});
    let allCollections = await Collections.find({});
    res.status(200).json({
      success: true,
      data: {
        collections: allCollections,
        colors: allColors,
      },
    });
  } catch (error) {
    res.status(401).json({ success: false, Error: (error as Error).message });
  }
});

export default apiRoute;
