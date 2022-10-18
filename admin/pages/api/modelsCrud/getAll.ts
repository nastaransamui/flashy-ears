import nextConnect from 'next-connect';
import { NextApiResponse } from 'next';
import { HazelcastType } from '@/interfaces/next.interface';
import { verifyToken } from 'middleware/verifyToken';
import { dbCheck } from 'middleware/dbCheck';
import hazelCast from 'middleware/hazelCast';
import mongoose, { Model } from 'mongoose';
import Roles, { IRole } from '@/models/Roles';
import Users, { IUser } from '@/models/Users';
import Videos, { IVideo } from '@/models/Videos';
import Photos, { IPhoto } from '@/models/Photos';
import Features, { IFeature } from '@/models/Features';
import {
  findAllUsersWithPagginate,
  findAllRolesWithPagginate,
  findAllVideosWithPagginate,
  findAllPhotosWithPagginate,
  findAllUsers,
  findAllRoles,
  findAllVideos,
  findAllPhotos,
  paginate,
  MultiMapKey,
  MultiMapValue,
  findAllFeaturesWithPagginate,
  findAllFeatures,
} from '@/helpers/dbFinds';
import type { MultiMap } from 'hazelcast-client/lib/proxy/MultiMap';
import {
  addFeaturesFaker,
  addPhotosFaker,
  addRolesFaker,
  addUsersFaker,
  addVideosFaker,
} from '@/lib/faker';

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
  totalCount?: number;
};

type Results = {
  data: object[];
  totalCount: number;
};

apiRoute.post(
  verifyToken,
  dbCheck,
  hazelCast,
  async (req: HazelcastType, res: NextApiResponse<Data>) => {
    // addUsersFaker();
    // addRolesFaker();
    // addVideosFaker();
    // addPhotosFaker();
    // addFeaturesFaker();
    try {
      const { modelName, perPage, pageNumber, sortByField, sortDirection } =
        req.body;
      const hz = req.hazelCast;
      var collection = mongoose.model(modelName);
      if (hz) {
        const multiMap = await hz.getMultiMap(modelName);
        const dataIsExist = await multiMap.containsKey(`all${modelName}`);
        if (dataIsExist) {
          const values = await multiMap.get(`all${modelName}`);
          for (const value of values as any) {
            res.status(200).json({
              success: true,
              data: paginate(value, perPage, pageNumber),
              totalCount: value.length,
            });
          }
        } else {
          switch (modelName) {
            case 'Users':
              var result: Results = await findAllUsers(
                modelName,
                sortByField,
                perPage,
                pageNumber,
                sortDirection,
                multiMap as MultiMap<MultiMapKey, MultiMapValue>
              );
              res.status(200).json({ success: true, ...result });
              break;
            case 'Roles':
              var result: Results = await findAllRoles(
                modelName,
                sortByField,
                perPage,
                pageNumber,
                sortDirection,
                multiMap as MultiMap<MultiMapKey, MultiMapValue>
              );
              res.status(200).json({ success: true, ...result });
              break;
            case 'Videos':
              var result: Results = await findAllVideos(
                modelName,
                sortByField,
                perPage,
                pageNumber,
                sortDirection,
                multiMap as MultiMap<MultiMapKey, MultiMapValue>
              );
              res.status(200).json({ success: true, ...result });
              break;
            case 'Photos':
              var result: Results = await findAllPhotos(
                modelName,
                sortByField,
                perPage,
                pageNumber,
                sortDirection,
                multiMap as MultiMap<MultiMapKey, MultiMapValue>
              );
              res.status(200).json({ success: true, ...result });
              break;
            case 'Features':
              var result: Results = await findAllFeatures(
                modelName,
                sortByField,
                perPage,
                pageNumber,
                sortDirection,
                multiMap as MultiMap<MultiMapKey, MultiMapValue>
              );
              res.status(200).json({ success: true, ...result });
              break;

            default:
              break;
          }
          // res
          //   .status(500)
          //   .json({ success: false, error: '(error as Error).message' });
        }

        await hz.shutdown();
      } else {
        switch (modelName) {
          case 'Users':
            var result: Results = await findAllUsersWithPagginate(
              collection as Model<IUser>,
              perPage,
              pageNumber,
              sortByField,
              sortDirection
            );
            res.status(200).json({ success: true, ...result });
            break;
          case 'Roles':
            var result: Results = await findAllRolesWithPagginate(
              collection as Model<IRole>,
              perPage,
              pageNumber,
              sortByField,
              sortDirection
            );
            res.status(200).json({ success: true, ...result });
            break;
          case 'Videos':
            var result: Results = await findAllVideosWithPagginate(
              collection as Model<IVideo>,
              perPage,
              pageNumber,
              sortByField,
              sortDirection
            );
            res.status(200).json({ success: true, ...result });
            break;
          case 'Photos':
            var result: Results = await findAllPhotosWithPagginate(
              collection as Model<IPhoto>,
              perPage,
              pageNumber,
              sortByField,
              sortDirection
            );
            res.status(200).json({ success: true, ...result });
            break;
          case 'Features':
            var result: Results = await findAllFeaturesWithPagginate(
              collection as Model<IFeature>,
              perPage,
              pageNumber,
              sortByField,
              sortDirection
            );
            res.status(200).json({ success: true, ...result });
            break;

          default:
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
