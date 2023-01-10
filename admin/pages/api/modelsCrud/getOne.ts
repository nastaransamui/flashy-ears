import nextConnect from 'next-connect';
import { NextApiResponse } from 'next';
import { HazelcastType } from '@/interfaces/next.interface';
import { verifyToken } from 'middleware/verifyToken';
import { dbCheck } from 'middleware/dbCheck';
import hazelCast from 'middleware/hazelCast';
import mongoose, { Model } from 'mongoose';
import type { MultiMap } from 'hazelcast-client/lib/proxy/MultiMap';
import { findFunctions, findMuliMapFunctions } from '@/helpers/dbFinds';

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
        const multiMap = await hz.getMultiMap(modelName);
        const dataIsExist = await multiMap.containsKey(`all${modelName}`);
        console.log(req.body);
        if (dataIsExist) {
          const data = await findMuliMapFunctions[
            `find${modelName}ById` as keyof typeof findMuliMapFunctions
          ]?.(_id, lookupsFilter, hz, multiMap);
          res.status(200).json({ success: true, data: data });
          await hz.shutdown();
        } else {
          const data = await findFunctions[
            `find${modelName}ById` as keyof typeof findFunctions
          ]?.(_id, lookupsFilter);
          res.status(200).json({ success: true, data: data });
        }
      } else {
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
