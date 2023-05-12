import mongoose, { Model } from 'mongoose';
import Users, {
  dispalyFields as usersDisplayField,
  muiDataObj as usersMuiDataObj,
} from '@/models/Users';
import Roles, {
  dispalyFields as rolesDisplayField,
  muiDataObj as rolesMuiDataObj,
} from '@/models/Roles';
import Collections, {
  dispalyFields as collectionsDisplayField,
  muiDataObj as collectionsMuiDataObj,
} from 'homeModels/Collections';

import Colors, {
  dispalyFields as colorsDisplayField,
  muiDataObj as colorsMuiDataObj,
} from 'homeModels/Colors';
import Photos, {
  dispalyFields as photosDisplayField,
  muiDataObj as photosMuiDataObj,
} from '@/models/Photos';
import Features, {
  dispalyFields as featuresDisplayField,
  muiDataObj as featuresMuiDataObj,
} from '@/models/Features';
import Countries, {
  dispalyFields as countriesDisplayField,
  muiDataObj as countriesMuiDataObj,
} from '@/models/Countries';
import Provinces, {
  dispalyFields as provincesDisplayField,
  muiDataObj as provincesMuiDataObj,
} from '@/models/Provinces';
import Cities, {
  dispalyFields as citiesDisplayField,
  muiDataObj as citiesMuiDataObj,
} from '@/models/Cities';
import Currencies, {
  dispalyFields as currenciesDisplayField,
  muiDataObj as currenciesMuiDataObj,
} from '@/models/Currencies';
import Agencies, {
  dispalyFields as agenciesDisplayField,
  muiDataObj as agenciesMuiDataObj,
  PhoneAgentType,
} from '@/models/Agencies';
import type { MultiMap } from 'hazelcast-client/lib/proxy/MultiMap';

type Results = {
  data: object[];
};

export function escapeRegExp(value: string) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export async function searchUsers(searchRegex: RegExp, fieldValue: string) {
  const valuesList = await Users.aggregate([
    { $match: { [fieldValue]: searchRegex } },
    { $sort: { userName: 1 } },
    {
      $addFields: {
        dispalyFields: usersDisplayField,
        muiData: usersMuiDataObj,
        autoCompleteImg: {
          $cond: {
            if: {
              $eq: [{ $ifNull: ['$profileImage', ''] }, ''],
            },
            then: '/admin/images/faces/avatar1.jpg',
            else: '$profileImage',
          },
        },
        autoCompleteIcon: '',
        autoCompleteSubLabel: {
          $cond: {
            if: {
              $eq: [{ fieldValue: 'userName' }, ''],
            },
            then: '',
            else: '$userName',
          },
        },
        autoCompleteMainLabel: {
          $concat: [{ $toString: { $getField: `${fieldValue}` } }],
        },
      },
    },
    { $limit: 50 },
    { $unset: 'password' },
  ]);
  const result = {
    data: valuesList,
  };
  return result;
}

export async function searchRoles(searchRegex: RegExp, fieldValue: string) {
  const valuesList = await Roles.aggregate([
    { $match: { [fieldValue]: searchRegex } },
    { $sort: { roleName: 1 } },
    {
      $addFields: {
        dispalyFields: rolesDisplayField,
        muiData: rolesMuiDataObj,
        autoCompleteImg: '',
        autoCompleteIcon: {
          $cond: {
            if: {
              $eq: [{ $ifNull: ['$icon', ''] }, ''],
            },
            then: 'M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3z',
            else: '$icon',
          },
        },
        autoCompleteSubLabel: {
          $cond: {
            if: {
              $eq: [{ fieldValue: 'roleName' }, ''],
            },
            then: '',
            else: '$roleName',
          },
        },
        autoCompleteMainLabel: {
          $concat: [{ $toString: { $getField: `${fieldValue}` } }],
        },
      },
    },
    { $limit: 50 },
  ]);
  const result = {
    data: valuesList,
  };
  return result;
}

export async function searchCollections(
  searchRegex: RegExp,
  fieldValue: string
) {
  const valuesList = await Collections.aggregate([
    { $match: { [fieldValue]: searchRegex } },
    { $sort: { title_en: 1 } },
    {
      $addFields: {
        dispalyFields: collectionsDisplayField,
        muiData: collectionsMuiDataObj,
        autoCompleteImg: {
          $cond: {
            if: {
              $eq: [{ $ifNull: ['$img_light', ''] }, ''],
            },
            then: '/admin/images/faces/movie.jpg',
            else: '$img_light.src',
          },
        },
        autoCompleteIcon: '',
        autoCompleteSubLabel: {
          $cond: {
            if: {
              $eq: [{ fieldValue: 'title_en' }, ''],
            },
            then: '',
            else: '$title_en',
          },
        },
        autoCompleteMainLabel: {
          $concat: [{ $toString: { $getField: `${fieldValue}` } }],
        },
      },
    },
    { $limit: 50 },
  ]);
  const result = {
    data: valuesList,
  };
  return result;
}

export async function searchColors(searchRegex: RegExp, fieldValue: string) {
  const valuesList = await Colors.aggregate([
    { $match: { [fieldValue]: searchRegex } },
    { $sort: { title_en: 1 } },
    {
      $addFields: {
        dispalyFields: colorsDisplayField,
        muiData: colorsMuiDataObj,
        autoCompleteImg: '',
        autoCompleteIcon: {
          $cond: {
            if: {
              $eq: [{ $ifNull: ['$icon', ''] }, ''],
            },
            then: 'M17.66 8 12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14H6z',
            else: '$icon',
          },
        },
        autoCompleteSubLabel: {
          $cond: {
            if: {
              $eq: [{ fieldValue: 'label_en' }, ''],
            },
            then: '',
            else: '$label_en',
          },
        },
        autoCompleteMainLabel: {
          $concat: [{ $toString: { $getField: `${fieldValue}` } }],
        },
      },
    },
    { $limit: 50 },
  ]);
  const result = {
    data: valuesList,
  };
  return result;
}

export async function searchPhotos(searchRegex: RegExp, fieldValue: string) {
  const valuesList = await Photos.aggregate([
    { $match: { [fieldValue]: searchRegex } },
    { $sort: { title_en: 1 } },
    {
      $addFields: {
        dispalyFields: photosDisplayField,
        muiData: photosMuiDataObj,
        autoCompleteImg: {
          $cond: {
            if: {
              $eq: [{ $ifNull: ['$imageShow', ''] }, ''],
            },
            then: '/admin/images/faces/movie.jpg',
            else: '$imageShow',
          },
        },
        autoCompleteIcon: '',
        autoCompleteSubLabel: {
          $cond: {
            if: {
              $eq: [{ fieldValue: 'title_en' }, ''],
            },
            then: '',
            else: '$title_en',
          },
        },
        autoCompleteMainLabel: {
          $concat: [{ $toString: { $getField: `${fieldValue}` } }],
        },
      },
    },
    { $limit: 50 },
  ]);
  const result = {
    data: valuesList,
  };
  return result;
}

export async function searchFeatures(searchRegex: RegExp, fieldValue: string) {
  const valuesList = await Features.aggregate([
    { $match: { [fieldValue]: searchRegex } },
    { $sort: { title_en: 1 } },
    {
      $addFields: {
        dispalyFields: featuresDisplayField,
        muiData: featuresMuiDataObj,
        autoCompleteImg: {
          $cond: {
            if: {
              $eq: [{ $ifNull: ['$imageShow', ''] }, ''],
            },
            then: '/admin/images/faces/movie.jpg',
            else: '$imageShow',
          },
        },
        autoCompleteIcon: '',
        autoCompleteSubLabel: {
          $cond: {
            if: {
              $eq: [{ fieldValue: 'title_en' }, ''],
            },
            then: '',
            else: '$title_en',
          },
        },
        autoCompleteMainLabel: {
          $concat: [{ $toString: { $getField: `${fieldValue}` } }],
        },
      },
    },
    { $limit: 50 },
  ]);
  const result = {
    data: valuesList,
  };
  return result;
}

export async function searchAllCountries(
  searchRegex: RegExp,
  fieldValue: string,
  activeOnly: boolean
) {
  const match = activeOnly
    ? { $match: { isActive: true, [fieldValue]: searchRegex } }
    : { $match: { [fieldValue]: searchRegex } };
  const valuesList = await Countries.aggregate([
    { ...match },
    { $sort: { name: 1 } },
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
        autoCompleteImg: {
          $concat: ['/admin/flags/128x128/', '$iso2', '.png'],
        },
        autoCompleteIcon: '',
        autoCompleteSubLabel: {
          $cond: {
            if: {
              $eq: [{ fieldValue: 'name' }, ''],
            },
            then: '',
            else: '$name',
          },
        },
        autoCompleteMainLabel: {
          $concat: [{ $toString: { $getField: `${fieldValue}` } }],
        },
      },
    },
    { $limit: 50 },
  ]);
  const result = {
    data: valuesList,
  };
  return result;
}

export async function searchAllProvince(
  searchRegex: RegExp,
  fieldValue: string
) {
  const valuesList = await Provinces.aggregate([
    { $match: { isActive: true, [fieldValue]: searchRegex } },
    { $sort: { name: 1 } },
    {
      $addFields: {
        dispalyFields: provincesDisplayField,
        muiData: provincesMuiDataObj,
        totalCities: { $size: '$cities_id' },
        totalActiveHotels: { $size: '$hotels_id' },
        totalUsers: { $size: '$users_id' },
        totalAgents: { $size: '$agents_id' },
        totalSuppliers: { $size: '$suppliers_id' },
        autoCompleteImg: {
          $concat: ['/admin/flags/128x128/', '$iso2', '.png'],
        },
        autoCompleteIcon: '',
        autoCompleteSubLabel: {
          $cond: {
            if: {
              $eq: [{ fieldValue: 'country_name' }, ''],
            },
            then: '',
            else: '$country_name',
          },
        },
        autoCompleteMainLabel: {
          $concat: [{ $toString: { $getField: `${fieldValue}` } }],
        },
      },
    },
    { $limit: 50 },
  ]);
  const result = {
    data: valuesList,
  };
  return result;
}

export async function searchAllCities(searchRegex: RegExp, fieldValue: string) {
  const valuesList = await Cities.aggregate([
    { $match: { isActive: true, [fieldValue]: searchRegex } },
    { $sort: { name: 1 } },
    {
      $addFields: {
        dispalyFields: citiesDisplayField,
        muiData: citiesMuiDataObj,
        totalActiveHotels: { $size: '$hotels_id' },
        totalUsers: { $size: '$users_id' },
        totalAgents: { $size: '$agents_id' },
        totalSuppliers: { $size: '$suppliers_id' },
        autoCompleteImg: {
          $concat: ['/admin/flags/128x128/', '$iso2', '.png'],
        },
        autoCompleteIcon: '',
        autoCompleteSubLabel: {
          $cond: {
            if: {
              $eq: [
                { fieldValue: 'country_name' },
                { $concat: ['$name', '-', '$state_name'] },
              ],
            },
            then: '',
            else: { $concat: ['$country_name', '-', '$state_name'] },
          },
        },
        autoCompleteMainLabel: {
          $concat: [{ $toString: { $getField: `${fieldValue}` } }],
        },
      },
    },
    { $limit: 50 },
  ]);
  const result = {
    data: valuesList,
  };
  return result;
}

export async function searchAllCurrencies(
  searchRegex: RegExp,
  fieldValue: string,
  activeOnly: boolean
) {
  const match = activeOnly
    ? { $match: { isActive: true, [fieldValue]: searchRegex } }
    : { $match: { [fieldValue]: searchRegex } };
  const valuesList = await Currencies.aggregate([
    { ...match },
    { $sort: { name: 1 } },
    {
      $addFields: {
        dispalyFields: currenciesDisplayField,
        muiData: currenciesMuiDataObj,
        totalAgents: { $size: '$agents_id' },
        totalSuppliers: { $size: '$suppliers_id' },
        autoCompleteImg: {
          $concat: ['/admin/flags/128x128/', '$iso2', '.png'],
        },
        autoCompleteIcon: '',
        autoCompleteSubLabel: {
          $cond: {
            if: {
              $eq: [{ fieldValue: 'name' }, ''],
            },
            then: '',
            else: '$name',
          },
        },
        autoCompleteMainLabel: {
          $concat: [{ $toString: { $getField: `${fieldValue}` } }],
        },
      },
    },
    { $limit: 50 },
  ]);
  const result = {
    data: valuesList,
  };
  return result;
}

export async function searchAgencies(filterValue: string, fieldValue: string) {
  try {
    //Initiate Regex
    let searchRegex: RegExp = new RegExp(escapeRegExp(filterValue), 'i');
    let result: Results = { data: [] };
    switch (fieldValue) {
      case 'creditAmount':
      case 'depositAmount':
      case 'remainCreditAmount':
      case 'remainDepositAmount':
        const valuesList = await Agencies.aggregate([
          { $sort: { agentName: 1 } },
          {
            $addFields: {
              //Add muis and image
              dispalyFields: agenciesDisplayField,
              muiData: agenciesMuiDataObj,
              autoCompleteImg: {
                $cond: {
                  if: {
                    $eq: [{ $ifNull: ['$logoImage', ''] }, ''],
                  },
                  then: '/admin/images/faces/Customer.png',
                  else: '$logoImage',
                },
              },
              autoCompleteIcon: '',
              //Sublabel add base on fieldValue
              autoCompleteSubLabel: {
                $cond: {
                  if: {
                    $eq: [{ fieldValue: 'agentName' }, ''],
                  },
                  then: '',
                  else: '$agentName',
                },
              },
              //Mainlabel add base on fieldValue
              autoCompleteMainLabel: {
                $concat: [{ $toString: { $getField: `${fieldValue}` } }],
              },
              //Convert number to string to search via regex
              [`${`converted${fieldValue}`}`]: {
                $toString: `$${fieldValue}`,
              },
            },
          },
          {
            $match: {
              [`${`converted${fieldValue}`}`]: searchRegex,
            },
          },
          { $limit: 50 },
          // Unset converted field
          {
            $unset: `converted${fieldValue}`,
          },
        ]);
        //Format number and add currency
        valuesList.map((doc) => {
          doc.autoCompleteMainLabel =
            parseFloat(doc.autoCompleteMainLabel).toLocaleString('en-US') +
            ' - ' +
            doc.currencyCode;
          return doc;
        });
        result = {
          data: valuesList,
        };
        return result;

      case 'phones':
      case 'fax':
        let phoneNumber = filterValue;
        if (phoneNumber.startsWith('+')) {
          phoneNumber = phoneNumber.substring(1).replace(/\s/g, '');
        }
        searchRegex = new RegExp(
          phoneNumber
            .replaceAll('-', '')
            .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'),
          'i'
        );
        const valueList = await Agencies.aggregate([
          { $sort: { agentName: 1 } },
          //Add Mui fields
          {
            $addFields: {
              dispalyFields: agenciesDisplayField,
              muiData: agenciesMuiDataObj,
              autoCompleteImg: {
                $cond: {
                  if: {
                    $eq: [{ $ifNull: ['$logoImage', ''] }, ''],
                  },
                  then: '/admin/images/faces/Customer.png',
                  else: '$logoImage',
                },
              },
              autoCompleteIcon: '',
            },
          },
          //convert all numbers to string to search via regex
          {
            $addFields: {
              [`${`convertedphones`}`]: {
                $reduce: {
                  input: '$phones.number',
                  initialValue: '',
                  in: { $concat: ['$$value', '$$this'] },
                },
              },
            },
          },
          //Replace + sign in string
          {
            $addFields: {
              [`${`convertedphones`}`]: {
                $replaceAll: {
                  input: '$convertedphones',
                  find: '+',
                  replacement: '',
                },
              },
            },
          },
          //Replace ( sign in string
          {
            $addFields: {
              [`convertedphones`]: {
                $replaceAll: {
                  input: '$convertedphones',
                  find: '(',
                  replacement: '',
                },
              },
            },
          },
          //Replace space sign in string
          {
            $addFields: {
              [`convertedphones`]: {
                $replaceAll: {
                  input: '$convertedphones',
                  find: ' ',
                  replacement: '',
                },
              },
            },
          },
          //Replace ) sign in string
          {
            $addFields: {
              [`convertedphones`]: {
                $replaceAll: {
                  input: '$convertedphones',
                  find: ')',
                  replacement: '',
                },
              },
            },
          },
          //Replace - sign in string
          {
            $addFields: {
              [`convertedphones`]: {
                $replaceAll: {
                  input: '$convertedphones',
                  find: '-',
                  replacement: '',
                },
              },
            },
          },
          { $match: { convertedphones: searchRegex } },
          //Add sublabel for autocomplete
          {
            $addFields: {
              autoCompleteSubLabel: '$agentName',
            },
          },
          //Add tag of phone
          { $addFields: { phoneTag: { $first: '$phones.tags' } } },
          { $unwind: '$phoneTag' },
          //Compone field and tags
          {
            $addFields: {
              autoCompleteMainLabel: {
                $reduce: {
                  input: '$phones.number',
                  initialValue: '',
                  in: {
                    $cond: {
                      if: {
                        $eq: [{ $indexOfArray: ['$phones', '$$this'] }, 0],
                      },
                      then: { $concat: ['$$value', '$$this'] },
                      else: {
                        $concat: [
                          '$$value',
                          '$phoneTag',
                          ' : ',
                          '$$this',
                          '<br/>',
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
          { $limit: 50 },
          { $unset: [`convertedphones`, 'phoneTag'] },
        ]);
        result = {
          data: valueList,
        };
        return result;
      default:
        const List = await Agencies.aggregate([
          { $sort: { agentName: 1 } },
          //Add Mui fields
          {
            $addFields: {
              dispalyFields: agenciesDisplayField,
              muiData: agenciesMuiDataObj,
              autoCompleteImg: {
                $cond: {
                  if: {
                    $eq: [{ $ifNull: ['$logoImage', ''] }, ''],
                  },
                  then: '/admin/images/faces/Customer.png',
                  else: '$logoImage',
                },
              },
              autoCompleteIcon: '',
              autoCompleteSubLabel: {
                $cond: {
                  if: {
                    $eq: [{ fieldValue: 'agentName' }, ''],
                  },
                  then: '',
                  else: '$agentName',
                },
              },
              autoCompleteMainLabel: {
                $concat: [{ $toString: { $getField: `${fieldValue}` } }],
              },
            },
          },
          {
            $match: { [fieldValue]: searchRegex },
          },
          { $limit: 50 },
        ]);
        result = {
          data: List,
        };
        return result;
    }
  } catch (error) {
    console.log(error);
    const result = {
      data: [],
    };
    return result;
  }
}

export async function searchModelsHZ(
  filterValue: string,
  fieldValue: string,
  values: any,
  modelName: string,
  activeOnly: boolean
) {
  let result: Results = { data: [] };
  let searchRegex: RegExp = new RegExp(escapeRegExp(filterValue), 'i');
  for (const value of values as any) {
    const filterdData = value.filter((row: any) => {
      if (activeOnly) {
        if (row.isActive) {
          return Object.keys(row).some((field) => {
            if (field == fieldValue) {
              if (row[field] !== null) {
                return searchRegex.test(row[field].toString());
              }
            }
          });
        }
      } else {
        if (fieldValue !== 'phones') {
          return Object.keys(row).some((field) => {
            if (field == fieldValue) {
              if (row[field] !== null) {
                return searchRegex.test(row[field].toString());
              }
            }
          });
        } else {
          let phoneNumber = filterValue;
          if (phoneNumber.startsWith('+')) {
            phoneNumber = phoneNumber.substring(1).replace(/\s/g, '');
          }
          const phoneSearchRegex = new RegExp(
            escapeRegExp(
              phoneNumber
                .substring(1)
                .replaceAll(/\s/g, '')
                .replaceAll('(', '')
                .replaceAll(')', '')
                .replaceAll('-', '')
            ),
            'i'
          );
          return Object.keys(row).some((field) => {
            if (field == fieldValue) {
              if (row[field] !== null) {
                return phoneSearchRegex.test(
                  row[field]
                    .map((a: PhoneAgentType) =>
                      a.number
                        .substring(1)
                        .replaceAll(/\s/g, '')
                        .replaceAll('(', '')
                        .replaceAll(')', '')
                        .replaceAll('-', '')
                    )
                    .toString()
                );
              }
            }
          });
        }
      }
    });
    result = {
      data: updateAutocompFields(filterdData, 50, 1, modelName, fieldValue),
    };
  }
  return result;
}

interface ArrayType {
  profileImage?: string;
  autoCompleteImg?: string;
  autoCompleteIcon?: string;
  autoCompleteSubLabel?: string;
  userName?: string;
  autoCompleteMainLabel?: string;
  icon?: string;
  roleName?: string;
  videoPoster?: string;
  title_en?: string;
  imageShow?: string;
  iso2?: string;
  name?: string;
  country_name?: string;
  state_name?: string;
  currency_name: string;
  currency_symbol: string;
  currency: string;
  logoImage: string;
  agentName: string;
  phones: any;
  currencyCode: string;
}

export function updateAutocompFields(
  array: ArrayType[],
  perPage: number,
  pageNumber: number,
  modelName: string,
  fieldValue: string
) {
  switch (modelName) {
    case 'Users':
      const userRes = array.slice(
        (pageNumber - 1) * perPage,
        pageNumber * perPage
      );
      userRes.map((a: ArrayType) => {
        a.autoCompleteImg =
          a.profileImage == ''
            ? '/admin/images/faces/avatar1.jpg'
            : a.profileImage;
        a.autoCompleteIcon = '';
        a.autoCompleteSubLabel = fieldValue == 'userName' ? '' : a.userName;
        a.autoCompleteMainLabel = a[fieldValue as keyof typeof a];
        return a;
      });
      return userRes;
    case 'Roles':
      const rolesRes = array.slice(
        (pageNumber - 1) * perPage,
        pageNumber * perPage
      );
      rolesRes.map((a: ArrayType) => {
        a.autoCompleteIcon =
          a.icon == ''
            ? 'M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3z'
            : a.icon;
        a.autoCompleteImg = '';
        a.autoCompleteSubLabel = fieldValue == 'roleName' ? '' : a.roleName;
        a.autoCompleteMainLabel = a[fieldValue as keyof typeof a];
        return a;
      });
      return rolesRes;
    case 'Videos':
      const videosRes = array.slice(
        (pageNumber - 1) * perPage,
        pageNumber * perPage
      );
      videosRes.map((a: ArrayType) => {
        a.autoCompleteImg =
          a.videoPoster == '' ? '/admin/images/faces/movie.jpg' : a.videoPoster;
        a.autoCompleteIcon = '';
        a.autoCompleteSubLabel = fieldValue == 'title_en' ? '' : a.title_en;
        a.autoCompleteMainLabel = a[fieldValue as keyof typeof a];
        return a;
      });
      return videosRes;
    case 'Photos':
      const photosRes = array.slice(
        (pageNumber - 1) * perPage,
        pageNumber * perPage
      );
      photosRes.map((a: ArrayType) => {
        a.autoCompleteImg =
          a.imageShow == '' ? '/admin/images/faces/movie.jpg' : a.imageShow;
        a.autoCompleteIcon = '';
        a.autoCompleteSubLabel = fieldValue == 'title_en' ? '' : a.title_en;
        a.autoCompleteMainLabel = a[fieldValue as keyof typeof a];
        return a;
      });
      return photosRes;
    case 'Features':
      const featureRes = array.slice(
        (pageNumber - 1) * perPage,
        pageNumber * perPage
      );
      featureRes.map((a: ArrayType) => {
        a.autoCompleteImg =
          a.imageShow == '' ? '/admin/images/faces/movie.jpg' : a.imageShow;
        a.autoCompleteIcon = '';
        a.autoCompleteSubLabel = fieldValue == 'title_en' ? '' : a.title_en;
        a.autoCompleteMainLabel = a[fieldValue as keyof typeof a];
        return a;
      });
      return featureRes;
    case 'Countries':
      const countriesRes = array.slice(
        (pageNumber - 1) * perPage,
        pageNumber * perPage
      );
      countriesRes.map((a: ArrayType) => {
        a.autoCompleteImg = `/admin/flags/128x128/${a.iso2}.png`;
        a.autoCompleteIcon = '';
        a.autoCompleteSubLabel = fieldValue == 'name' ? '' : a.name;
        a.autoCompleteMainLabel = a[fieldValue as keyof typeof a];
        return a;
      });
      return countriesRes;
    case 'Provinces':
      const provincesRes = array.slice(
        (pageNumber - 1) * perPage,
        pageNumber * perPage
      );
      provincesRes.map((a: ArrayType) => {
        a.autoCompleteImg = `/admin/flags/128x128/${a.iso2}.png`;
        a.autoCompleteIcon = '';
        a.autoCompleteSubLabel =
          fieldValue == 'country_name' ? a.name : a.country_name;
        a.autoCompleteMainLabel = a[fieldValue as keyof typeof a];
        return a;
      });
      return provincesRes;
    case 'Cities':
      const citiesRes = array.slice(
        (pageNumber - 1) * perPage,
        pageNumber * perPage
      );
      citiesRes.map((a: ArrayType) => {
        a.autoCompleteImg = `/admin/flags/128x128/${a.iso2}.png`;
        a.autoCompleteIcon = '';
        a.autoCompleteSubLabel =
          fieldValue == 'country_name'
            ? a.state_name + '-' + a.name
            : a.country_name + '-' + a.state_name;
        a.autoCompleteMainLabel = a[fieldValue as keyof typeof a];
        return a;
      });
      return citiesRes;
    case 'Currencies':
      const curenciesRes = array.slice(
        (pageNumber - 1) * perPage,
        pageNumber * perPage
      );
      curenciesRes.map((a: ArrayType) => {
        a.autoCompleteImg = `/admin/flags/128x128/${a.iso2}.png`;
        a.autoCompleteIcon = '';
        a.autoCompleteSubLabel =
          fieldValue == 'name'
            ? a.currency_name + '-' + a.currency_symbol
            : a.currency_name + '-' + a.currency + '-' + a.currency_symbol;
        a.autoCompleteMainLabel = a[fieldValue as keyof typeof a];
        return a;
      });
      return curenciesRes;
    case 'Agencies':
      const agenciesRes = array.slice(
        (pageNumber - 1) * perPage,
        pageNumber * perPage
      );
      agenciesRes.map((a: ArrayType) => {
        a.autoCompleteImg =
          a.logoImage == '' ? '/admin/images/faces/Customer.png' : a.logoImage;
        a.autoCompleteIcon = '';
        a.autoCompleteSubLabel = fieldValue == 'agentName' ? '' : a.agentName;
        a.autoCompleteMainLabel =
          fieldValue == 'creditAmount' ||
          fieldValue == 'depositAmount' ||
          fieldValue == 'remainCreditAmount' ||
          fieldValue == 'remainDepositAmount'
            ? parseFloat(a[fieldValue as keyof typeof a]).toLocaleString(
                'en-US'
              ) +
              ' - ' +
              a.currencyCode
            : fieldValue == 'phones'
            ? `${a.phones.map(
                (obj: PhoneAgentType) => `${obj.tags}: ${obj.number} <br/>`
              )}`
            : a[fieldValue as keyof typeof a];
        return a;
      });
      return agenciesRes;

    default:
      return array.slice((pageNumber - 1) * perPage, pageNumber * perPage);
  }
}
