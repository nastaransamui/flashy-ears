import mongoose, { Model } from 'mongoose';
import Users, {
  dispalyFields as usersDisplayField,
  muiDataObj as usersMuiDataObj,
} from '@/models/Users';
import Roles, {
  dispalyFields as rolesDisplayField,
  muiDataObj as rolesMuiDataObj,
} from '@/models/Roles';
import Videos, {
  dispalyFields as videosDisplayField,
  muiDataObj as videosMuiDataObj,
} from '@/models/Videos';
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

export async function searchVideos(searchRegex: RegExp, fieldValue: string) {
  const valuesList = await Videos.aggregate([
    { $match: { [fieldValue]: searchRegex } },
    { $sort: { title_en: 1 } },
    {
      $addFields: {
        dispalyFields: videosDisplayField,
        muiData: videosMuiDataObj,
        autoCompleteImg: {
          $cond: {
            if: {
              $eq: [{ $ifNull: ['$videoPoster', ''] }, ''],
            },
            then: '/admin/images/faces/movie.jpg',
            else: '$videoPoster',
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
        dispalyFields: provincesDisplayField,
        muiData: provincesMuiDataObj,
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
