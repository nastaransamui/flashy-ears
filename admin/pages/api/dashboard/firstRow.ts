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
import Photos, { IPhoto } from '@/models/Photos';
import Features, { IFeature } from '@/models/Features';
import Countries, { ICountry } from '@/models/Countries';
import Provinces, { IProvince } from '@/models/Provinces';
import Cities, { ICity } from '@/models/Cities';
import Currencies, { ICurrency } from '@/models/Currencies';
import Agencies, { IAgent } from '@/models/Agencies';
import Badge from '@mui/icons-material/Badge';
import AccountBox from '@mui/icons-material/AccountBox';
import AttachMoney from '@mui/icons-material/AttachMoney';
import Public from '@mui/icons-material/Public';

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
};

apiRoute.post(
  dbCheck,
  // hazelCast,
  async (req: HazelcastType, res: NextApiResponse<Data>, next: () => void) => {
    //Todo hazelCast
    try {
      var valuesList = await Users.aggregate([
        {
          $facet: {
            totalUsers: [
              {
                $group: {
                  _id: 'users',
                  total: { $sum: 1 },
                  active: { $sum: { $cond: ['$isAdmin', 1, 0] } },
                  deactive: { $sum: { $cond: ['$isAdmin', 0, 1] } },
                },
              },
              {
                $addFields: {
                  //@ts-ignore
                  header_icon: Badge.type?.render().props.children.props.d,
                  show: true,
                  social: false,
                  color: 'warning',
                  title_en: 'Users: Total / Actvie',
                  title_fa: 'مجموع کاربران',
                  firstNumber: `$total`,
                  secondNumber: `$active`,
                  unit: '',
                  footer_icon: 'badge',
                  footer_en: `Deactivate users `,
                  footer_fa: `کاربران غیر فعال `,
                },
              },
            ],
          },
        },
        {
          $unwind: { path: '$totalUsers', preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: 'agencies',
            as: 'totalAgents',
            pipeline: [
              {
                $group: {
                  _id: 'agencies',
                  total: { $sum: 1 },
                  active: { $sum: { $cond: ['$isActive', 1, 0] } },
                  deactive: { $sum: { $cond: ['$isActive', 0, 1] } },
                },
              },
              {
                $addFields: {
                  //@ts-ignore
                  header_icon: AccountBox.type?.render().props.children.props.d,
                  show: true,
                  social: false,
                  color: 'dark',
                  title_en: 'Agents: Total/Active',
                  title_fa: 'مجموع نمایندگان',
                  firstNumber: `$total`,
                  secondNumber: `$active`,
                  unit: '',
                  footer_icon: 'account_box',
                  footer_en: `Deactivate agents `,
                  footer_fa: `نمایندگان غیر فعال `,
                },
              },
            ],
          },
        },
        {
          $unwind: { path: '$totalAgents', preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: 'currencies',
            as: 'totalCurrency',
            pipeline: [
              {
                $group: {
                  _id: 'currencies',
                  total: { $sum: 1 },
                  active: { $sum: { $cond: ['$isActive', 1, 0] } },
                  deactive: { $sum: { $cond: ['$isActive', 0, 1] } },
                },
              },
              {
                $addFields: {
                  header_icon:
                    //@ts-ignore
                    AttachMoney.type?.render().props.children.props.d,
                  show: true,
                  social: false,
                  color: 'danger',
                  title_en: 'Active currencies',
                  title_fa: 'ارزهای فعال',
                  firstNumber: `$total`,
                  secondNumber: `$active`,
                  unit: '',
                  footer_icon: 'attach_money',
                  footer_en: `Deactivate Currencis `,
                  footer_fa: `ارزهای غیر فعال `,
                },
              },
            ],
          },
        },
        {
          $unwind: {
            path: '$totalCurrency',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'countries',
            as: 'totalCountries',
            pipeline: [
              {
                $group: {
                  _id: 'countries',
                  total: { $sum: 1 },
                  active: { $sum: { $cond: ['$isActive', 1, 0] } },
                  deactive: { $sum: { $cond: ['$isActive', 0, 1] } },
                },
              },
              {
                $addFields: {
                  header_icon:
                    //@ts-ignore
                    Public.type?.render().props.children.props.d,
                  show: true,
                  social: true,
                  color: 'info',
                  title_en: 'Active countries',
                  title_fa: 'کشورهای فعال',
                  firstNumber: `$total`,
                  secondNumber: `$active`,
                  unit: '',
                  footer_icon: 'public',
                  footer_en: `Deactivate Countries `,
                  footer_fa: `کشورهای غیر فعال `,
                },
              },
            ],
          },
        },
        {
          $unwind: {
            path: '$totalCountries',
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);
      res.status(200).json({
        success: true,
        data: valuesList,
      });
    } catch (error) {
      const hz = req.hazelCast;
      res.status(401).json({ success: false, error: (error as Error).message });
      if (hz) {
        await hz.shutdown();
      }
    }
  }
);

export default apiRoute;
