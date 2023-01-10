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
var ObjectId = require('mongodb').ObjectID;
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

type FindFunctionsType = {
  findUsersById?: Function;
  findRolesById?: Function;
  findVideosById?: Function;
  findPhotosById?: Function;
  findFeaturesById?: Function;
  findCountriesById?: Function;
  findProvincesById?: Function;
  findCurrenciesById?: Function;
  findCitiesById?: Function;
  findAgenciesById?: Function;
};

export const findFunctions: FindFunctionsType = {};

findFunctions.findUsersById = async function findUsersById(
  _id: string,
  lookupsFilter: any
) {
  const indexOfAgentsData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /agentsData/g.test(e))
  );
  let user = await Users.aggregate([
    { $match: { _id: ObjectId(_id) } },
    { $project: { password: 0, accessToken: 0 } },
    {
      $lookup: {
        from: 'roles',
        localField: 'role_id',
        foreignField: '_id',
        pipeline: [
          {
            $project: {
              users_id: 0,
            },
          },
        ],
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
      $lookup: {
        from: 'agencies',
        localField: 'agents_id',
        foreignField: '_id',
        pipeline: [
          { $match: { isActive: false } },
          {
            $sort: {
              [lookupsFilter[indexOfAgentsData][
                `Users_agentsData_sortByField`
              ]]:
                lookupsFilter[indexOfAgentsData][
                  `Users_agentsData_sortDirection`
                ],
            },
          },
          {
            $skip:
              lookupsFilter[indexOfAgentsData][`Users_agentsData_perPage`] *
              (lookupsFilter[indexOfAgentsData][`Users_agentsData_pageNumber`] -
                1),
          },
          {
            $limit:
              lookupsFilter[indexOfAgentsData][`Users_agentsData_perPage`],
          },
        ],
        as: 'agentsData',
      },
    },
  ]);

  return user[0];
};

findFunctions.findRolesById = async function findUsersById(
  _id: string,
  lookupsFilter: any
) {
  const indexOfUserData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /userData/g.test(e))
  );

  let role = await Roles.aggregate([
    { $match: { _id: ObjectId(_id) } },
    {
      $lookup: {
        from: 'users',
        localField: 'users_id',
        foreignField: '_id',
        pipeline: [
          {
            $sort: {
              [lookupsFilter[indexOfUserData][`Roles_userData_sortByField`]]:
                lookupsFilter[indexOfUserData][`Roles_userData_sortDirection`],
            },
          },
          {
            $skip:
              lookupsFilter[indexOfUserData][`Roles_userData_perPage`] *
              (lookupsFilter[indexOfUserData][`Roles_userData_pageNumber`] - 1),
          },
          {
            $limit: lookupsFilter[indexOfUserData][`Roles_userData_perPage`],
          },
          {
            $project: {
              password: 0,
              twitter: 0,
              google: 0,
              facebook: 0,
              roleName: 0,
              role_id: 0,
              province_id: 0,
              profileImageKey: 0,
              folderId: 0,
              finalFolder: 0,
              country_id: 0,
              city_id: 0,
              accessToken: 0,
            },
          },
        ],
        as: 'userData',
      },
    },
  ]);

  return role[0];
};

findFunctions.findVideosById = async function findVideosById(_id: string) {
  let video = await Videos.aggregate([{ $match: { _id: ObjectId(_id) } }]);
  return video[0];
};

findFunctions.findPhotosById = async function findPhotosById(_id: string) {
  let photo = await Photos.aggregate([{ $match: { _id: ObjectId(_id) } }]);
  return photo[0];
};

findFunctions.findFeaturesById = async function findFeaturesById(_id: string) {
  let feature = await Features.aggregate([{ $match: { _id: ObjectId(_id) } }]);
  return feature[0];
};

findFunctions.findCountriesById = async function findCountriesById(
  _id: string,
  lookupsFilter: any
) {
  const indexOfStateData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /statesData/g.test(e))
  );
  const indexOfCitiesData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /citiesData/g.test(e))
  );

  const indexOfUserData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /userData/g.test(e))
  );

  const indexOfAgentsData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /agentsData/g.test(e))
  );

  const indexOfSuppliersData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /suppliersData/g.test(e))
  );

  const indexOfHotelsData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /hotelsData/g.test(e))
  );

  let country = await Countries.aggregate([
    { $match: { _id: ObjectId(_id) } },
    {
      $lookup: {
        from: 'provinces',
        localField: 'states_id',
        foreignField: '_id',
        pipeline: [
          {
            $sort: {
              [lookupsFilter[indexOfStateData][
                `Countries_statesData_sortByField`
              ]]:
                lookupsFilter[indexOfStateData][
                  `Countries_statesData_sortDirection`
                ],
            },
          },
          {
            $skip:
              lookupsFilter[indexOfStateData][`Countries_statesData_perPage`] *
              (lookupsFilter[indexOfStateData][
                `Countries_statesData_pageNumber`
              ] -
                1),
          },
          {
            $limit:
              lookupsFilter[indexOfStateData][`Countries_statesData_perPage`],
          },
        ],
        as: 'statesData',
      },
    },
    {
      $lookup: {
        from: 'cities',
        localField: 'cities_id',
        foreignField: '_id',
        pipeline: [
          {
            $sort: {
              [lookupsFilter[indexOfCitiesData][
                `Countries_citiesData_sortByField`
              ]]:
                lookupsFilter[indexOfCitiesData][
                  `Countries_citiesData_sortDirection`
                ],
            },
          },
          {
            $skip:
              lookupsFilter[indexOfCitiesData][`Countries_citiesData_perPage`] *
              (lookupsFilter[indexOfCitiesData][
                `Countries_citiesData_pageNumber`
              ] -
                1),
          },
          {
            $limit:
              lookupsFilter[indexOfCitiesData][`Countries_citiesData_perPage`],
          },
        ],
        as: 'citiesData',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'users_id',
        foreignField: '_id',
        pipeline: [
          { $match: { isActive: false } },
          {
            $sort: {
              [lookupsFilter[indexOfUserData][
                `Countries_userData_sortByField`
              ]]:
                lookupsFilter[indexOfUserData][
                  `Countries_userData_sortDirection`
                ],
            },
          },
          {
            $skip:
              lookupsFilter[indexOfUserData][`Countries_userData_perPage`] *
              (lookupsFilter[indexOfUserData][`Countries_userData_pageNumber`] -
                1),
          },
          {
            $limit:
              lookupsFilter[indexOfUserData][`Countries_userData_perPage`],
          },
        ],
        as: 'userData',
      },
    },
    {
      $lookup: {
        from: 'agencies',
        localField: 'agents_id',
        foreignField: '_id',
        pipeline: [
          { $match: { isActive: false } },
          {
            $sort: {
              [lookupsFilter[indexOfAgentsData][
                `Countries_agentsData_sortByField`
              ]]:
                lookupsFilter[indexOfAgentsData][
                  `Countries_agentsData_sortDirection`
                ],
            },
          },
          {
            $skip:
              lookupsFilter[indexOfAgentsData][`Countries_agentsData_perPage`] *
              (lookupsFilter[indexOfAgentsData][
                `Countries_agentsData_pageNumber`
              ] -
                1),
          },
          {
            $limit:
              lookupsFilter[indexOfAgentsData][`Countries_agentsData_perPage`],
          },
        ],
        as: 'agentsData',
      },
    },
    {
      $lookup: {
        from: 'suppliers',
        localField: 'suppliers_id',
        foreignField: '_id',
        pipeline: [
          { $match: { isActive: false } },
          {
            $sort: {
              [lookupsFilter[indexOfSuppliersData][
                `Countries_suppliersData_sortByField`
              ]]:
                lookupsFilter[indexOfSuppliersData][
                  `Countries_suppliersData_sortDirection`
                ],
            },
          },
          {
            $skip:
              lookupsFilter[indexOfSuppliersData][
                `Countries_suppliersData_perPage`
              ] *
              (lookupsFilter[indexOfSuppliersData][
                `Countries_suppliersData_pageNumber`
              ] -
                1),
          },
          {
            $limit:
              lookupsFilter[indexOfSuppliersData][
                `Countries_suppliersData_perPage`
              ],
          },
        ],
        as: 'suppliersData',
      },
    },
    {
      $lookup: {
        from: 'hotels',
        localField: 'hotels_id',
        foreignField: '_id',
        pipeline: [
          { $match: { isActive: false } },
          {
            $sort: {
              [lookupsFilter[indexOfHotelsData][
                `Countries_hotelsData_sortByField`
              ]]:
                lookupsFilter[indexOfHotelsData][
                  `Countries_hotelsData_sortDirection`
                ],
            },
          },
          {
            $skip:
              lookupsFilter[indexOfHotelsData][`Countries_hotelsData_perPage`] *
              (lookupsFilter[indexOfHotelsData][
                `Countries_hotelsData_pageNumber`
              ] -
                1),
          },
          {
            $limit:
              lookupsFilter[indexOfHotelsData][`Countries_hotelsData_perPage`],
          },
        ],
        as: 'hotelsData',
      },
    },
  ]);

  return country[0];
};

findFunctions.findProvincesById = async function findProvincesById(
  _id: string,
  lookupsFilter: any
) {
  const indexOfCitiesData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /citiesData/g.test(e))
  );

  const indexOfUserData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /userData/g.test(e))
  );

  const indexOfAgentsData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /agentsData/g.test(e))
  );

  const indexOfSuppliersData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /suppliersData/g.test(e))
  );

  const indexOfHotelsData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /hotelsData/g.test(e))
  );

  let province = await Provinces.aggregate([
    { $match: { _id: ObjectId(_id) } },
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
      $unset: ['countryData'],
    },
    {
      $lookup: {
        from: 'cities',
        localField: 'cities_id',
        foreignField: '_id',
        pipeline: [
          {
            $sort: {
              [lookupsFilter[indexOfCitiesData][
                `Provinces_citiesData_sortByField`
              ]]:
                lookupsFilter[indexOfCitiesData][
                  `Provinces_citiesData_sortDirection`
                ],
            },
          },
          {
            $skip:
              lookupsFilter[indexOfCitiesData][`Provinces_citiesData_perPage`] *
              (lookupsFilter[indexOfCitiesData][
                `Provinces_citiesData_pageNumber`
              ] -
                1),
          },
          {
            $limit:
              lookupsFilter[indexOfCitiesData][`Provinces_citiesData_perPage`],
          },
        ],
        as: 'citiesData',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'users_id',
        foreignField: '_id',
        pipeline: [
          { $match: { isActive: false } },
          {
            $sort: {
              [lookupsFilter[indexOfUserData][
                `Provinces_userData_sortByField`
              ]]:
                lookupsFilter[indexOfUserData][
                  `Provinces_userData_sortDirection`
                ],
            },
          },
          {
            $skip:
              lookupsFilter[indexOfUserData][`Provinces_userData_perPage`] *
              (lookupsFilter[indexOfUserData][`Provinces_userData_pageNumber`] -
                1),
          },
          {
            $limit:
              lookupsFilter[indexOfUserData][`Provinces_userData_perPage`],
          },
        ],
        as: 'userData',
      },
    },
    {
      $lookup: {
        from: 'agencies',
        localField: 'agents_id',
        foreignField: '_id',
        pipeline: [
          { $match: { isActive: false } },
          {
            $sort: {
              [lookupsFilter[indexOfAgentsData][
                `Provinces_agentsData_sortByField`
              ]]:
                lookupsFilter[indexOfAgentsData][
                  `Provinces_agentsData_sortDirection`
                ],
            },
          },
          {
            $skip:
              lookupsFilter[indexOfAgentsData][`Provinces_agentsData_perPage`] *
              (lookupsFilter[indexOfAgentsData][
                `Provinces_agentsData_pageNumber`
              ] -
                1),
          },
          {
            $limit:
              lookupsFilter[indexOfAgentsData][`Provinces_agentsData_perPage`],
          },
        ],
        as: 'agentsData',
      },
    },
    {
      $lookup: {
        from: 'suppliers',
        localField: 'suppliers_id',
        foreignField: '_id',
        pipeline: [
          { $match: { isActive: false } },
          {
            $sort: {
              [lookupsFilter[indexOfSuppliersData][
                `Provinces_suppliersData_sortByField`
              ]]:
                lookupsFilter[indexOfSuppliersData][
                  `Provinces_suppliersData_sortDirection`
                ],
            },
          },
          {
            $skip:
              lookupsFilter[indexOfSuppliersData][
                `Provinces_suppliersData_perPage`
              ] *
              (lookupsFilter[indexOfSuppliersData][
                `Provinces_suppliersData_pageNumber`
              ] -
                1),
          },
          {
            $limit:
              lookupsFilter[indexOfSuppliersData][
                `Provinces_suppliersData_perPage`
              ],
          },
        ],
        as: 'suppliersData',
      },
    },
    {
      $lookup: {
        from: 'hotels',
        localField: 'hotels_id',
        foreignField: '_id',
        pipeline: [
          { $match: { isActive: false } },
          {
            $sort: {
              [lookupsFilter[indexOfHotelsData][
                `Provinces_hotelsData_sortByField`
              ]]:
                lookupsFilter[indexOfHotelsData][
                  `Provinces_hotelsData_sortDirection`
                ],
            },
          },
          {
            $skip:
              lookupsFilter[indexOfHotelsData][`Provinces_hotelsData_perPage`] *
              (lookupsFilter[indexOfHotelsData][
                `Provinces_hotelsData_pageNumber`
              ] -
                1),
          },
          {
            $limit:
              lookupsFilter[indexOfHotelsData][`Provinces_hotelsData_perPage`],
          },
        ],
        as: 'hotelsData',
      },
    },
  ]);

  return province[0];
};

findFunctions.findCitiesById = async function findCitiesById(
  _id: string,
  lookupsFilter: any
) {
  const indexOfUserData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /userData/g.test(e))
  );

  const indexOfAgentsData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /agentsData/g.test(e))
  );

  const indexOfSuppliersData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /suppliersData/g.test(e))
  );

  const indexOfHotelsData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /hotelsData/g.test(e))
  );
  let city = await Cities.aggregate([
    { $match: { _id: ObjectId(_id) } },
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
      $lookup: {
        from: 'provinces',
        localField: 'state_id',
        foreignField: 'id',
        as: 'provinceData',
      },
    },
    {
      $set: {
        state_name: '$provinceData.name',
      },
    },
    {
      $unwind: {
        path: '$state_name',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'users_id',
        foreignField: '_id',
        pipeline: [
          { $match: { isActive: false } },
          {
            $sort: {
              [lookupsFilter[indexOfUserData][`Cities_userData_sortByField`]]:
                lookupsFilter[indexOfUserData][`Cities_userData_sortDirection`],
            },
          },
          {
            $skip:
              lookupsFilter[indexOfUserData][`Cities_userData_perPage`] *
              (lookupsFilter[indexOfUserData][`Cities_userData_pageNumber`] -
                1),
          },
          {
            $limit: lookupsFilter[indexOfUserData][`Cities_userData_perPage`],
          },
        ],
        as: 'userData',
      },
    },
    {
      $lookup: {
        from: 'agencies',
        localField: 'agents_id',
        foreignField: '_id',
        pipeline: [
          { $match: { isActive: false } },
          {
            $sort: {
              [lookupsFilter[indexOfAgentsData][
                `Cities_agentsData_sortByField`
              ]]:
                lookupsFilter[indexOfAgentsData][
                  `Cities_agentsData_sortDirection`
                ],
            },
          },
          {
            $skip:
              lookupsFilter[indexOfAgentsData][`Cities_agentsData_perPage`] *
              (lookupsFilter[indexOfAgentsData][
                `Cities_agentsData_pageNumber`
              ] -
                1),
          },
          {
            $limit:
              lookupsFilter[indexOfAgentsData][`Cities_agentsData_perPage`],
          },
        ],
        as: 'agentsData',
      },
    },
    {
      $lookup: {
        from: 'suppliers',
        localField: 'suppliers_id',
        foreignField: '_id',
        pipeline: [
          { $match: { isActive: false } },
          {
            $sort: {
              [lookupsFilter[indexOfSuppliersData][
                `Cities_suppliersData_sortByField`
              ]]:
                lookupsFilter[indexOfSuppliersData][
                  `Cities_suppliersData_sortDirection`
                ],
            },
          },
          {
            $skip:
              lookupsFilter[indexOfSuppliersData][
                `Cities_suppliersData_perPage`
              ] *
              (lookupsFilter[indexOfSuppliersData][
                `Cities_suppliersData_pageNumber`
              ] -
                1),
          },
          {
            $limit:
              lookupsFilter[indexOfSuppliersData][
                `Cities_suppliersData_perPage`
              ],
          },
        ],
        as: 'suppliersData',
      },
    },
    {
      $lookup: {
        from: 'hotels',
        localField: 'hotels_id',
        foreignField: '_id',
        pipeline: [
          { $match: { isActive: false } },
          {
            $sort: {
              [lookupsFilter[indexOfHotelsData][
                `Cities_hotelsData_sortByField`
              ]]:
                lookupsFilter[indexOfHotelsData][
                  `Cities_hotelsData_sortDirection`
                ],
            },
          },
          {
            $skip:
              lookupsFilter[indexOfHotelsData][`Cities_hotelsData_perPage`] *
              (lookupsFilter[indexOfHotelsData][
                `Cities_hotelsData_pageNumber`
              ] -
                1),
          },
          {
            $limit:
              lookupsFilter[indexOfHotelsData][`Cities_hotelsData_perPage`],
          },
        ],
        as: 'hotelsData',
      },
    },
    {
      $unset: ['countryData', 'provinceData'],
    },
  ]);

  return city[0];
};

findFunctions.findCurrenciesById = async function findCurrenciesById(
  _id: string,
  lookupsFilter: any
) {
  const indexOfAgentsData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /agentsData/g.test(e))
  );

  const indexOfSuppliersData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /suppliersData/g.test(e))
  );

  let currency = await Currencies.aggregate([
    { $match: { _id: ObjectId(_id) } },
    {
      $lookup: {
        from: 'agencies',
        localField: 'agents_id',
        foreignField: '_id',
        pipeline: [
          { $match: { isActive: false } },
          {
            $sort: {
              [lookupsFilter[indexOfAgentsData][
                `Currencies_agentsData_sortByField`
              ]]:
                lookupsFilter[indexOfAgentsData][
                  `Currencies_agentsData_sortDirection`
                ],
            },
          },
          {
            $skip:
              lookupsFilter[indexOfAgentsData][
                `Currencies_agentsData_perPage`
              ] *
              (lookupsFilter[indexOfAgentsData][
                `Currencies_agentsData_pageNumber`
              ] -
                1),
          },
          {
            $limit:
              lookupsFilter[indexOfAgentsData][`Currencies_agentsData_perPage`],
          },
        ],
        as: 'agentsData',
      },
    },
    {
      $lookup: {
        from: 'suppliers',
        localField: 'suppliers_id',
        foreignField: '_id',
        pipeline: [
          { $match: { isActive: false } },
          {
            $sort: {
              [lookupsFilter[indexOfSuppliersData][
                `Currencies_suppliersData_sortByField`
              ]]:
                lookupsFilter[indexOfSuppliersData][
                  `Currencies_suppliersData_sortDirection`
                ],
            },
          },
          {
            $skip:
              lookupsFilter[indexOfSuppliersData][
                `Currencies_suppliersData_perPage`
              ] *
              (lookupsFilter[indexOfSuppliersData][
                `Currencies_suppliersData_pageNumber`
              ] -
                1),
          },
          {
            $limit:
              lookupsFilter[indexOfSuppliersData][
                `Currencies_suppliersData_perPage`
              ],
          },
        ],
        as: 'suppliersData',
      },
    },
  ]);

  return currency[0];
};

findFunctions.findAgenciesById = async function findAgenciesById(_id: string) {
  let agent = await Agencies.aggregate([
    { $match: { _id: ObjectId(_id) } },
    {
      $lookup: {
        from: 'users',
        localField: 'accountManager_id',
        foreignField: '_id',
        pipeline: [
          {
            $project: {
              password: 0,
              twitter: 0,
              google: 0,
              facebook: 0,
              roleName: 0,
              role_id: 0,
              province_id: 0,
              profileImageKey: 0,
              folderId: 0,
              finalFolder: 0,
              country_id: 0,
              city_id: 0,
              accessToken: 0,
            },
          },
        ],
        as: 'accountManagerData',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userUpdated',
        foreignField: '_id',
        pipeline: [
          {
            $project: {
              password: 0,
              twitter: 0,
              google: 0,
              facebook: 0,
              roleName: 0,
              role_id: 0,
              province_id: 0,
              profileImageKey: 0,
              folderId: 0,
              finalFolder: 0,
              country_id: 0,
              city_id: 0,
              accessToken: 0,
            },
          },
        ],
        as: 'userUpdatedData',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userCreated',
        foreignField: '_id',
        pipeline: [
          {
            $project: {
              password: 0,
              twitter: 0,
              google: 0,
              facebook: 0,
              roleName: 0,
              role_id: 0,
              province_id: 0,
              profileImageKey: 0,
              folderId: 0,
              finalFolder: 0,
              country_id: 0,
              city_id: 0,
              accessToken: 0,
            },
          },
        ],
        as: 'userCreatedData',
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
      $lookup: {
        from: 'cities',
        localField: 'city_id',
        foreignField: '_id',
        as: 'cityData',
      },
    },
    {
      $set: {
        cityName: '$cityData.name',
      },
    },
    {
      $unwind: {
        path: '$cityName',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unset: ['countryData', 'provinceData', 'cityData'],
    },
  ]);
  return agent[0];
};

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
      {
        $lookup: {
          from: 'countries',
          localField: 'country_id',
          foreignField: 'id',
          as: 'countryData',
        },
      },
      {
        $lookup: {
          from: 'provinces',
          localField: 'state_id',
          foreignField: 'id',
          as: 'provinceData',
        },
      },
      {
        $set: {
          country_name: '$countryData.name',
          state_name: '$provinceData.name',
        },
      },
      {
        $unwind: {
          path: '$country_name',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$state_name',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unset: ['countryData', 'provinceData'],
      },
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

export const findMuliMapFunctions: FindFunctionsType = {};

findMuliMapFunctions.findUsersById = async function findUsersById(
  _id: string,
  lookupsFilter: any,
  hz: any,
  multiMap: any
) {
  const indexOfAgentsData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /agentsData/g.test(e))
  );
  const multiMapAgents = await hz.getMultiMap('Agencies');
  const agentsExist = await multiMapAgents.containsKey(`allAgencies`);
  const multiMapRoles = await hz.getMultiMap('Roles');
  const rolesExist = await multiMapRoles.containsKey(`allRoles`);

  let finalUser = {};
  if (!agentsExist || !rolesExist) {
    finalUser = await findFunctions[
      `findUsersById` as keyof typeof findFunctions
    ]?.(_id, lookupsFilter);
  } else {
    const users = await multiMap.get(`allUsers`);
    for (const user of users as any) {
      let currentUser = user.filter((a: any) => a._id == _id);
      const agencies = await multiMapAgents.get('allAgencies');
      for (const agents of agencies as any) {
        let findAgents = agents.filter((a: any) =>
          currentUser[0].agents_id.includes(a._id)
        );
        let filterAgents = findAgents.map(
          ({
            dispalyFields,
            muiData,
            ...rest
          }: {
            dispalyFields: string[];
            muiData: string[];
          }) => rest
        );
        let sortAgents = paginate(
          sort_by(
            filterAgents,
            [lookupsFilter[indexOfAgentsData][`Users_agentsData_sortByField`]],
            lookupsFilter[indexOfAgentsData][`Users_agentsData_sortDirection`]
          ),
          lookupsFilter[indexOfAgentsData][`Users_agentsData_perPage`],
          lookupsFilter[indexOfAgentsData][`Users_agentsData_pageNumber`]
        );
        currentUser[0].agentsData = sortAgents;
      }
      const roles = await multiMapRoles.get('allRoles');
      for (const role of roles as any) {
        let relatedRole = role.filter((a: any) =>
          currentUser[0].role_id.includes(a._id)
        );
        let lastRole = relatedRole.map(
          ({ users_id, ...rest }: { users_id: string[] }) => rest
        );
        currentUser[0].roleData = lastRole;
      }
      finalUser = currentUser[0];
    }
  }

  return finalUser;
};

findMuliMapFunctions.findRolesById = async function findRolesById(
  _id: string,
  lookupsFilter: any,
  hz: any,
  multiMap: any
) {
  const indexOfUserData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /userData/g.test(e))
  );
  const multiMapUsers = await hz.getMultiMap('Users');
  const usersExist = await multiMapUsers.containsKey(`allUsers`);

  let finalRole = {};
  if (!usersExist) {
    finalRole = await findFunctions[
      `findRolesById` as keyof typeof findFunctions
    ]?.(_id, lookupsFilter);
  } else {
    const roles = await multiMap.get(`allRoles`);
    for (const role of roles) {
      let currentRole = role.filter((a: any) => a._id == _id);
      let filterRole = currentRole.map(
        ({
          dispalyFields,
          muiData,
          ...rest
        }: {
          dispalyFields: string[];
          muiData: string[];
        }) => rest
      );
      const multiUsers = await multiMapUsers.get('allUsers');
      for (const users of multiUsers as any) {
        let finalUsers = users.filter((a: any) =>
          filterRole[0].users_id.includes(a._id)
        );
        let filterUsers = finalUsers.map(
          ({
            dispalyFields,
            muiData,
            ...rest
          }: {
            dispalyFields: string[];
            muiData: string[];
          }) => rest
        );
        let sortUsers = paginate(
          sort_by(
            filterUsers,
            [lookupsFilter[indexOfUserData][`Roles_userData_sortByField`]],
            lookupsFilter[indexOfUserData][`Roles_userData_sortDirection`]
          ),
          lookupsFilter[indexOfUserData][`Roles_userData_perPage`],
          lookupsFilter[indexOfUserData][`Roles_userData_pageNumber`]
        );
        filterRole[0].userData = sortUsers;
        finalRole = filterRole[0];
      }
    }
  }

  return finalRole;
};

findMuliMapFunctions.findVideosById = async function findVideosById(
  _id: string,
  lookupsFilter: any,
  hz: any,
  multiMap: any
) {
  const videos = await multiMap.get(`allVideos`);
  for (const video of videos) {
    let currentVideo = video.filter((a: any) => a._id == _id);
    let filterVideo = currentVideo.map(
      ({
        dispalyFields,
        muiData,
        ...rest
      }: {
        dispalyFields: string[];
        muiData: string[];
      }) => rest
    );
    return filterVideo[0];
  }
};

findMuliMapFunctions.findPhotosById = async function findPhotosById(
  _id: string,
  lookupsFilter: any,
  hz: any,
  multiMap: any
) {
  const photos = await multiMap.get(`allPhotos`);
  for (const photo of photos) {
    let currentPhoto = photo.filter((a: any) => a._id == _id);
    let filterPhoto = currentPhoto.map(
      ({
        dispalyFields,
        muiData,
        ...rest
      }: {
        dispalyFields: string[];
        muiData: string[];
      }) => rest
    );
    return filterPhoto[0];
  }
};

findMuliMapFunctions.findFeaturesById = async function findFeaturesById(
  _id: string,
  lookupsFilter: any,
  hz: any,
  multiMap: any
) {
  const features = await multiMap.get(`allFeatures`);
  for (const feature of features) {
    let currentFeature = feature.filter((a: any) => a._id == _id);
    let filterFeature = currentFeature.map(
      ({
        dispalyFields,
        muiData,
        ...rest
      }: {
        dispalyFields: string[];
        muiData: string[];
      }) => rest
    );
    return filterFeature[0];
  }
};

findMuliMapFunctions.findCountriesById = async function findCountriesById(
  _id: string,
  lookupsFilter: any,
  hz: any,
  multiMap: any
) {
  const indexOfStateData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /statesData/g.test(e))
  );
  const indexOfCitiesData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /citiesData/g.test(e))
  );

  const indexOfUserData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /userData/g.test(e))
  );

  const indexOfAgentsData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /agentsData/g.test(e))
  );

  const indexOfSuppliersData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /suppliersData/g.test(e))
  );

  const indexOfHotelsData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /hotelsData/g.test(e))
  );

  const multiMapProvinces = await hz.getMultiMap('Provinces');
  const provincesExist = await multiMapProvinces.containsKey(`allProvinces`);
  const multiMapCities = await hz.getMultiMap('Cities');
  const citiesExist = await multiMapCities.containsKey(`allCities`);
  const multiMapUsers = await hz.getMultiMap('Users');
  const usersExist = await multiMapUsers.containsKey(`allUsers`);
  const multiMapAgents = await hz.getMultiMap('Agencies');
  const agentsExist = await multiMapAgents.containsKey(`allAgencies`);
  //Todo check hotel and supplier multipmap
  let finalCountry = {};
  console.log({ provincesExist, citiesExist, usersExist, agentsExist });
  if (!provincesExist || !citiesExist || !usersExist || !agentsExist) {
    finalCountry = await findFunctions[
      `findCountriesById` as keyof typeof findFunctions
    ]?.(_id, lookupsFilter);
  } else {
    const countriesData = await multiMap.get(`allCountries`);
    for (const countries of countriesData as any) {
      let currentCountry = countries.filter((a: any) => a._id == _id);
      let filterCountry = currentCountry.map(
        ({
          dispalyFields,
          muiData,
          ...rest
        }: {
          dispalyFields: string[];
          muiData: string[];
        }) => rest
      );
      const provincesData = await multiMapProvinces.get('allProvinces');
      for (const provinces of provincesData) {
        let findProvinces = provinces.filter((a: any) =>
          filterCountry[0].states_id.includes(a._id)
        );
        let filterProvinces = findProvinces.map(
          ({
            dispalyFields,
            muiData,
            ...rest
          }: {
            dispalyFields: string[];
            muiData: string[];
          }) => rest
        );
        let sortProvinces = paginate(
          sort_by(
            filterProvinces,
            [
              lookupsFilter[indexOfStateData][
                `Countries_statesData_sortByField`
              ],
            ],
            lookupsFilter[indexOfStateData][
              `Countries_statesData_sortDirection`
            ]
          ),
          lookupsFilter[indexOfStateData][`Countries_statesData_perPage`],
          lookupsFilter[indexOfStateData][`Countries_statesData_pageNumber`]
        );
        filterCountry[0].statesData = sortProvinces;
      }

      const citiesData = await multiMapCities.get('allCities');
      for (const cities of citiesData) {
        let findCities = cities.filter((a: any) =>
          filterCountry[0].cities_id.includes(a._id)
        );
        let filterCities = findCities.map(
          ({
            dispalyFields,
            muiData,
            ...rest
          }: {
            dispalyFields: string[];
            muiData: string[];
          }) => rest
        );
        let sortCities = paginate(
          sort_by(
            filterCities,
            [
              lookupsFilter[indexOfCitiesData][
                `Countries_citiesData_sortByField`
              ],
            ],
            lookupsFilter[indexOfCitiesData][
              `Countries_citiesData_sortDirection`
            ]
          ),
          lookupsFilter[indexOfCitiesData][`Countries_citiesData_perPage`],
          lookupsFilter[indexOfCitiesData][`Countries_citiesData_pageNumber`]
        );
        filterCountry[0].citiesData = sortCities;
      }

      const usersData = await multiMapUsers.get('allUsers');
      for (const users of usersData) {
        let findUsers = users.filter((a: any) =>
          filterCountry[0].users_id.includes(a._id)
        );
        let filterUsers = findUsers.map(
          ({
            dispalyFields,
            muiData,
            ...rest
          }: {
            dispalyFields: string[];
            muiData: string[];
          }) => rest
        );
        let sortUsers = paginate(
          sort_by(
            filterUsers,
            [lookupsFilter[indexOfUserData][`Countries_userData_sortByField`]],
            lookupsFilter[indexOfUserData][`Countries_userData_sortDirection`]
          ),
          lookupsFilter[indexOfUserData][`Countries_userData_perPage`],
          lookupsFilter[indexOfUserData][`Countries_userData_pageNumber`]
        );
        filterCountry[0].userData = sortUsers;
      }

      const agentsData = await multiMapAgents.get('allAgencies');
      for (const agents of agentsData) {
        let findAgents = agents.filter((a: any) =>
          filterCountry[0].agents_id.includes(a._id)
        );
        let filterAgents = findAgents.map(
          ({
            dispalyFields,
            muiData,
            ...rest
          }: {
            dispalyFields: string[];
            muiData: string[];
          }) => rest
        );
        let sortAgents = paginate(
          sort_by(
            filterAgents,
            [
              lookupsFilter[indexOfAgentsData][
                `Countries_agentsData_sortByField`
              ],
            ],
            lookupsFilter[indexOfAgentsData][
              `Countries_agentsData_sortDirection`
            ]
          ),
          lookupsFilter[indexOfAgentsData][`Countries_agentsData_perPage`],
          lookupsFilter[indexOfAgentsData][`Countries_agentsData_pageNumber`]
        );
        filterCountry[0].agentsData = sortAgents;
      }

      filterCountry[0].suppliersData = [];
      filterCountry[0].hotelsData = [];

      finalCountry = filterCountry[0];
    }
  }

  return finalCountry;
};

findMuliMapFunctions.findProvincesById = async function findProvincesById(
  _id: string,
  lookupsFilter: any,
  hz: any,
  multiMap: any
) {
  const indexOfCitiesData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /citiesData/g.test(e))
  );

  const indexOfUserData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /userData/g.test(e))
  );

  const indexOfAgentsData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /agentsData/g.test(e))
  );

  const indexOfSuppliersData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /suppliersData/g.test(e))
  );

  const indexOfHotelsData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /hotelsData/g.test(e))
  );

  const multiMapCities = await hz.getMultiMap('Cities');
  const citiesExist = await multiMapCities.containsKey(`allCities`);
  const multiMapUsers = await hz.getMultiMap('Users');
  const usersExist = await multiMapUsers.containsKey(`allUsers`);
  const multiMapAgents = await hz.getMultiMap('Agencies');
  const agentsExist = await multiMapAgents.containsKey(`allAgencies`);
  //Todo check hotel and supplier multipmap
  let finalCountry = {};

  if (!citiesExist || !usersExist || !agentsExist) {
    finalCountry = await findFunctions[
      `findProvincesById` as keyof typeof findFunctions
    ]?.(_id, lookupsFilter);
  } else {
    const provincesData = await multiMap.get(`allProvinces`);
    for (const provinces of provincesData as any) {
      let currentProvince = provinces.filter((a: any) => a._id == _id);
      let filterProvince = currentProvince.map(
        ({
          dispalyFields,
          muiData,
          ...rest
        }: {
          dispalyFields: string[];
          muiData: string[];
        }) => rest
      );

      const citiesData = await multiMapCities.get('allCities');
      for (const cities of citiesData) {
        let findCities = cities.filter((a: any) =>
          filterProvince[0].cities_id.includes(a._id)
        );
        let filterCities = findCities.map(
          ({
            dispalyFields,
            muiData,
            ...rest
          }: {
            dispalyFields: string[];
            muiData: string[];
          }) => rest
        );
        let sortCities = paginate(
          sort_by(
            filterCities,
            [
              lookupsFilter[indexOfCitiesData][
                `Provinces_citiesData_sortByField`
              ],
            ],
            lookupsFilter[indexOfCitiesData][
              `Provinces_citiesData_sortDirection`
            ]
          ),
          lookupsFilter[indexOfCitiesData][`Provinces_citiesData_perPage`],
          lookupsFilter[indexOfCitiesData][`Provinces_citiesData_pageNumber`]
        );
        filterProvince[0].citiesData = sortCities;
      }

      const usersData = await multiMapUsers.get('allUsers');
      for (const users of usersData) {
        let findUsers = users.filter((a: any) =>
          filterProvince[0].users_id.includes(a._id)
        );
        let filterUsers = findUsers.map(
          ({
            dispalyFields,
            muiData,
            ...rest
          }: {
            dispalyFields: string[];
            muiData: string[];
          }) => rest
        );
        let sortUsers = paginate(
          sort_by(
            filterUsers,
            [lookupsFilter[indexOfUserData][`Provinces_userData_sortByField`]],
            lookupsFilter[indexOfUserData][`Provinces_userData_sortDirection`]
          ),
          lookupsFilter[indexOfUserData][`Provinces_userData_perPage`],
          lookupsFilter[indexOfUserData][`Provinces_userData_pageNumber`]
        );
        filterProvince[0].userData = sortUsers;
      }

      const agentsData = await multiMapAgents.get('allAgencies');
      for (const agents of agentsData) {
        let findAgents = agents.filter((a: any) =>
          filterProvince[0].agents_id.includes(a._id)
        );
        let filterAgents = findAgents.map(
          ({
            dispalyFields,
            muiData,
            ...rest
          }: {
            dispalyFields: string[];
            muiData: string[];
          }) => rest
        );
        let sortAgents = paginate(
          sort_by(
            filterAgents,
            [
              lookupsFilter[indexOfAgentsData][
                `Provinces_agentsData_sortByField`
              ],
            ],
            lookupsFilter[indexOfAgentsData][
              `Provinces_agentsData_sortDirection`
            ]
          ),
          lookupsFilter[indexOfAgentsData][`Provinces_agentsData_perPage`],
          lookupsFilter[indexOfAgentsData][`Provinces_agentsData_pageNumber`]
        );
        filterProvince[0].agentsData = sortAgents;
      }

      filterProvince[0].suppliersData = [];
      filterProvince[0].hotelsData = [];

      finalCountry = filterProvince[0];
    }
  }

  return finalCountry;
};

findMuliMapFunctions.findCitiesById = async function findCitiesById(
  _id: string,
  lookupsFilter: any,
  hz: any,
  multiMap: any
) {
  const indexOfUserData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /userData/g.test(e))
  );

  const indexOfAgentsData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /agentsData/g.test(e))
  );

  const indexOfSuppliersData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /suppliersData/g.test(e))
  );

  const indexOfHotelsData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /hotelsData/g.test(e))
  );

  const multiMapUsers = await hz.getMultiMap('Users');
  const usersExist = await multiMapUsers.containsKey(`allUsers`);
  const multiMapAgents = await hz.getMultiMap('Agencies');
  const agentsExist = await multiMapAgents.containsKey(`allAgencies`);
  //Todo check hotel and supplier multipmap
  let finalCountry = {};

  if (!usersExist || !agentsExist) {
    finalCountry = await findFunctions[
      `findCitiesById` as keyof typeof findFunctions
    ]?.(_id, lookupsFilter);
  } else {
    const citiesData = await multiMap.get(`allCities`);
    for (const cities of citiesData as any) {
      let currentCity = cities.filter((a: any) => a._id == _id);
      let filterCity = currentCity.map(
        ({
          dispalyFields,
          muiData,
          ...rest
        }: {
          dispalyFields: string[];
          muiData: string[];
        }) => rest
      );
      const usersData = await multiMapUsers.get('allUsers');
      for (const users of usersData) {
        let findUsers = users.filter((a: any) =>
          filterCity[0].users_id.includes(a._id)
        );
        let filterUsers = findUsers.map(
          ({
            dispalyFields,
            muiData,
            ...rest
          }: {
            dispalyFields: string[];
            muiData: string[];
          }) => rest
        );
        let sortUsers = paginate(
          sort_by(
            filterUsers,
            [lookupsFilter[indexOfUserData][`Cities_userData_sortByField`]],
            lookupsFilter[indexOfUserData][`Cities_userData_sortDirection`]
          ),
          lookupsFilter[indexOfUserData][`Cities_userData_perPage`],
          lookupsFilter[indexOfUserData][`Cities_userData_pageNumber`]
        );
        filterCity[0].userData = sortUsers;
      }

      const agentsData = await multiMapAgents.get('allAgencies');
      for (const agents of agentsData) {
        let findAgents = agents.filter((a: any) =>
          filterCity[0].agents_id.includes(a._id)
        );
        let filterAgents = findAgents.map(
          ({
            dispalyFields,
            muiData,
            ...rest
          }: {
            dispalyFields: string[];
            muiData: string[];
          }) => rest
        );
        let sortAgents = paginate(
          sort_by(
            filterAgents,
            [lookupsFilter[indexOfAgentsData][`Cities_agentsData_sortByField`]],
            lookupsFilter[indexOfAgentsData][`Cities_agentsData_sortDirection`]
          ),
          lookupsFilter[indexOfAgentsData][`Cities_agentsData_perPage`],
          lookupsFilter[indexOfAgentsData][`Cities_agentsData_pageNumber`]
        );
        filterCity[0].agentsData = sortAgents;
      }

      filterCity[0].suppliersData = [];
      filterCity[0].hotelsData = [];

      finalCountry = filterCity[0];
    }
  }

  return finalCountry;
};

findMuliMapFunctions.findCurrenciesById = async function findCurrenciesById(
  _id: string,
  lookupsFilter: any,
  hz: any,
  multiMap: any
) {
  const indexOfAgentsData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /agentsData/g.test(e))
  );

  const indexOfSuppliersData = lookupsFilter.findIndex((a: any) =>
    Object.keys(a).some((e) => /suppliersData/g.test(e))
  );
  const multiMapAgents = await hz.getMultiMap('Agencies');
  const agentsExist = await multiMapAgents.containsKey(`allAgencies`);
  //Todo check supplier multipmap
  let finalCurrency = {};
  if (!agentsExist) {
    finalCurrency = await findFunctions[
      `findCurrenciesById` as keyof typeof findFunctions
    ]?.(_id, lookupsFilter);
  } else {
    const currencyData = await multiMap.get(`allCurrencies`);
    for (const currencies of currencyData as any) {
      let currentCurrency = currencies.filter((a: any) => a._id == _id);
      let filterCurrency = currentCurrency.map(
        ({
          dispalyFields,
          muiData,
          ...rest
        }: {
          dispalyFields: string[];
          muiData: string[];
        }) => rest
      );

      const agentsData = await multiMapAgents.get('allAgencies');
      for (const agents of agentsData) {
        let findAgents = agents.filter((a: any) =>
          filterCurrency[0].agents_id.includes(a._id)
        );
        let filterAgents = findAgents.map(
          ({
            dispalyFields,
            muiData,
            ...rest
          }: {
            dispalyFields: string[];
            muiData: string[];
          }) => rest
        );
        let sortAgents = paginate(
          sort_by(
            filterAgents,
            [
              lookupsFilter[indexOfAgentsData][
                `Currencies_agentsData_sortByField`
              ],
            ],
            lookupsFilter[indexOfAgentsData][
              `Currencies_agentsData_sortDirection`
            ]
          ),
          lookupsFilter[indexOfAgentsData][`Currencies_agentsData_perPage`],
          lookupsFilter[indexOfAgentsData][`Currencies_agentsData_pageNumber`]
        );
        filterCurrency[0].agentsData = sortAgents;
      }

      filterCurrency[0].suppliersData = [];

      finalCurrency = filterCurrency[0];
    }
  }

  return finalCurrency;
};

findMuliMapFunctions.findAgenciesById = async function findAgenciesById(
  _id: string,
  lookupsFilter: any,
  hz: any,
  multiMap: any
) {
  const multiMapCountries = await hz.getMultiMap('Countries');
  const countriesExist = await multiMapCountries.containsKey(`allCountries`);
  const multiMapProvinces = await hz.getMultiMap('Provinces');
  const provincesExist = await multiMapProvinces.containsKey(`allProvinces`);
  const multiMapCities = await hz.getMultiMap('Cities');
  const citiesExist = await multiMapCities.containsKey(`allCities`);
  const multiMapUsers = await hz.getMultiMap('Users');
  const usersExist = await multiMapUsers.containsKey(`allUsers`);

  let finalAgent = {};

  if (!countriesExist || !provincesExist || !citiesExist || !usersExist) {
    finalAgent = await findFunctions[
      `findAgenciesById` as keyof typeof findFunctions
    ]?.(_id, lookupsFilter);
  } else {
    const agenciesData = await multiMap.get(`allAgencies`);

    for (const agencies of agenciesData) {
      let currentAgent = agencies.filter((a: any) => a._id == _id);
      let filterAgent = currentAgent.map(
        ({
          dispalyFields,
          muiData,
          ...rest
        }: {
          dispalyFields: string[];
          muiData: string[];
        }) => rest
      );

      const countriesData = await multiMapCountries.get(`allCountries`);
      for (const countries of countriesData) {
        let agentCountry = countries.filter((a: any) =>
          filterAgent[0].country_id.includes(a._id)
        );
        let countryName = agentCountry.map((a: any) => a.name);
        filterAgent[0].countryName = countryName?.toString();
      }

      const provincesData = await multiMapProvinces.get(`allProvinces`);
      for (const provinces of provincesData) {
        let agentProvince = provinces.filter((a: any) =>
          filterAgent[0].province_id.includes(a._id)
        );
        let provinceName = agentProvince.map((a: any) => a.name);
        filterAgent[0].provinceName = provinceName?.toString();
      }

      const citiesData = await multiMapCities.get(`allCities`);
      for (const cities of citiesData) {
        let agentCity = cities.filter((a: any) =>
          filterAgent[0].city_id.includes(a._id)
        );
        let cityName = agentCity.map((a: any) => a.name);
        filterAgent[0].cityName = cityName?.toString();
      }

      const usersData = await multiMapUsers.get(`allUsers`);
      for (const users of usersData) {
        let accountManager = users.filter((a: any) =>
          filterAgent[0].accountManager_id.includes(a._id)
        );
        let accountManagerFilter = accountManager.map(
          ({
            dispalyFields,
            muiData,
            twitter,
            google,
            facebook,
            roleName,
            role_id,
            province_id,
            profileImageKey,
            folderId,
            finalFolder,
            country_id,
            city_id,
            ...rest
          }: {
            dispalyFields: string[];
            muiData: string[];
            twitter: string[];
            google: string[];
            facebook: string[];
            roleName: string;
            role_id: string[];
            province_id: string[];
            profileImageKey: string;
            folderId: string;
            finalFolder: string;
            country_id: string[];
            city_id: string[];
          }) => rest
        );

        let userUpdated = users.filter((a: any) =>
          filterAgent[0].userUpdated.includes(a._id)
        );
        let userUpdatedFilter = userUpdated.map(
          ({
            dispalyFields,
            muiData,
            twitter,
            google,
            facebook,
            roleName,
            role_id,
            province_id,
            profileImageKey,
            folderId,
            finalFolder,
            country_id,
            city_id,
            ...rest
          }: {
            dispalyFields: string[];
            muiData: string[];
            twitter: string[];
            google: string[];
            facebook: string[];
            roleName: string;
            role_id: string[];
            province_id: string[];
            profileImageKey: string;
            folderId: string;
            finalFolder: string;
            country_id: string[];
            city_id: string[];
          }) => rest
        );

        let userCreated = users.filter((a: any) =>
          filterAgent[0].userCreated.includes(a._id)
        );
        let userCreatedFilter = userCreated.map(
          ({
            dispalyFields,
            muiData,
            twitter,
            google,
            facebook,
            roleName,
            role_id,
            province_id,
            profileImageKey,
            folderId,
            finalFolder,
            country_id,
            city_id,
            ...rest
          }: {
            dispalyFields: string[];
            muiData: string[];
            twitter: string[];
            google: string[];
            facebook: string[];
            roleName: string;
            role_id: string[];
            province_id: string[];
            profileImageKey: string;
            folderId: string;
            finalFolder: string;
            country_id: string[];
            city_id: string[];
          }) => rest
        );

        filterAgent[0].accountManagerData = accountManagerFilter;
        filterAgent[0].userUpdatedData = userUpdatedFilter;
        filterAgent[0].userCreatedData = userCreatedFilter;
      }

      finalAgent = filterAgent[0];
    }
  }

  return finalAgent;
};

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
