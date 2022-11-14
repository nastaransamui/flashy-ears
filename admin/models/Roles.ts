import mongoose, { Types } from 'mongoose';

export type AccessRoleType = {
  state: string;
  access: boolean;
  update: boolean;
  delete: boolean;
  create: boolean;
};
export interface IRole {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  save?: any;
  roleName: string;
  users_id: Types.Array<Types.ObjectId>;
  isActive: boolean;
  remark: string;
  icon: string;
  routes: AccessRoleType[];
}

const RolesSchema = new mongoose.Schema<IRole>(
  {
    roleName: { type: String, required: true, unique: true, index: true },
    users_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    isActive: { type: Boolean, default: true, index: true },
    remark: { type: String },
    icon: String,
    routes: [
      {
        state: String,
        access: { type: Boolean, default: true },
        update: { type: Boolean, default: true },
        delete: { type: Boolean, default: true },
        create: { type: Boolean, default: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Roles ||
  mongoose.model<IRole>('Roles', RolesSchema);
export const dispalyFields = [
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

export const muiDataObj = {
  ...Object.fromEntries(
    dispalyFields.map((key) => [
      key,
      {
        type:
          key == 'isActive' ? 'boolean' : key == 'routes' ? 'number' : 'string',
        thumbnail: key !== 'roleName' ? '' : 'icon',
        filterable: true,
        searchable:
          key == 'isActive' ||
          key == 'createdAt' ||
          key == 'updatedAt' ||
          key == 'routes'
            ? false
            : true,
        ...icon[key],
      },
    ])
  ),
};
