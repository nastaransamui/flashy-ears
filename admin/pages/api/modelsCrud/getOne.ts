import nextConnect from 'next-connect';
import { NextApiResponse } from 'next';
import { HazelcastType } from '@/interfaces/next.interface';
import { verifyToken } from 'middleware/verifyToken';
import { dbCheck } from 'middleware/dbCheck';
import hazelCast from 'middleware/hazelCast';
import mongoose, { Model } from 'mongoose';
import type { MultiMap } from 'hazelcast-client/lib/proxy/MultiMap';
import { findFunctions } from '@/helpers/dbFinds';

const apiRoute = nextConnect<HazelcastType, NextApiResponse>({
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

apiRoute.post(
  verifyToken,
  dbCheck,
  hazelCast,
  async (req: HazelcastType, res: NextApiResponse<Data>, next: () => void) => {
    try {
      const { modelName, _id, lookupsFilter } = req.body;

      const hz = req.hazelCast;
      var collection = mongoose.model(modelName);
      if (hz) {
        res.status(401).json({ success: false, Error: 'update Hz' });
      } else {
        // const func = findUsersById;
        const data = await findFunctions[
          `find${modelName}ById` as keyof typeof findFunctions
        ]?.(_id, lookupsFilter);
        res.status(200).json({ success: true, data: data });
      }
    } catch (error) {
      const hz = req.hazelCast;
      res
        .status(500)
        .json({ success: false, Error: (error as Error).toString() });
      if (hz) {
        await hz.shutdown();
      }
    }
  }
);

export default apiRoute;
