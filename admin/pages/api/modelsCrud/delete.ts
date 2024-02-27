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
import Collections, { ICollection } from 'homeModels/Collections';
import Colors, { IColors } from 'homeModels/Colors';
const fs = require('fs-extra');
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
  findAllColorsWithPagginate,
  findAllProductsWithPagginate,
} from '@/helpers/dbFinds';

import type { MultiMap } from 'hazelcast-client/lib/proxy/MultiMap';
import { IProducts } from 'homeModels/Products';

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

apiRoute.post(
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
            const records = await collection
              .find()
              .where('_id')
              .in(arrayOfIds)
              .exec();
            for (const record of records) {
              if (record.products_id.length > 0) {
                res.status(400).json({
                  success: false,
                  Error: `collection ${record.label_en} has products`,
                });
                return;
              } else {
                let delFolder = `${process.cwd()}/public/collections/${
                  record.name_en
                }`;
                fs.rmSync(delFolder, { recursive: true, force: true });
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
            break;

          case 'Colors':
            const results = await collection
              .find()
              .where('_id')
              .in(arrayOfIds)
              .exec();
            for (const result of results) {
              if (result.products_id.length > 0) {
                res.status(400).json({
                  success: false,
                  Error: `color ${result.label_en} has products`,
                });
                return;
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
                      var result: Results = await findAllColorsWithPagginate(
                        collection as Model<IColors>,
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
            break;
          case 'Products':
            const products = await collection
              .find()
              .where('_id')
              .in(arrayOfIds)
              .exec();
            for (const product of products as any) {
              let finalFolder = `${process.cwd()}/public/products/${
                product.product_name_en
              }`;
              fs.remove(finalFolder, async (er: Error, resu: any) => {
                if (er !== null) {
                  res.status(400).json({
                    success: false,
                    Error: (er as Error).message,
                  });
                }
              });

              await Colors.updateMany(
                { _id: { $in: product.colors_id } },
                { $pull: { products_id: product._id } },
                { multi: true }
              );
              await Collections.updateOne(
                {
                  _id: {
                    $in: product.collection_id,
                  },
                },
                { $pull: { products_id: product._id } },
                { multi: true }
              );
            }
            collection.deleteMany(
              {
                _id: { $in: arrayOfIds },
              },
              async (err: Error, respose: any) => {
                if (err) {
                  res.status(400).json({
                    success: false,
                    Error: (err as Error).message,
                  });
                } else {
                  var result: Results = await findAllProductsWithPagginate(
                    collection as Model<IProducts>,
                    perPage,
                    pageNumber,
                    sortByField,
                    sortDirection
                  );
                  res.status(200).json({ success: true, ...result });
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
                    case 'Colors':
                      var result: Results = await findAllColorsWithPagginate(
                        collection as Model<IColors>,
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
      res.status(500).json({ success: false, Error: (error as Error).message });
      if (hz) {
        await hz.shutdown();
      }
    }
  }
);
export default apiRoute;
