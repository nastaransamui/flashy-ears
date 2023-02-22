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
import Agencies, { IAgent } from '@/models/Agencies';
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
  sort_by,
  findAllAgenciesWithPagginate,
  findAllAgencies,
  findAllCollectionsWithPagginate,
} from '@/helpers/dbFinds';

import type { MultiMap } from 'hazelcast-client/lib/proxy/MultiMap';
import { ICollection } from '@/models/Collections';

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
  data?: object[];
  totalCount?: number;
};

type Results = {
  data: object[];
  totalCount: number;
};

apiRoute.delete(
  verifyToken,
  dbCheck,
  hazelCast,
  async (req: HazelcastType, res: NextApiResponse<Data>, next: () => void) => {
    try {
      const {
        modelName,
        perPage,
        pageNumber,
        sortByField,
        sortDirection,
        activeOnly,
        arrayOfIds,
      } = req.body;
      var collection = mongoose.model(modelName);
      const hz = req.hazelCast;
      if (hz) {
        const multiMap: MultiMap<MultiMapKey, MultiMapValue> =
          await hz.getMultiMap(modelName);
        const dataIsExist = await multiMap.containsKey(
          `all${modelName}` as keyof typeof multiMap.containsEntry
        );
        if (dataIsExist) {
          const values = await multiMap.get(
            `all${modelName}` as keyof typeof multiMap.get
          );
          for (const value of values as any) {
            const filterdValue = value.filter(
              (a: any) => !arrayOfIds.includes(a._id)
            );
            await multiMap.clear();
            await multiMap.put(
              `all${modelName}` as keyof typeof multiMap.put,
              filterdValue
            );
            collection.deleteMany(
              {
                _id: { $in: arrayOfIds },
              },
              async (err: Error, respose: any) => {
                if (err) {
                  console.log(err);
                  res
                    .status(400)
                    .json({ success: false, Error: (err as Error).message });
                  await hz.shutdown();
                } else {
                  res.status(200).json({
                    success: true,
                    data: paginate(
                      sort_by(
                        activeOnly
                          ? filterdValue.filter((a: any) => a.isActive)
                          : filterdValue,
                        sortByField,
                        sortDirection
                      ),
                      perPage,
                      pageNumber
                    ),
                    totalCount: activeOnly
                      ? filterdValue.filter((a: any) => a.isActive).length
                      : filterdValue.length,
                  });
                  await hz.shutdown();
                }
              }
            );
          }
        } else {
          res.status(400).json({ success: false, Error: 'data Hz not exist' });
          await hz.shutdown();
        }
      } else {
        switch (modelName) {
          case 'Collections':
            const cloudinary = require('cloudinary').v2;
            cloudinary.config({
              cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
              api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
              api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
            });
            const records = await collection
              .find()
              .where('_id')
              .in(arrayOfIds)
              .exec();
            var cloudinaryArray: string[] = [];
            records.map((a) => {
              cloudinaryArray.push(
                `collections/${a.title_en}img_light`,
                `collections/${a.title_en}img_dark`
              );
            });
            cloudinary.api.delete_resources(
              cloudinaryArray,
              async (error: Error, resp: object) => {
                if (error !== undefined) {
                  res
                    .status(404)
                    .json({ success: false, Error: (error as Error).message });
                } else {
                  collection.deleteMany(
                    {
                      _id: { $in: arrayOfIds },
                    },
                    async (err: Error, respose: any) => {
                      if (err) {
                        console.log(err);
                        res.status(400).json({
                          success: false,
                          Error: (err as Error).message,
                        });
                      } else {
                        var result: Results =
                          await findAllCollectionsWithPagginate(
                            collection as Model<ICollection>,
                            perPage,
                            pageNumber,
                            sortByField,
                            sortDirection
                          );
                        res.status(200).json({ success: true, ...result });
                      }
                    }
                  );
                }
              }
            );
            break;

          default:
            collection.deleteMany(
              {
                _id: { $in: arrayOfIds },
              },
              async (err: Error, respose: any) => {
                if (err) {
                  console.log(err);
                  res
                    .status(400)
                    .json({ success: false, Error: (err as Error).message });
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
                    case 'Agencies':
                      var result: Results = await findAllAgenciesWithPagginate(
                        collection as Model<IAgent>,
                        perPage,
                        pageNumber,
                        sortByField,
                        sortDirection,
                        activeOnly
                      );
                      res.status(200).json({ success: true, ...result });
                      break;
                    default:
                      res
                        .status(200)
                        .json({ success: true, data: [], totalCount: 0 });
                      break;
                  }
                }
              }
            );
            break;
        }
      }
      // res.status(200).json({ success: true, data: [] });
    } catch (error) {
      const hz = req.hazelCast;
      res.status(401).json({ success: false, Error: (error as Error).message });
      if (hz) {
        await hz.shutdown();
      }
    }
  }
);
export default apiRoute;
