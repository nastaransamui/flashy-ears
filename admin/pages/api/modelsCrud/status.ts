import nextConnect from 'next-connect';
import { NextApiResponse } from 'next';
import { HazelcastType } from '@/interfaces/next.interface';
import { verifyToken } from 'middleware/verifyToken';
import { dbCheck } from 'middleware/dbCheck';
import hazelCast from 'middleware/hazelCast';
import mongoose, { Model } from 'mongoose';
import Countries, { ICountry } from '@/models/Countries';
import Provinces, { IProvince } from '@/models/Provinces';
import Cities, { ICity } from '@/models/Cities';
import Currencies, { ICurrency } from '@/models/Currencies';
import {
  paginate,
  MultiMapKey,
  MultiMapValue,
  findAllCountriesWithPagginate,
  findAllCountries,
  findAllProvincesWithPagginate,
  findAllProvinces,
  findAllCitiesWithPagginate,
  findAllCities,
  sort_by,
  findAllCurrenciesWithPagginate,
  findAllCurrencies,
} from '@/helpers/dbFinds';
import type { MultiMap } from 'hazelcast-client/lib/proxy/MultiMap';
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
        status,
      } = req.body;
      var collection = mongoose.model(modelName);
      const hz = req.hazelCast;
      if (hz) {
        const multiMap: MultiMap<MultiMapKey, MultiMapValue> =
          await hz.getMultiMap(modelName);
        //Check if current model name has data in HZ
        const dataIsExist = await multiMap.containsKey(
          `all${modelName}` as keyof typeof multiMap.containsEntry
        );
        //Check if province model name has data in HZ
        const provinceMultiMap: MultiMap<MultiMapKey, MultiMapValue> =
          await hz.getMultiMap('Provinces');
        const provinceDataIsExist = await provinceMultiMap.containsKey(
          `allProvinces` as keyof typeof provinceMultiMap.containsEntry
        );
        //Check if cities model name has data in HZ
        const citiesMultiMap: MultiMap<MultiMapKey, MultiMapValue> =
          await hz.getMultiMap('Cities');
        const citiesDataIsExist = await citiesMultiMap.containsKey(
          `allCities` as keyof typeof citiesMultiMap.containsEntry
        );
        if (dataIsExist) {
          //Get all values for current model
          const values = await multiMap.get(
            `all${modelName}` as keyof typeof multiMap.get
          );
          for (const value of values as any) {
            //Update current model name status
            collection.updateMany(
              {
                _id: { $in: arrayOfIds },
              },
              {
                $set: { isActive: status == 'diactivate' ? false : true },
              },
              async (err: Error, response: any) => {
                if (err) {
                  res
                    .status(400)
                    .json({ success: false, Error: (err as Error).message });
                  await hz.shutdown();
                } else {
                  switch (modelName) {
                    case 'Countries':
                      //find out the cities and States ids from changed values
                      const countriesStates_ids: string[] = [];
                      const countriesCities_ids: string[] = [];
                      //Update coutnries status
                      value.map((a: any) => {
                        if (arrayOfIds.includes(a._id)) {
                          a.isActive = status == 'diactivate' ? false : true;
                          countriesStates_ids.push(a.states_id);
                          countriesCities_ids.push(a.cities_id);
                        }
                      });
                      await multiMap.clear();
                      await multiMap.put(
                        `all${modelName}` as keyof typeof multiMap.put,
                        value
                      );
                      //Update provinces data in data base
                      await Provinces.updateMany(
                        {
                          _id: { $in: countriesStates_ids.flat(1) },
                        },
                        {
                          $set: {
                            isActive: status == 'diactivate' ? false : true,
                          },
                        }
                      );
                      //Update cities data in data base
                      await Cities.updateMany(
                        {
                          _id: { $in: countriesCities_ids.flat(1).flat(1) },
                        },
                        {
                          $set: {
                            isActive: status == 'diactivate' ? false : true,
                          },
                        }
                      );
                      //If province data exist in Hz map and update HZ
                      if (provinceDataIsExist) {
                        await provinceMultiMap.clear();
                      }
                      await findAllProvinces(
                        'Provinces',
                        'name',
                        perPage,
                        pageNumber,
                        sortDirection,
                        provinceMultiMap as MultiMap<MultiMapKey, MultiMapValue>
                      );
                      //If cities data exist in Hz map and update HZ
                      if (citiesDataIsExist) {
                        await citiesMultiMap.clear();
                      }
                      await findAllCities(
                        'Cities',
                        'name',
                        perPage,
                        pageNumber,
                        sortDirection,
                        citiesMultiMap as MultiMap<MultiMapKey, MultiMapValue>
                      );
                      res.status(200).json({
                        success: true,
                        data: paginate(
                          sort_by(
                            activeOnly
                              ? value.filter((a: any) => a.isActive)
                              : value,
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
                      await hz.shutdown();
                      break;
                    case 'Provinces':
                      const provincesCities_ids: string[] = [];
                      value.map((a: any) => {
                        if (arrayOfIds.includes(a._id)) {
                          a.isActive = status == 'diactivate' ? false : true;
                          provincesCities_ids.push(a.cities_id);
                        }
                      });
                      await multiMap.clear();
                      await multiMap.put(
                        `all${modelName}` as keyof typeof multiMap.put,
                        value
                      );
                      //Update cities data in data base
                      await Cities.updateMany(
                        {
                          _id: { $in: provincesCities_ids.flat(1).flat(1) },
                        },
                        {
                          $set: {
                            isActive: status == 'diactivate' ? false : true,
                          },
                        }
                      );
                      //If cities data exist in Hz map and update HZ
                      if (citiesDataIsExist) {
                        await citiesMultiMap.clear();
                      }
                      await findAllCities(
                        'Cities',
                        'name',
                        perPage,
                        pageNumber,
                        sortDirection,
                        citiesMultiMap as MultiMap<MultiMapKey, MultiMapValue>
                      );
                      res.status(200).json({
                        success: true,
                        data: paginate(
                          sort_by(
                            activeOnly
                              ? value.filter((a: any) => a.isActive)
                              : value,
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
                      await hz.shutdown();
                      break;
                    case 'Cities':
                      value.map((a: any) => {
                        if (arrayOfIds.includes(a._id)) {
                          a.isActive = status == 'diactivate' ? false : true;
                        }
                      });
                      await multiMap.clear();
                      await multiMap.put(
                        `all${modelName}` as keyof typeof multiMap.put,
                        value
                      );
                      res.status(200).json({
                        success: true,
                        data: paginate(
                          sort_by(
                            activeOnly
                              ? value.filter((a: any) => a.isActive)
                              : value,
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
                      await hz.shutdown();
                      break;

                    case 'Currencies':
                      value.map((a: any) => {
                        if (arrayOfIds.includes(a._id)) {
                          a.isActive = status == 'diactivate' ? false : true;
                        }
                      });
                      await multiMap.clear();
                      await multiMap.put(
                        `all${modelName}` as keyof typeof multiMap.put,
                        value
                      );
                      res.status(200).json({
                        success: true,
                        data: paginate(
                          sort_by(
                            activeOnly
                              ? value.filter((a: any) => a.isActive)
                              : value,
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
                      await hz.shutdown();
                      break;

                    default:
                      res.status(500).json({
                        success: false,
                        Error: 'Update Status HZ part',
                      });
                      await hz.shutdown();
                      break;
                  }
                }
              }
            );
          }
        } else {
          res.status(400).json({ success: false, Error: 'data Hz not exist' });
        }
      } else {
        collection.updateMany(
          {
            _id: { $in: arrayOfIds },
          },
          { $set: { isActive: status == 'diactivate' ? false : true } },
          async (err: Error, respose: any) => {
            if (err) {
              console.log(err);
              res
                .status(400)
                .json({ success: false, Error: (err as Error).message });
            } else {
              switch (modelName) {
                case 'Countries':
                  let objIds = arrayOfIds.map(function (el: string) {
                    return new mongoose.Types.ObjectId(el);
                  });
                  const countriesIds = await Countries.aggregate([
                    { $match: { _id: { $in: objIds } } },
                  ]);
                  const countriesStates_ids = countriesIds.map(
                    (a) => a.states_id
                  );
                  const countriesCities_ids = countriesIds.map(
                    (a) => a.cities_id
                  );
                  await Provinces.updateMany(
                    {
                      _id: { $in: countriesStates_ids.flat(1) },
                    },
                    {
                      $set: { isActive: status == 'diactivate' ? false : true },
                    }
                  );
                  await Cities.updateMany(
                    {
                      _id: { $in: countriesCities_ids.flat(1).flat(1) },
                    },
                    {
                      $set: { isActive: status == 'diactivate' ? false : true },
                    }
                  );
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
                  let provinceObjIds = arrayOfIds.map(function (el: string) {
                    return new mongoose.Types.ObjectId(el);
                  });
                  const provincesId = await Provinces.aggregate([
                    { $match: { _id: { $in: provinceObjIds } } },
                  ]);
                  const ProvinceCities_ids = provincesId.map(
                    (a) => a.cities_id
                  );
                  await Cities.updateMany(
                    {
                      _id: { $in: ProvinceCities_ids.flat(1).flat(1) },
                    },
                    {
                      $set: { isActive: status == 'diactivate' ? false : true },
                    }
                  );
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

                default:
                  res
                    .status(200)
                    .json({ success: true, data: [], totalCount: 0 });
                  break;
              }
            }
          }
        );
      }
    } catch (error) {
      const hz = req.hazelCast;
      console.log((error as Error).message);
      res.status(401).json({ success: false, Error: (error as Error).message });
      if (hz) {
        await hz.shutdown();
      }
    }
  }
);

export default apiRoute;
