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
import Collections, { ICollection } from 'homeModels/Collections';
import Colors, { IColors } from 'homeModels/Colors';
import Products, { IProducts } from 'homeModels/Products';
import Photos, { IPhoto } from '@/models/Photos';
import Features, { IFeature } from '@/models/Features';
import Countries, { ICountry } from '@/models/Countries';
import Provinces, { IProvince } from '@/models/Provinces';
import Cities, { ICity } from '@/models/Cities';
import Currencies, { ICurrency } from '@/models/Currencies';
import Agencies, { IAgent } from '@/models/Agencies';
import {
  findAllUsersWithPagginate,
  findAllRolesWithPagginate,
  findAllVideosWithPagginate,
  findAllCollectionsWithPagginate,
  findAllColorsWithPagginate,
  findAllProductsWithPagginate,
  findAllPhotosWithPagginate,
  findAllUsers,
  findAllRoles,
  findAllVideos,
  findAllCollections,
  findAllPhotos,
  paginate,
  MultiMapKey,
  MultiMapValue,
  findAllFeaturesWithPagginate,
  findAllFeatures,
  findAllCountriesWithPagginate,
  findAllCountries,
  findAllProvincesWithPagginate,
  findAllProvinces,
  findAllCitiesWithPagginate,
  findAllCities,
  sort_by,
  findAllCurrenciesWithPagginate,
  findAllCurrencies,
  findAllAgenciesWithPagginate,
  findAllAgencies,
} from '@/helpers/dbFinds';
import type { MultiMap } from 'hazelcast-client/lib/proxy/MultiMap';
import {
  addFeaturesFaker,
  addPhotosFaker,
  addRolesFaker,
  addUsersFaker,
  addVideosFaker,
  updateCountryStates,
  updateProvince,
  updateCities,
  updateCountryCities,
  updateProvincesCities,
  addAgenciesFaker,
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
  async (req: HazelcastType, res: NextApiResponse<Data>, next: () => void) => {
    // addUsersFaker(2000);
    // addRolesFaker(2000);
    // addVideosFaker(2000);
    // addPhotosFaker(2000);
    // addFeaturesFaker(2000);
    // addAgenciesFaker(2000);
    // updateProvince();
    // updateCountryStates();
    // updateCities();
    // updateCountryCities();
    // updateProvincesCities();
    // await Roles.deleteMany({ _id: { $nin: ['6350dd3a28c3c4a13a1c7248'] } });
    try {
      const {
        modelName,
        perPage,
        pageNumber,
        sortByField,
        sortDirection,
        activeOnly,
      } = req.body;
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
              data: paginate(
                sort_by(
                  activeOnly ? value.filter((a: any) => a.isActive) : value,
                  sortByField,
                  sortDirection
                ),
                perPage,
                pageNumber
              ),
              totalCount: activeOnly
                ? value.filter((a: any) => a.isActive).length
                : value.length,
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
            case 'Countries':
              var result: Results = await findAllCountries(
                modelName,
                sortByField,
                perPage,
                pageNumber,
                sortDirection,
                multiMap as MultiMap<MultiMapKey, MultiMapValue>,
                activeOnly
              );
              res.status(200).json({ success: true, ...result });
              break;
            case 'Provinces':
              var result: Results = await findAllProvinces(
                modelName,
                sortByField,
                perPage,
                pageNumber,
                sortDirection,
                multiMap as MultiMap<MultiMapKey, MultiMapValue>
              );
              res.status(200).json({ success: true, ...result });
              break;
            case 'Cities':
              var result: Results = await findAllCities(
                modelName,
                sortByField,
                perPage,
                pageNumber,
                sortDirection,
                multiMap as MultiMap<MultiMapKey, MultiMapValue>
              );
              res.status(200).json({ success: true, ...result });
              break;
            case 'Currencies':
              var result: Results = await findAllCurrencies(
                modelName,
                sortByField,
                perPage,
                pageNumber,
                sortDirection,
                multiMap as MultiMap<MultiMapKey, MultiMapValue>
              );
              res.status(200).json({ success: true, ...result });
              break;
            case 'Agencies':
              var result: Results = await findAllAgencies(
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
              res.status(200).json({ success: true, data: [], totalCount: 0 });
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
          case 'Collections':
            var result: Results = await findAllCollectionsWithPagginate(
              collection as Model<ICollection>,
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
          case 'Products':
            var result: Results = await findAllProductsWithPagginate(
              collection as Model<IProducts>,
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
          case 'Countries':
            var result: Results = await findAllCountriesWithPagginate(
              collection as Model<ICountry>,
              perPage,
              pageNumber,
              sortByField,
              sortDirection,
              activeOnly
            );
            res.status(200).json({ success: true, ...result });
            break;
          case 'Provinces':
            var result: Results = await findAllProvincesWithPagginate(
              collection as Model<IProvince>,
              perPage,
              pageNumber,
              sortByField,
              sortDirection,
              activeOnly
            );
            res.status(200).json({ success: true, ...result });
            break;
          case 'Cities':
            var result: Results = await findAllCitiesWithPagginate(
              collection as Model<ICity>,
              perPage,
              pageNumber,
              sortByField,
              sortDirection,
              activeOnly
            );
            res.status(200).json({ success: true, ...result });
            break;
          case 'Currencies':
            var result: Results = await findAllCurrenciesWithPagginate(
              collection as Model<ICurrency>,
              perPage,
              pageNumber,
              sortByField,
              sortDirection,
              activeOnly
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
            res.status(200).json({ success: true, data: [], totalCount: 0 });
            break;
        }
      }
    } catch (error) {
      const hz = req.hazelCast;
      console.log(error);
      res.status(401).json({ success: false, error: (error as Error).message });
      if (hz) {
        await hz.shutdown();
      }
    }
  }
);

export default apiRoute;
