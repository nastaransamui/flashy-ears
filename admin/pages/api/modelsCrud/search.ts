import nextConnect from 'next-connect';
import { NextApiResponse } from 'next';
import { HazelcastType } from '@/interfaces/next.interface';
import { verifyToken } from 'middleware/verifyToken';
import { dbCheck } from 'middleware/dbCheck';
import hazelCast from 'middleware/hazelCast';
import type { MultiMap } from 'hazelcast-client/lib/proxy/MultiMap';
import {
  searchAgencies,
  searchAllCities,
  searchAllCountries,
  searchAllCurrencies,
  searchAllProvince,
  searchFeatures,
  searchModelsHZ,
  searchPhotos,
  searchRoles,
  searchUsers,
  searchCollections,
} from '@/helpers/searchFind';

export function escapeRegExp(value: string) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

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
  error?: string;
  data?: object[];
};

type Results = {
  data: object[];
};

apiRoute.post(
  verifyToken,
  dbCheck,
  hazelCast,
  async (req: HazelcastType, res: NextApiResponse<Data>) => {
    try {
      const { modelName, activeOnly, filterValue, fieldValue } = req.body;
      const hz = req.hazelCast;
      const searchRegex = new RegExp(escapeRegExp(filterValue), 'i');
      // console.log(hz);
      if (hz) {
        const multiMap = await hz.getMultiMap(modelName);
        const dataIsExist = await multiMap.containsKey(`all${modelName}`);
        if (dataIsExist) {
          const values = await multiMap.get(`all${modelName}`);
          var result: Results = await searchModelsHZ(
            filterValue,
            fieldValue,
            values,
            modelName,
            activeOnly
          );
          res.status(200).json({ success: true, ...result });
          await hz.shutdown();
        }
      } else {
        switch (modelName) {
          case 'Users':
            var result: Results = await searchUsers(searchRegex, fieldValue);
            res.status(200).json({ success: true, ...result });
            break;
          case 'Roles':
            var result: Results = await searchRoles(searchRegex, fieldValue);
            res.status(200).json({ success: true, ...result });
            break;
          case 'Collections':
            var result: Results = await searchCollections(
              searchRegex,
              fieldValue
            );
            res.status(200).json({ success: true, ...result });
            break;
          case 'Photos':
            var result: Results = await searchPhotos(searchRegex, fieldValue);
            res.status(200).json({ success: true, ...result });
            break;
          case 'Features':
            var result: Results = await searchFeatures(searchRegex, fieldValue);
            res.status(200).json({ success: true, ...result });
            break;
          case 'Countries':
            var result: Results = await searchAllCountries(
              searchRegex,
              fieldValue,
              activeOnly
            );
            res.status(200).json({ success: true, ...result });
            break;
          case 'Currencies':
            var result: Results = await searchAllCurrencies(
              searchRegex,
              fieldValue,
              activeOnly
            );
            res.status(200).json({ success: true, ...result });
            break;
          case 'Provinces':
            var result: Results = await searchAllProvince(
              searchRegex,
              fieldValue
            );
            res.status(200).json({ success: true, ...result });
            break;
          case 'Cities':
            var result: Results = await searchAllCities(
              searchRegex,
              fieldValue
            );
            res.status(200).json({ success: true, ...result });
            break;
          case 'Agencies':
            var result: Results = await searchAgencies(filterValue, fieldValue);
            res.status(200).json({ success: true, ...result });
            break;

          default:
            res.status(200).json({ success: true, data: [] });
            break;
        }
      }
    } catch (error) {
      const hz = req.hazelCast;
      res.status(401).json({ success: false, error: (error as Error).message });
      if (hz) {
        await hz.shutdown();
      }
    }
  }
);

export default apiRoute;
