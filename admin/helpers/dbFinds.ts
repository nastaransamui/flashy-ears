import Roles, { IRole } from '@/models/Roles';
import Users, { IUser } from '@/models/Users';
import mongoose, { Model } from 'mongoose';
import Videos, { IVideo } from '@/models/Videos';
import Photos, { IPhoto } from '@/models/Photos';
import Features, { IFeature } from '@/models/Features';
import Countries, { ICountry } from '@/models/Countries';
import Currencies, { ICurrency } from '@/models/Currencies';
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
  array = array.sort(
    firstBy('isActive', 'desc').thenBy(sortByField, {
      ignoreCase: true,
      direction: sortDirection,
    })
  );
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

export async function findCurrencyById(_id: string) {
  let currency = await Currencies.findById(_id);
  return currency;
}

export async function findAllUsersWithPagginate(
  collection: Model<IUser>,
  perPage: number,
  pageNumber: number,
  sortByField: string,
  sortDirection: 1 | -1
) {
  const dispalyFields = [
    'userName',
    'firstName',
    'lastName',
    'cityName',
    'roleName',
    'provinceName',
    'countryName',
    'position',
    'aboutMe',
    'createdAt',
    'updatedAt',
    'isAdmin',
  ];

  const icon = {
    ...Object.fromEntries(
      dispalyFields.map((key) => {
        return [
          key,
          {
            icon:
              key == 'userName'
                ? 'EmailIcon'
                : key == 'firstName' || key == 'lastName'
                ? 'BadgeIcon'
                : key == 'cityName' || key == 'provinceName'
                ? 'LocationCityIcon'
                : key == 'countryName'
                ? 'FlagIcon'
                : key == 'roleName'
                ? 'DisplaySettingsIcon'
                : key == 'position'
                ? 'Public'
                : key == 'createdAt' || key == 'updatedAt'
                ? 'EventIcon'
                : key == 'aboutMe'
                ? 'InfoIcon'
                : 'People',
          },
        ];
      })
    ),
  };
  const muiDataObj = {
    ...Object.fromEntries(
      dispalyFields.map((key) => [
        key,
        {
          type: key !== 'isAdmin' ? 'string' : 'boolean',
          thumbnail: key !== 'userName' ? '' : 'profileImage',
          filterable: true,
          ...icon[key],
        },
      ])
    ),
  };
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
        dispalyFields: dispalyFields,
        muiData: muiDataObj,
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
  const dispalyFields = [
    'roleName',
    'isActive',
    'remark',
    'createdAt',
    'updatedAt',
    'routes',
  ];

  const icon = {
    ...Object.fromEntries(
      dispalyFields.map((key) => {
        return [
          key,
          {
            icon:
              key == 'roleName'
                ? 'HomeWork'
                : key == 'remark'
                ? 'People'
                : key == 'createdAt' || key == 'updatedAt'
                ? 'EventIcon'
                : key == 'routes'
                ? 'InfoIcon'
                : 'People',
          },
        ];
      })
    ),
  };

  const muiDataObj = {
    ...Object.fromEntries(
      dispalyFields.map((key) => [
        key,
        {
          type:
            key == 'isActive'
              ? 'boolean'
              : key == 'routes'
              ? 'number'
              : 'string',
          thumbnail: key !== 'roleName' ? '' : 'icon',
          filterable: true,
          ...icon[key],
        },
      ])
    ),
  };

  const dataValue = await collection.aggregate([
    {
      $sort: { [sortByField]: sortDirection },
    },
    {
      $addFields: {
        dispalyFields: dispalyFields,
        muiData: muiDataObj,
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
  const dispalyFields = [
    'title_en',
    'isActive',
    'isYoutube',
    'title_fa',
    'createdAt',
    'updatedAt',
    'topTitle_en',
    'topTitle_fa',
    'subTitle_en',
    'subTitle_fa',
    'button_en',
    'button_fa',
    'youTubeId',
  ];
  const icon = {
    ...Object.fromEntries(
      dispalyFields.map((key) => {
        return [
          key,
          {
            icon:
              key == 'isActive'
                ? 'CheckBoxIcon'
                : key == 'isYoutube'
                ? 'CheckBoxOutlineBlank'
                : key == 'createdAt' || key == 'updatedAt'
                ? 'EventIcon'
                : key == 'title_en' || key == 'title_fa'
                ? 'InfoIcon'
                : key == 'button_en' || key == 'button_fa'
                ? 'FlagIcon'
                : 'TitleIcon',
          },
        ];
      })
    ),
  };

  const muiDataObj = {
    ...Object.fromEntries(
      dispalyFields.map((key) => [
        key,
        {
          type: key == 'isActive' || key == 'isYoutube' ? 'boolean' : 'string',
          thumbnail:
            key == 'youTubeId'
              ? 'youTubeId'
              : key !== 'title_en'
              ? ''
              : 'videoLink',
          filterable: true,
          ...icon[key],
        },
      ])
    ),
  };

  const dataValue = await collection.aggregate([
    {
      $sort: { [sortByField]: sortDirection },
    },
    {
      $addFields: {
        dispalyFields: dispalyFields,
        muiData: muiDataObj,
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
  const dispalyFields = [
    'title_en',
    'isActive',
    'title_fa',
    'topTitle_en',
    'topTitle_fa',
    'subTitle_en',
    'subTitle_fa',
    'button_en',
    'button_fa',
    'createdAt',
    'updatedAt',
  ];
  const icon = {
    ...Object.fromEntries(
      dispalyFields.map((key) => {
        return [
          key,
          {
            icon:
              key == 'isActive'
                ? 'CheckBoxIcon'
                : key == 'createdAt' || key == 'updatedAt'
                ? 'EventIcon'
                : key == 'title_en' || key == 'title_fa'
                ? 'InfoIcon'
                : key == 'button_en' || key == 'button_fa'
                ? 'FlagIcon'
                : 'TitleIcon',
          },
        ];
      })
    ),
  };

  const muiDataObj = {
    ...Object.fromEntries(
      dispalyFields.map((key) => [
        key,
        {
          type: key == 'isActive' ? 'boolean' : 'string',
          thumbnail: key !== 'title_en' ? '' : 'imageShow',
          filterable: true,
          ...icon[key],
        },
      ])
    ),
  };

  const dataValue = await collection.aggregate([
    {
      $sort: { [sortByField]: sortDirection },
    },
    {
      $addFields: {
        dispalyFields: dispalyFields,
        muiData: muiDataObj,
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
  const dispalyFields = [
    'title_en',
    'title_fa',
    'isActive',
    'isYoutube',
    'createdAt',
    'updatedAt',
    'youTubeId',
  ];
  const icon = {
    ...Object.fromEntries(
      dispalyFields.map((key) => {
        return [
          key,
          {
            icon:
              key == 'isActive'
                ? 'CheckBoxIcon'
                : key == 'isYoutube'
                ? 'CheckBoxOutlineBlank'
                : key == 'createdAt' || key == 'updatedAt'
                ? 'EventIcon'
                : key == 'title_en' || key == 'title_fa'
                ? 'InfoIcon'
                : 'TitleIcon',
          },
        ];
      })
    ),
  };

  const muiDataObj = {
    ...Object.fromEntries(
      dispalyFields.map((key) => [
        key,
        {
          type: key == 'isActive' || key == 'isYoutube' ? 'boolean' : 'string',
          thumbnail:
            key == 'youTubeId'
              ? 'youTubeId'
              : key !== 'title_en'
              ? ''
              : 'videoLink',
          filterable: true,
          ...icon[key],
        },
      ])
    ),
  };

  const dataValue = await collection.aggregate([
    {
      $sort: { [sortByField]: sortDirection },
    },
    {
      $addFields: {
        dispalyFields: dispalyFields,
        muiData: muiDataObj,
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
  const dispalyFields = [
    'name',
    'isActive',
    'isHotelsActive',
    'iso3',
    'iso2',
    'capital',
    'currency',
    'native',
    'numeric_code',
    'totalUsers',
    'totalAgents',
    'totalSuppliers',
    'totalActiveHotels',
    'totalStates',
    'totalCities',
    'phone_code',
    'region',
    'subregion',
    'timezones',
    'tld',
    'latitude',
    'longitude',
    'currency_name',
    'currency_symbol',
  ];
  const icon = {
    ...Object.fromEntries(
      dispalyFields.map((key) => {
        return [
          key,
          {
            icon:
              key == 'isActive' || key == 'isHotelsActive'
                ? 'CheckBoxIcon'
                : key == 'capital'
                ? 'LocationCityIcon'
                : key == 'currency' ||
                  key == 'currency_name' ||
                  key == 'currency_name'
                ? 'CurrencyExchangeIcon'
                : key == 'totalActiveHotels'
                ? 'HotelIcon'
                : key == 'totalUsers'
                ? 'BadgeIcon'
                : key == 'totalAgents' || key == 'totalSuppliers'
                ? 'AccountBoxIcon'
                : key == 'tld'
                ? 'DnsIcon'
                : key == 'region' || key == 'subregion'
                ? 'SouthAmericaIcon'
                : key == 'latitude' || key == 'longitude'
                ? 'FmdGoodIcon'
                : key == 'phone_code'
                ? 'LocalPhoneIcon'
                : key == 'timezones'
                ? 'TimelapseIcon'
                : key == 'name' ||
                  key == 'iso3' ||
                  key == 'iso2' ||
                  key == 'numeric_code'
                ? 'InfoIcon'
                : 'TitleIcon',
          },
        ];
      })
    ),
  };

  const muiDataObj = {
    ...Object.fromEntries(
      dispalyFields.map((key) => [
        key,
        {
          type:
            key == 'isHotelsActive' || key == 'isActive'
              ? 'boolean'
              : key == 'totalUsers' ||
                key == 'totalAgents' ||
                key == 'totalSuppliers' ||
                key == 'totalHotels' ||
                key == 'totalStates' ||
                key == 'totalCities'
              ? 'number'
              : 'string',
          thumbnail: key !== 'name' ? '' : 'iso2',
          width:
            key == 'name' ||
            key == 'capital' ||
            key == 'native' ||
            key == 'currency_name' ||
            key == 'totalSuppliers'
              ? undefined
              : 150,
          align:
            key == 'name' ||
            key == 'capital' ||
            key == 'native' ||
            key == 'currency_name'
              ? undefined
              : 'center',
          filterable: true,
          ...icon[key],
        },
      ])
    ),
  };
  var match = activeOnly ? { isActive: true } : {};

  const dataValue = await collection.aggregate([
    { $match: match },
    {
      $sort: { isActive: -1, [sortByField]: sortDirection },
    },
    {
      $addFields: {
        dispalyFields: dispalyFields,
        muiData: muiDataObj,
        totalStates: { $size: '$states_id' },
        totalActiveHotels: { $size: '$hotels_id' },
        totalUsers: { $size: '$users_id' },
        totalAgents: { $size: '$agents_id' },
        totalSuppliers: { $size: '$suppliers_id' },
        totalCities: { $size: '$cities_id' },
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

export async function findAllCurrenciesWithPagginate(
  collection: Model<ICurrency>,
  perPage: number,
  pageNumber: number,
  sortByField: string,
  sortDirection: 1 | -1,
  activeOnly: boolean
) {
  const dispalyFields = [
    'name',
    'isActive',
    'iso3',
    'iso2',
    'totalAgents',
    'totalSuppliers',
    'numeric_code',
    'currency',
    'currency_name',
    'currency_symbol',
  ];
  const icon = {
    ...Object.fromEntries(
      dispalyFields.map((key) => {
        return [
          key,
          {
            icon:
              key == 'isActive'
                ? 'CheckBoxIcon'
                : key == 'currency' ||
                  key == 'currency_name' ||
                  key == 'currency_name'
                ? 'CurrencyExchangeIcon'
                : key == 'totalAgents' || 'totalSuppliers'
                ? 'AccountBoxIcon'
                : key == 'name' ||
                  key == 'iso3' ||
                  key == 'iso2' ||
                  key == 'numeric_code'
                ? 'InfoIcon'
                : 'TitleIcon',
          },
        ];
      })
    ),
  };

  const muiDataObj = {
    ...Object.fromEntries(
      dispalyFields.map((key) => [
        key,
        {
          type:
            key == 'isActive'
              ? 'boolean'
              : key == 'totalSuppliers' || key == 'totalAgents'
              ? 'number'
              : 'string',
          thumbnail: key !== 'name' ? '' : 'iso2',
          width:
            key == 'name' || key == 'currency_name' || key == 'totalSuppliers'
              ? undefined
              : 150,
          align: key == 'name' || key == 'currency_name' ? undefined : 'center',
          filterable: true,
          ...icon[key],
        },
      ])
    ),
  };

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
        dispalyFields: dispalyFields,
        muiData: muiDataObj,
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
  const dispalyFields = [
    'userName',
    'firstName',
    'lastName',
    'cityName',
    'roleName',
    'provinceName',
    'countryName',
    'position',
    'aboutMe',
    'createdAt',
    'updatedAt',
    'isAdmin',
  ];

  const icon = {
    ...Object.fromEntries(
      dispalyFields.map((key) => {
        return [
          key,
          {
            icon:
              key == 'userName'
                ? 'EmailIcon'
                : key == 'firstName' || key == 'lastName'
                ? 'BadgeIcon'
                : key == 'cityName' || key == 'provinceName'
                ? 'LocationCityIcon'
                : key == 'countryName'
                ? 'FlagIcon'
                : key == 'roleName'
                ? 'DisplaySettingsIcon'
                : key == 'position'
                ? 'Public'
                : key == 'createdAt' || key == 'updatedAt'
                ? 'EventIcon'
                : key == 'aboutMe'
                ? 'InfoIcon'
                : 'People',
          },
        ];
      })
    ),
  };
  const muiDataObj = {
    ...Object.fromEntries(
      dispalyFields.map((key) => [
        key,
        {
          type: key !== 'isAdmin' ? 'string' : 'boolean',
          thumbnail: key !== 'userName' ? '' : 'profileImage',
          filterable: true,
          ...icon[key],
        },
      ])
    ),
  };

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
        dispalyFields: dispalyFields,
        muiData: muiDataObj,
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
  const dispalyFields = [
    'roleName',
    'isActive',
    'remark',
    'createdAt',
    'updatedAt',
    'routes',
  ];

  const icon = {
    ...Object.fromEntries(
      dispalyFields.map((key) => {
        return [
          key,
          {
            icon:
              key == 'roleName'
                ? 'HomeWork'
                : key == 'remark'
                ? 'People'
                : key == 'createdAt' || key == 'updatedAt'
                ? 'EventIcon'
                : key == 'routes'
                ? 'InfoIcon'
                : 'People',
          },
        ];
      })
    ),
  };

  const muiDataObj = {
    ...Object.fromEntries(
      dispalyFields.map((key) => [
        key,
        {
          type:
            key == 'isActive'
              ? 'boolean'
              : key == 'routes'
              ? 'number'
              : 'string',
          thumbnail: key !== 'roleName' ? '' : 'icon',
          filterable: true,
          ...icon[key],
        },
      ])
    ),
  };
  const dataValue = await collection.aggregate([
    {
      $sort: { [sortByField]: sortDirection },
    },
    {
      $addFields: {
        dispalyFields: dispalyFields,
        muiData: muiDataObj,
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
  const dispalyFields = [
    'title_en',
    'isActive',
    'isYoutube',
    'title_fa',
    'createdAt',
    'updatedAt',
    'topTitle_en',
    'topTitle_fa',
    'subTitle_en',
    'subTitle_fa',
    'button_en',
    'button_fa',
    'youTubeId',
  ];
  const icon = {
    ...Object.fromEntries(
      dispalyFields.map((key) => {
        return [
          key,
          {
            icon:
              key == 'isActive'
                ? 'CheckBoxIcon'
                : key == 'isYoutube'
                ? 'CheckBoxOutlineBlank'
                : key == 'createdAt' || key == 'updatedAt'
                ? 'EventIcon'
                : key == 'title_en' || key == 'title_fa'
                ? 'InfoIcon'
                : key == 'button_en' || key == 'button_fa'
                ? 'FlagIcon'
                : 'TitleIcon',
          },
        ];
      })
    ),
  };

  const muiDataObj = {
    ...Object.fromEntries(
      dispalyFields.map((key) => [
        key,
        {
          type: key == 'isActive' || key == 'isYoutube' ? 'boolean' : 'string',
          thumbnail:
            key == 'youTubeId'
              ? 'youTubeId'
              : key !== 'title_en'
              ? ''
              : 'videoLink',
          filterable: true,
          ...icon[key],
        },
      ])
    ),
  };

  const dataValue = await collection.aggregate([
    {
      $sort: { [sortByField]: sortDirection },
    },
    {
      $addFields: {
        dispalyFields: dispalyFields,
        muiData: muiDataObj,
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
  const dispalyFields = [
    'title_en',
    'isActive',
    'title_fa',
    'topTitle_en',
    'topTitle_fa',
    'subTitle_en',
    'subTitle_fa',
    'button_en',
    'button_fa',
    'createdAt',
    'updatedAt',
  ];
  const icon = {
    ...Object.fromEntries(
      dispalyFields.map((key) => {
        return [
          key,
          {
            icon:
              key == 'isActive'
                ? 'CheckBoxIcon'
                : key == 'createdAt' || key == 'updatedAt'
                ? 'EventIcon'
                : key == 'title_en' || key == 'title_fa'
                ? 'InfoIcon'
                : key == 'button_en' || key == 'button_fa'
                ? 'FlagIcon'
                : 'TitleIcon',
          },
        ];
      })
    ),
  };

  const muiDataObj = {
    ...Object.fromEntries(
      dispalyFields.map((key) => [
        key,
        {
          type: key == 'isActive' ? 'boolean' : 'string',
          thumbnail: key !== 'title_en' ? '' : 'imageShow',
          filterable: true,
          ...icon[key],
        },
      ])
    ),
  };
  const dataValue = await collection.aggregate([
    {
      $sort: { [sortByField]: sortDirection },
    },
    {
      $addFields: {
        dispalyFields: dispalyFields,
        muiData: muiDataObj,
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
  const dispalyFields = [
    'title_en',
    'title_fa',
    'isActive',
    'isYoutube',
    'createdAt',
    'updatedAt',
    'youTubeId',
  ];
  const icon = {
    ...Object.fromEntries(
      dispalyFields.map((key) => {
        return [
          key,
          {
            icon:
              key == 'isActive'
                ? 'CheckBoxIcon'
                : key == 'isYoutube'
                ? 'CheckBoxOutlineBlank'
                : key == 'createdAt' || key == 'updatedAt'
                ? 'EventIcon'
                : key == 'title_en' || key == 'title_fa'
                ? 'InfoIcon'
                : 'TitleIcon',
          },
        ];
      })
    ),
  };

  const muiDataObj = {
    ...Object.fromEntries(
      dispalyFields.map((key) => [
        key,
        {
          type: key == 'isActive' || key == 'isYoutube' ? 'boolean' : 'string',
          thumbnail:
            key == 'youTubeId'
              ? 'youTubeId'
              : key !== 'title_en'
              ? ''
              : 'videoLink',
          filterable: true,
          ...icon[key],
        },
      ])
    ),
  };
  const dataValue = await collection.aggregate([
    {
      $sort: { [sortByField]: sortDirection },
    },
    {
      $addFields: {
        dispalyFields: dispalyFields,
        muiData: muiDataObj,
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
  multiMap: MultiMap<MultiMapKey, MultiMapValue>
) {
  var collection = mongoose.model(modelName);

  const dispalyFields = [
    'name',
    'isActive',
    'isHotelsActive',
    'iso3',
    'iso2',
    'capital',
    'currency',
    'native',
    'numeric_code',
    'totalUsers',
    'totalAgents',
    'totalSuppliers',
    'totalActiveHotels',
    'totalStates',
    'totalCities',
    'phone_code',
    'region',
    'subregion',
    'timezones',
    'tld',
    'latitude',
    'longitude',
    'currency_name',
    'currency_symbol',
  ];
  const icon = {
    ...Object.fromEntries(
      dispalyFields.map((key) => {
        return [
          key,
          {
            icon:
              key == 'isActive' || key == 'isHotelsActive'
                ? 'CheckBoxIcon'
                : key == 'capital'
                ? 'LocationCityIcon'
                : key == 'currency' ||
                  key == 'currency_name' ||
                  key == 'currency_name'
                ? 'CurrencyExchangeIcon'
                : key == 'totalActiveHotels'
                ? 'HotelIcon'
                : key == 'totalUsers'
                ? 'BadgeIcon'
                : key == 'totalAgents' || key == 'totalSuppliers'
                ? 'AccountBoxIcon'
                : key == 'tld'
                ? 'DnsIcon'
                : key == 'region' || key == 'subregion'
                ? 'SouthAmericaIcon'
                : key == 'latitude' || key == 'longitude'
                ? 'FmdGoodIcon'
                : key == 'phone_code'
                ? 'LocalPhoneIcon'
                : key == 'timezones'
                ? 'TimelapseIcon'
                : key == 'name' ||
                  key == 'iso3' ||
                  key == 'iso2' ||
                  key == 'numeric_code'
                ? 'InfoIcon'
                : 'TitleIcon',
          },
        ];
      })
    ),
  };

  const muiDataObj = {
    ...Object.fromEntries(
      dispalyFields.map((key) => [
        key,
        {
          type:
            key == 'isHotelsActive' || key == 'isActive'
              ? 'boolean'
              : key == 'totalUsers' ||
                key == 'totalAgents' ||
                key == 'totalSuppliers' ||
                key == 'totalHotels' ||
                key == 'totalStates' ||
                key == 'totalCities'
              ? 'number'
              : 'string',
          thumbnail: key !== 'name' ? '' : 'iso2',
          width:
            key == 'name' ||
            key == 'capital' ||
            key == 'native' ||
            key == 'currency_name' ||
            key == 'totalSuppliers'
              ? undefined
              : 150,
          align:
            key == 'name' ||
            key == 'capital' ||
            key == 'native' ||
            key == 'currency_name'
              ? undefined
              : 'center',
          filterable: true,
          ...icon[key],
        },
      ])
    ),
  };

  const dataValue = await collection.aggregate([
    {
      $sort: { isActive: -1, [sortByField]: sortDirection },
    },
    {
      $addFields: {
        dispalyFields: dispalyFields,
        muiData: muiDataObj,
        totalStates: { $size: '$states_id' },
        totalActiveHotels: { $size: '$hotels_id' },
        totalUsers: { $size: '$users_id' },
        totalAgents: { $size: '$agents_id' },
        totalSuppliers: { $size: '$suppliers_id' },
        totalCities: { $size: '$cities_id' },
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

export async function findAllCurrencies(
  modelName: string,
  sortByField: string,
  perPage: number,
  pageNumber: number,
  sortDirection: 1 | -1,
  multiMap: MultiMap<MultiMapKey, MultiMapValue>
) {
  var collection = mongoose.model(modelName);

  const dispalyFields = [
    'name',
    'isActive',
    'iso3',
    'iso2',
    'totalAgents',
    'totalSuppliers',
    'numeric_code',
    'currency',
    'currency_name',
    'currency_symbol',
  ];
  const icon = {
    ...Object.fromEntries(
      dispalyFields.map((key) => {
        return [
          key,
          {
            icon:
              key == 'isActive'
                ? 'CheckBoxIcon'
                : key == 'currency' ||
                  key == 'currency_name' ||
                  key == 'currency_name'
                ? 'CurrencyExchangeIcon'
                : key == 'totalAgents' || 'totalSuppliers'
                ? 'AccountBoxIcon'
                : key == 'name' ||
                  key == 'iso3' ||
                  key == 'iso2' ||
                  key == 'numeric_code'
                ? 'InfoIcon'
                : 'TitleIcon',
          },
        ];
      })
    ),
  };

  const muiDataObj = {
    ...Object.fromEntries(
      dispalyFields.map((key) => [
        key,
        {
          type:
            key == 'isActive'
              ? 'boolean'
              : key == 'totalSuppliers' || key == 'totalAgents'
              ? 'number'
              : 'string',
          thumbnail: key !== 'name' ? '' : 'iso2',
          width:
            key == 'name' || key == 'currency_name' || key == 'totalSuppliers'
              ? undefined
              : 150,
          align: key == 'name' || key == 'currency_name' ? undefined : 'center',
          filterable: true,
          ...icon[key],
        },
      ])
    ),
  };

  const dataValue = await collection.aggregate([
    {
      $sort: { isActive: -1, [sortByField]: sortDirection },
    },
    {
      $addFields: {
        dispalyFields: dispalyFields,
        muiData: muiDataObj,
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
        dispalyFields: dispalyFields,
        muiData: muiDataObj,
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
