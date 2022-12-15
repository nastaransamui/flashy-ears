import mongoose, { Model } from 'mongoose';
import Users, {
  IUser,
  dispalyFields as usersDisplayField,
  muiDataObj as usersMuiDataObj,
} from '@/models/Users';
import Roles, {
  IRole,
  dispalyFields as rolesDisplayField,
  muiDataObj as rolesMuiDataObj,
} from '@/models/Roles';
import Videos, {
  IVideo,
  dispalyFields as videosDisplayField,
  muiDataObj as videosMuiDataObj,
} from '@/models/Videos';
import Photos, {
  IPhoto,
  dispalyFields as photosDisplayField,
  muiDataObj as photosMuiDataObj,
} from '@/models/Photos';
import Features, {
  IFeature,
  dispalyFields as featuresDisplayField,
  muiDataObj as featuresMuiDataObj,
} from '@/models/Features';
import Countries, {
  ICountry,
  dispalyFields as countriesDisplayField,
  muiDataObj as countriesMuiDataObj,
} from '@/models/Countries';
import Provinces, {
  IProvince,
  dispalyFields as provincesDisplayField,
  muiDataObj as provincesMuiDataObj,
} from '@/models/Provinces';
import Cities, {
  ICity,
  dispalyFields as citiesDisplayField,
  muiDataObj as citiesMuiDataObj,
} from '@/models/Cities';
import Currencies, {
  ICurrency,
  dispalyFields as currenciesDisplayField,
  muiDataObj as currenciesMuiDataObj,
} from '@/models/Currencies';
import Agencies, {
  IAgent,
  dispalyFields as agenciesDisplayField,
  muiDataObj as agenciesMuiDataObj,
} from '@/models/Agencies';

import { firstBy } from 'thenby';
import type { MultiMap } from 'hazelcast-client/lib/proxy/MultiMap';

export function paginate(array: object[], perPage: number, pageNumber: number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((pageNumber - 1) * perPage, pageNumber * perPage);
}

export function sort_by(
  array: object[],
  sortByField: any,
  sortDirection: 1 | -1
) {
  if (sortByField !== 'isActive') {
    array = array.sort(
      firstBy('isActive', 'desc').thenBy(sortByField, {
        ignoreCase: true,
        direction: sortDirection,
      })
    );
  } else {
    array = array.sort(
      firstBy(sortByField, { ignoreCase: true, direction: sortDirection })
    );
  }
  return array;
}

export async function findUserByUsername(username: string) {
  let user = await Users.findOne({ userName: username });
  return user;
}

export async function findUserById(_id: string) {
  let user = await Users.findById(_id, '-password');
  return user;
}

export async function findRoleById(_id: string) {
  let role = await Roles.findById(_id);
  return role;
}
export async function findVideoById(_id: string) {
  let video = await Videos.findById(_id);
  return video;
}

export async function findPhotoById(_id: string) {
  let photo = await Photos.findById(_id);
  return photo;
}

export async function findFeatureById(_id: string) {
  let feature = await Features.findById(_id);
  return feature;
}

export async function findCountryById(_id: string) {
  let country = await Countries.findById(_id);
  return country;
}

export async function findProvinceById(_id: string) {
  let province = await Provinces.findById(_id);
  return province;
}

export async function findCityById(_id: string) {
  let city = await Cities.findById(_id);
  return city;
}

export async function findCurrencyById(_id: string) {
  let currency = await Currencies.findById(_id);
  return currency;
}
export async function findAgentById(_id: string) {
  let agent = await Agencies.findById(_id);
  return agent;
}

export async function findAllUsersWithPagginate(
  collection: Model<IUser>,
  perPage: number,
  pageNumber: number,
  sortByField: string,
  sortDirection: 1 | -1
) {
  const dataValue = await collection.aggregate([
    { $project: { password: 0, accessToken: 0 } },
    {
      $sort: { [sortByField]: sortDirection },
    },
    {
      $lookup: {
        from: 'roles',
        localField: 'role_id',
        foreignField: '_id',
        as: 'roleData',
      },
    },
    {
      $set: {
        roleName: '$roleData.roleName',
      },
    },
    {
      $unwind: {
        path: '$roleName',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unset: ['roleData', '__v'],
    },
    {
      $addFields: {
        dispalyFields: usersDisplayField,
        muiData: usersMuiDataObj,
      },
    },
    {
      $facet: {
        paginatedResults: [
          { $skip: perPage * (pageNumber - 1) },
          { $limit: perPage },
        ],
        totalCount: [
          {
            $count: 'count',
          },
        ],
      },
    },
  ]);

  const result = {
    data: dataValue[0].paginatedResults,
    totalCount:
      dataValue[0].totalCount[0] == undefined
        ? 0
        : dataValue[0].totalCount[0].count,
  };
  return result;
}

export async function findAllRolesWithPagginate(
  collection: Model<IRole>,
  perPage: number,
  pageNumber: number,
  sortByField: string,
  sortDirection: 1 | -1
) {
  const dataValue = await collection.aggregate([
    {
      $sort: { [sortByField]: sortDirection },
    },
    {
      $addFields: {
        dispalyFields: rolesDisplayField,
        muiData: rolesMuiDataObj,
      },
    },
    {
      $facet: {
        paginatedResults: [
          { $skip: perPage * (pageNumber - 1) },
          { $limit: perPage },
        ],
        totalCount: [
          {
            $count: 'count',
          },
        ],
      },
    },
  ]);
  const result = {
    data: dataValue[0].paginatedResults,
    totalCount:
      dataValue[0].totalCount[0] == undefined
        ? 0
        : dataValue[0].totalCount[0].count,
  };
  return result;
}

export async function findAllVideosWithPagginate(
  collection: Model<IVideo>,
  perPage: number,
  pageNumber: number,
  sortByField: string,
  sortDirection: 1 | -1
) {
  const dataValue = await collection.aggregate([
    {
      $sort: { [sortByField]: sortDirection },
    },
    {
      $addFields: {
        dispalyFields: videosDisplayField,
        muiData: videosMuiDataObj,
      },
    },
    {
      $facet: {
        paginatedResults: [
          { $skip: perPage * (pageNumber - 1) },
          { $limit: perPage },
        ],
        totalCount: [
          {
            $count: 'count',
          },
        ],
      },
    },
  ]);

  const result = {
    data: dataValue[0].paginatedResults,
    totalCount:
      dataValue[0].totalCount[0] == undefined
        ? 0
        : dataValue[0].totalCount[0].count,
  };
  return result;
}

export async function findAllPhotosWithPagginate(
  collection: Model<IPhoto>,
  perPage: number,
  pageNumber: number,
  sortByField: string,
  sortDirection: 1 | -1
) {
  const dataValue = await collection.aggregate([
    {
      $sort: { [sortByField]: sortDirection },
    },
    {
      $addFields: {
        dispalyFields: photosDisplayField,
        muiData: photosMuiDataObj,
      },
    },
    {
      $facet: {
        paginatedResults: [
          { $skip: perPage * (pageNumber - 1) },
          { $limit: perPage },
        ],
        totalCount: [
          {
            $count: 'count',
          },
        ],
      },
    },
  ]);
  const result = {
    data: dataValue[0].paginatedResults,
    totalCount:
      dataValue[0].totalCount[0] == undefined
        ? 0
        : dataValue[0].totalCount[0].count,
  };
  return result;
}

export async function findAllFeaturesWithPagginate(
  collection: Model<IFeature>,
  perPage: number,
  pageNumber: number,
  sortByField: string,
  sortDirection: 1 | -1
) {
  const dataValue = await collection.aggregate([
    {
      $sort: { [sortByField]: sortDirection },
    },
    {
      $addFields: {
        dispalyFields: featuresDisplayField,
        muiData: featuresMuiDataObj,
      },
    },
    {
      $facet: {
        paginatedResults: [
          { $skip: perPage * (pageNumber - 1) },
          { $limit: perPage },
        ],
        totalCount: [
          {
            $count: 'count',
          },
        ],
      },
    },
  ]);
  const result = {
    data: dataValue[0].paginatedResults,
    totalCount:
      dataValue[0].totalCount[0] == undefined
        ? 0
        : dataValue[0].totalCount[0].count,
  };
  return result;
}

export async function findAllCountriesWithPagginate(
  collection: Model<ICountry>,
  perPage: number,
  pageNumber: number,
  sortByField: string,
  sortDirection: 1 | -1,
  activeOnly: boolean
) {
  var match = activeOnly ? { isActive: true } : {};

  const dataValue = await collection.aggregate([
    { $match: match },
    {
      $sort: { isActive: -1, [sortByField]: sortDirection },
    },
    {
      $addFields: {
        dispalyFields: countriesDisplayField,
        muiData: countriesMuiDataObj,
        totalStates: { $size: '$states_id' },
        totalCities: { $size: '$cities_id' },
        totalActiveHotels: { $size: '$hotels_id' },
        totalUsers: { $size: '$users_id' },
        totalAgents: { $size: '$agents_id' },
        totalSuppliers: { $size: '$suppliers_id' },
      },
    },
    {
      $facet: {
        paginatedResults: [
          { $skip: perPage * (pageNumber - 1) },
          { $limit: perPage },
        ],
        totalCount: [
          {
            $count: 'count',
          },
        ],
      },
    },
  ]);
  const result = {
    data: dataValue[0].paginatedResults,
    totalCount:
      dataValue[0].totalCount[0] == undefined
        ? 0
        : dataValue[0].totalCount[0].count,
  };
  return result;
}

export async function findAllProvincesWithPagginate(
  collection: Model<IProvince>,
  perPage: number,
  pageNumber: number,
  sortByField: string,
  sortDirection: 1 | -1,
  activeOnly: boolean
) {
  var match = activeOnly ? { isActive: true } : {};

  const dataValue = await collection.aggregate([
    { $match: match },
    {
      $sort: { isActive: -1, [sortByField]: sortDirection },
    },
    {
      $lookup: {
        from: 'countries',
        localField: 'country_id',
        foreignField: 'id',
        as: 'countryData',
      },
    },
    {
      $set: {
        country_name: '$countryData.name',
      },
    },
    {
      $unwind: {
        path: '$country_name',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unset: ['countryData', '__v'],
    },
    {
      $addFields: {
        dispalyFields: provincesDisplayField,
        muiData: provincesMuiDataObj,
        totalCities: { $size: '$cities_id' },
        totalActiveHotels: { $size: '$hotels_id' },
        totalUsers: { $size: '$users_id' },
        totalAgents: { $size: '$agents_id' },
        totalSuppliers: { $size: '$suppliers_id' },
      },
    },
    {
      $facet: {
        paginatedResults: [
          { $skip: perPage * (pageNumber - 1) },
          { $limit: perPage },
        ],
        totalCount: [
          {
            $count: 'count',
          },
        ],
      },
    },
  ]);
  const result = {
    data: dataValue[0].paginatedResults,
    totalCount:
      dataValue[0].totalCount[0] == undefined
        ? 0
        : dataValue[0].totalCount[0].count,
  };
  return result;
}

export async function findAllCitiesWithPagginate(
  collection: Model<ICity>,
  perPage: number,
  pageNumber: number,
  sortByField: string,
  sortDirection: 1 | -1,
  activeOnly: boolean
) {
  var match = activeOnly ? { isActive: true } : {};

  const dataValue = await collection.aggregate(
    [
      { $match: match },
      {
        $sort: { [sortByField]: sortDirection },
      },
      // {
      //   $lookup: {
      //     from: 'countries',
      //     localField: 'country_id',
      //     foreignField: 'id',
      //     as: 'countryData',
      //   },
      // },
      // {
      //   $lookup: {
      //     from: 'provinces',
      //     localField: 'state_id',
      //     foreignField: 'id',
      //     as: 'provinceData',
      //   },
      // },
      // {
      //   $set: {
      //     country_name: '$countryData.name',
      //     state_name: '$provinceData.name',
      //   },
      // },
      // {
      //   $unwind: {
      //     path: '$country_name',
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },
      // {
      //   $unwind: {
      //     path: '$state_name',
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },
      // {
      //   $unset: ['countryData', 'provinceData', '__v'],
      // },
      {
        $addFields: {
          dispalyFields: citiesDisplayField,
          muiData: citiesMuiDataObj,
          totalActiveHotels: { $size: '$hotels_id' },
          totalUsers: { $size: '$users_id' },
          totalAgents: { $size: '$agents_id' },
          totalSuppliers: { $size: '$suppliers_id' },
        },
      },
      {
        $facet: {
          paginatedResults: [
            { $skip: perPage * (pageNumber - 1) },
            { $limit: perPage },
          ],
          totalCount: [
            {
              $count: 'count',
            },
          ],
        },
      },
    ],
    { allowDiskUse: true }
  );
  const result = {
    data: dataValue[0].paginatedResults,
    totalCount:
      dataValue[0].totalCount[0] == undefined
        ? 0
        : dataValue[0].totalCount[0].count,
  };
  return result;
}

export async function findAllCurrenciesWithPagginate(
  collection: Model<ICurrency>,
  perPage: number,
  pageNumber: number,
  sortByField: string,
  sortDirection: 1 | -1,
  activeOnly: boolean
) {
  var match = activeOnly ? { isActive: true } : {};

  const dataValue = await collection.aggregate([
    { $match: match },
    {
      $sort: { isActive: -1, [sortByField]: sortDirection },
    },
    {
      $lookup: {
        from: 'countries',
        localField: 'id',
        foreignField: 'id',
        as: 'nameData',
      },
    },
    {
      $addFields: {
        dispalyFields: currenciesDisplayField,
        muiData: currenciesMuiDataObj,
        totalAgents: { $size: '$agents_id' },
        totalSuppliers: { $size: '$suppliers_id' },
      },
    },
    {
      $set: {
        name: '$nameData.name',
      },
    },
    {
      $unset: 'nameData',
    },
    {
      $unwind: {
        path: '$name',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $facet: {
        paginatedResults: [
          { $skip: perPage * (pageNumber - 1) },
          { $limit: perPage },
        ],
        totalCount: [
          {
            $count: 'count',
          },
        ],
      },
    },
  ]);

  const result = {
    data: dataValue[0].paginatedResults,
    totalCount:
      dataValue[0].totalCount[0] == undefined
        ? 0
        : dataValue[0].totalCount[0].count,
  };
  return result;
}

export async function findAllAgenciesWithPagginate(
  collection: Model<IAgent>,
  perPage: number,
  pageNumber: number,
  sortByField: string,
  sortDirection: 1 | -1,
  activeOnly: boolean
) {
  const dataValue = await collection.aggregate([
    {
      $sort: { [sortByField]: sortDirection },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'accountManager_id',
        foreignField: '_id',
        as: 'accountManagerData',
      },
    },
    {
      $set: {
        accountManager: '$accountManagerData.userName',
      },
    },
    {
      $unwind: {
        path: '$accountManager',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'countries',
        localField: 'country_id',
        foreignField: '_id',
        as: 'countryData',
      },
    },
    {
      $set: {
        countryName: '$countryData.name',
      },
    },
    {
      $unwind: {
        path: '$countryName',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'provinces',
        localField: 'province_id',
        foreignField: '_id',
        as: 'provinceData',
      },
    },
    {
      $set: {
        provinceName: '$provinceData.name',
      },
    },
    {
      $unwind: {
        path: '$provinceName',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unset: ['accountManagerData', 'countryData', 'provinceData', '__v'],
    },
    {
      $addFields: {
        dispalyFields: agenciesDisplayField,
        muiData: agenciesMuiDataObj,
      },
    },
    {
      $facet: {
        paginatedResults: [
          { $skip: perPage * (pageNumber - 1) },
          { $limit: perPage },
        ],
        totalCount: [
          {
            $count: 'count',
          },
        ],
      },
    },
  ]);

  const result = {
    data: dataValue[0].paginatedResults,
    totalCount:
      dataValue[0].totalCount[0] == undefined
        ? 0
        : dataValue[0].totalCount[0].count,
  };

  return result;
}

export interface MultiMapKey {
  key: string;
}
export interface MultiMapValue {
  value: object[];
}

export async function findAllUsers(
  modelName: string,
  sortByField: string,
  perPage: number,
  pageNumber: number,
  sortDirection: 1 | -1,
  multiMap: MultiMap<MultiMapKey, MultiMapValue>
) {
  var collection = mongoose.model(modelName);
  const dataValue = await collection.aggregate([
    { $project: { password: 0, accessToken: 0 } },
    {
      $sort: { [sortByField]: sortDirection },
    },
    {
      $lookup: {
        from: 'roles',
        localField: 'role_id',
        foreignField: '_id',
        as: 'roleData',
      },
    },
    {
      $addFields: {
        dispalyFields: usersDisplayField,
        muiData: usersMuiDataObj,
      },
    },
    {
      $set: {
        roleName: '$roleData.roleName',
      },
    },
    {
      $unwind: {
        path: '$roleName',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unset: 'roleData',
    },
  ]);
  const result = {
    data: paginate(dataValue, perPage, pageNumber),
    totalCount: dataValue.length,
  };
  await multiMap.put(
    `all${modelName}` as unknown as MultiMapKey,
    dataValue as unknown as MultiMapValue
  );
  return result;
}
export async function findAllRoles(
  modelName: string,
  sortByField: string,
  perPage: number,
  pageNumber: number,
  sortDirection: 1 | -1,
  multiMap: MultiMap<MultiMapKey, MultiMapValue>
) {
  var collection = mongoose.model(modelName);

  const dataValue = await collection.aggregate([
    {
      $sort: { [sortByField]: sortDirection },
    },
    {
      $addFields: {
        dispalyFields: rolesDisplayField,
        muiData: rolesMuiDataObj,
      },
    },
  ]);
  const result = {
    data: paginate(dataValue, perPage, pageNumber),
    totalCount: dataValue.length,
  };
  await multiMap.put(
    `all${modelName}` as unknown as MultiMapKey,
    dataValue as unknown as MultiMapValue
  );
  return result;
}

export async function findAllVideos(
  modelName: string,
  sortByField: string,
  perPage: number,
  pageNumber: number,
  sortDirection: 1 | -1,
  multiMap: MultiMap<MultiMapKey, MultiMapValue>
) {
  var collection = mongoose.model(modelName);

  const dataValue = await collection.aggregate([
    {
      $sort: { [sortByField]: sortDirection },
    },
    {
      $addFields: {
        dispalyFields: videosDisplayField,
        muiData: videosMuiDataObj,
      },
    },
  ]);
  const result = {
    data: paginate(dataValue, perPage, pageNumber),
    totalCount: dataValue.length,
  };
  await multiMap.put(
    `all${modelName}` as unknown as MultiMapKey,
    dataValue as unknown as MultiMapValue
  );
  return result;
}

export async function findAllPhotos(
  modelName: string,
  sortByField: string,
  perPage: number,
  pageNumber: number,
  sortDirection: 1 | -1,
  multiMap: MultiMap<MultiMapKey, MultiMapValue>
) {
  var collection = mongoose.model(modelName);

  const dataValue = await collection.aggregate([
    {
      $sort: { [sortByField]: sortDirection },
    },
    {
      $addFields: {
        dispalyFields: photosDisplayField,
        muiData: photosMuiDataObj,
      },
    },
  ]);
  const result = {
    data: paginate(dataValue, perPage, pageNumber),
    totalCount: dataValue.length,
  };
  await multiMap.put(
    `all${modelName}` as unknown as MultiMapKey,
    dataValue as unknown as MultiMapValue
  );
  return result;
}

export async function findAllFeatures(
  modelName: string,
  sortByField: string,
  perPage: number,
  pageNumber: number,
  sortDirection: 1 | -1,
  multiMap: MultiMap<MultiMapKey, MultiMapValue>
) {
  var collection = mongoose.model(modelName);

  const dataValue = await collection.aggregate([
    {
      $sort: { [sortByField]: sortDirection },
    },
    {
      $addFields: {
        dispalyFields: featuresDisplayField,
        muiData: featuresMuiDataObj,
      },
    },
  ]);
  const result = {
    data: paginate(dataValue, perPage, pageNumber),
    totalCount: dataValue.length,
  };
  await multiMap.put(
    `all${modelName}` as unknown as MultiMapKey,
    dataValue as unknown as MultiMapValue
  );
  return result;
}

export async function findAllCountries(
  modelName: string,
  sortByField: string,
  perPage: number,
  pageNumber: number,
  sortDirection: 1 | -1,
  multiMap: MultiMap<MultiMapKey, MultiMapValue>,
  activeOnly: boolean
) {
  var collection = mongoose.model(modelName);

  const dataValue = await collection.aggregate([
    {
      $sort: { isActive: -1, [sortByField]: sortDirection },
    },
    {
      $addFields: {
        dispalyFields: countriesDisplayField,
        muiData: countriesMuiDataObj,
        totalStates: { $size: '$states_id' },
        totalCities: { $size: '$cities_id' },
        totalActiveHotels: { $size: '$hotels_id' },
        totalUsers: { $size: '$users_id' },
        totalAgents: { $size: '$agents_id' },
        totalSuppliers: { $size: '$suppliers_id' },
      },
    },
  ]);

  const result = {
    data: paginate(
      activeOnly ? dataValue.filter((a) => a.isActive) : dataValue,
      perPage,
      pageNumber
    ),
    totalCount: dataValue.length,
  };

  await multiMap.put(
    `all${modelName}` as unknown as MultiMapKey,
    dataValue as unknown as MultiMapValue
  );
  return result;
}

export async function findAllProvinces(
  modelName: string,
  sortByField: string,
  perPage: number,
  pageNumber: number,
  sortDirection: 1 | -1,
  multiMap: MultiMap<MultiMapKey, MultiMapValue>
) {
  var collection = mongoose.model(modelName);

  const dataValue = await collection.aggregate([
    { $match: { isActive: true } },
    {
      $sort: { isActive: -1, [sortByField]: sortDirection },
    },
    {
      $addFields: {
        dispalyFields: provincesDisplayField,
        muiData: provincesMuiDataObj,
      },
    },
    {
      $lookup: {
        from: 'countries',
        localField: 'country_id',
        foreignField: 'id',
        as: 'countryData',
      },
    },
    {
      $set: {
        country_name: '$countryData.name',
      },
    },
    {
      $unwind: {
        path: '$country_name',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unset: ['countryData', '__v'],
    },
    {
      $addFields: {
        dispalyFields: provincesDisplayField,
        muiData: provincesMuiDataObj,
        totalCities: { $size: '$cities_id' },
        totalActiveHotels: { $size: '$hotels_id' },
        totalUsers: { $size: '$users_id' },
        totalAgents: { $size: '$agents_id' },
        totalSuppliers: { $size: '$suppliers_id' },
      },
    },
  ]);
  const result = {
    data: paginate(
      dataValue.filter((a) => a.isActive),
      perPage,
      pageNumber
    ),
    totalCount: dataValue.length,
  };
  await multiMap.put(
    `all${modelName}` as unknown as MultiMapKey,
    dataValue as unknown as MultiMapValue
  );
  return result;
}

export async function findAllCities(
  modelName: string,
  sortByField: string,
  perPage: number,
  pageNumber: number,
  sortDirection: 1 | -1,
  multiMap: MultiMap<MultiMapKey, MultiMapValue>
) {
  var collection = mongoose.model(modelName);

  const dataValue = await collection.aggregate(
    [
      { $match: { isActive: true } },
      {
        $sort: { [sortByField]: sortDirection },
      },
      // {
      //   $addFields: {
      //     dispalyFields: dispalyFields,
      //     muiData: muiDataObj,
      //   },
      // },
      // {
      //   $lookup: {
      //     from: 'countries',
      //     localField: 'country_id',
      //     foreignField: 'id',
      //     as: 'countryData',
      //   },
      // },
      // {
      //   $lookup: {
      //     from: 'provinces',
      //     localField: 'state_id',
      //     foreignField: 'id',
      //     as: 'provinceData',
      //   },
      // },
      // {
      //   $set: {
      //     country_name: '$countryData.name',
      //     state_name: '$provinceData.name',
      //   },
      // },
      // {
      //   $unwind: {
      //     path: '$country_name',
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },
      // {
      //   $unwind: {
      //     path: '$state_name',
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },
      // {
      //   $unset: ['countryData', 'provinceData', '__v'],
      // },
      {
        $addFields: {
          dispalyFields: citiesDisplayField,
          muiData: citiesMuiDataObj,
          totalActiveHotels: { $size: '$hotels_id' },
          totalUsers: { $size: '$users_id' },
          totalAgents: { $size: '$agents_id' },
          totalSuppliers: { $size: '$suppliers_id' },
        },
      },
    ],
    { allowDiskUse: true }
  );
  const result = {
    data: paginate(
      dataValue.filter((a) => a.isActive),
      perPage,
      pageNumber
    ),
    totalCount: dataValue.length,
  };
  await multiMap.put(
    `all${modelName}` as unknown as MultiMapKey,
    dataValue as unknown as MultiMapValue
  );
  return result;
}

export async function findAllCurrencies(
  modelName: string,
  sortByField: string,
  perPage: number,
  pageNumber: number,
  sortDirection: 1 | -1,
  multiMap: MultiMap<MultiMapKey, MultiMapValue>
) {
  var collection = mongoose.model(modelName);

  const dataValue = await collection.aggregate([
    {
      $sort: { isActive: -1, [sortByField]: sortDirection },
    },
    {
      $addFields: {
        dispalyFields: currenciesDisplayField,
        muiData: currenciesMuiDataObj,
      },
    },
    {
      $lookup: {
        from: 'countries',
        localField: 'id',
        foreignField: 'id',
        as: 'nameData',
      },
    },
    {
      $addFields: {
        dispalyFields: currenciesDisplayField,
        muiData: currenciesMuiDataObj,
        totalAgents: { $size: '$agents_id' },
        totalSuppliers: { $size: '$suppliers_id' },
      },
    },
    {
      $set: {
        name: '$nameData.name',
      },
    },
    {
      $unset: 'nameData',
    },
    {
      $unwind: {
        path: '$name',
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);
  const result = {
    data: paginate(dataValue, perPage, pageNumber),
    totalCount: dataValue.length,
  };
  await multiMap.put(
    `all${modelName}` as unknown as MultiMapKey,
    dataValue as unknown as MultiMapValue
  );
  return result;
}

export async function findAllAgencies(
  modelName: string,
  sortByField: string,
  perPage: number,
  pageNumber: number,
  sortDirection: 1 | -1,
  multiMap: MultiMap<MultiMapKey, MultiMapValue>
) {
  var collection = mongoose.model(modelName);
  const dataValue = await collection.aggregate([
    {
      $sort: { [sortByField]: sortDirection },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'accountManager_id',
        foreignField: '_id',
        as: 'accountManagerData',
      },
    },
    {
      $set: {
        accountManager: '$accountManagerData.userName',
      },
    },
    {
      $unwind: {
        path: '$accountManager',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'countries',
        localField: 'country_id',
        foreignField: '_id',
        as: 'countryData',
      },
    },
    {
      $set: {
        countryName: '$countryData.name',
      },
    },
    {
      $unwind: {
        path: '$countryName',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'provinces',
        localField: 'province_id',
        foreignField: '_id',
        as: 'provinceData',
      },
    },
    {
      $set: {
        provinceName: '$provinceData.name',
      },
    },
    {
      $unwind: {
        path: '$provinceName',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unset: ['accountManagerData', 'countryData', 'provinceData', '__v'],
    },
    {
      $addFields: {
        dispalyFields: agenciesDisplayField,
        muiData: agenciesMuiDataObj,
      },
    },
  ]);
  const result = {
    data: paginate(dataValue, perPage, pageNumber),
    totalCount: dataValue.length,
  };
  await multiMap.put(
    `all${modelName}` as unknown as MultiMapKey,
    dataValue as unknown as MultiMapValue
  );
  return result;
}
