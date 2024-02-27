import Roles from '@/models/Roles';

export function escapeRegExp(value: string) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
export async function autoCompleteRoles(
  searchRegex: RegExp,
  fieldValue: string
) {
  const valuesList = await Roles.aggregate([
    { $match: { [fieldValue]: searchRegex } },
    { $sort: { roleName: 1 } },
    {
      $addFields: {
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
