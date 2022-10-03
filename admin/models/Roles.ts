import mongoose, { Types } from 'mongoose';

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
  routes: Types.Array<String>
}

const RolesSchema = new mongoose.Schema<IRole>(
  {
    roleName: { type: String, required: true, unique: true, index: true },
    users_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    isActive: { type: Boolean, default: true },
    remark: { type: String },
    icon: String,
    routes: [
      {
        path: String,
        'name_en-US': String,
        name_fa: String,
        crud: [
          {
            name: String,
            active: Boolean,
          },
        ],
        views: [
          {
            path: String,
            'name_en-US': String,
            name_fa: String,
            crud: [
              {
                name: String,
                active: Boolean,
              },
            ],
            views: [
              {
                path: String,
                'name_en-US': String,
                name_fa: String,
                crud: [
                  {
                    name: String,
                    active: Boolean,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Roles ||
  mongoose.model<IRole>('Roles', RolesSchema);
