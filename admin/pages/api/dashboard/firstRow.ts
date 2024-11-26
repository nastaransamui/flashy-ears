import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import { HazelcastType } from "@/interfaces/next.interface";
import { verifyToken } from "middleware/verifyToken";
import { dbCheck } from "middleware/dbCheck";
// import hazelCast from 'middleware/hazelCast';
import mongoose, { Model } from "mongoose";
import Roles, { IRole } from "@/models/Roles";
import Users, { IUser } from "@/models/Users";
import Videos, { IVideo } from "@/models/Videos";
import Photos, { IPhoto } from "@/models/Photos";
import Features, { IFeature } from "@/models/Features";
import Countries, { ICountry } from "@/models/Countries";
import Provinces, { IProvince } from "@/models/Provinces";
import Cities, { ICity } from "@/models/Cities";
import Currencies, { ICurrency } from "@/models/Currencies";
import Agencies, { IAgent } from "@/models/Agencies";
import Badge from "@mui/icons-material/Badge";
import AccountBox from "@mui/icons-material/AccountBox";
import AttachMoney from "@mui/icons-material/AttachMoney";
import Public from "@mui/icons-material/Public";

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
};

type TotalDataType = {
  _id?: string;
  total?: number;
  active?: number;
  deactive?: number;
  header_icon?: string;
  show?: boolean;
  social?: boolean;
  color?: string;
  title_en?: string;
  title_fa?: string;
  firstNumber?: number;
  secondNumber?: number;
  unit?: string;
  footer_icon?: string;
  footer_en?: string;
  footer_fa?: string;
};

type ValueListType = {
  totalUsers: TotalDataType;
  totalAgents: TotalDataType;
  totalCurrency: TotalDataType;
  totalCountries: TotalDataType;
};

const firstRowFunc = async () => {
  var valuesList = await Users.aggregate([
    {
      $facet: {
        totalUsers: [
          {
            $group: {
              _id: "users",
              total: { $sum: 1 },
              active: { $sum: { $cond: ["$isAdmin", 1, 0] } },
              deactive: { $sum: { $cond: ["$isAdmin", 0, 1] } },
            },
          },
          {
            $addFields: {
              //@ts-ignore
              header_icon: Badge.type?.render().props.children.props.d,
              show: true,
              social: false,
              color: "warning",
              title_en: "Users: Total / Actvie",
              title_fa: "مجموع کاربران",
              firstNumber: `$total`,
              secondNumber: `$active`,
              unit: "",
              footer_icon: "badge",
              footer_en: `Deactivate users `,
              footer_fa: `کاربران غیر فعال `,
            },
          },
        ],
      },
    },
    {
      $unwind: { path: "$totalUsers", preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        from: "agencies",
        as: "totalAgents",
        pipeline: [
          {
            $group: {
              _id: "agencies",
              total: { $sum: 1 },
              active: { $sum: { $cond: ["$isActive", 1, 0] } },
              deactive: { $sum: { $cond: ["$isActive", 0, 1] } },
            },
          },
          {
            $addFields: {
              header_icon:
                //@ts-ignore
                AccountBox.type?.render().props.children.props.d,
              show: true,
              social: false,
              color: "dark",
              title_en: "Agents: Total/Active",
              title_fa: "مجموع نمایندگان",
              firstNumber: `$total`,
              secondNumber: `$active`,
              unit: "",
              footer_icon: "account_box",
              footer_en: `Deactivate agents `,
              footer_fa: `نمایندگان غیر فعال `,
            },
          },
        ],
      },
    },
    {
      $unwind: { path: "$totalAgents", preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        from: "currencies",
        as: "totalCurrency",
        pipeline: [
          {
            $group: {
              _id: "currencies",
              total: { $sum: 1 },
              active: { $sum: { $cond: ["$isActive", 1, 0] } },
              deactive: { $sum: { $cond: ["$isActive", 0, 1] } },
            },
          },
          {
            $addFields: {
              header_icon:
                //@ts-ignore
                AttachMoney.type?.render().props.children.props.d,
              show: true,
              social: false,
              color: "danger",
              title_en: "Active currencies",
              title_fa: "ارزهای فعال",
              firstNumber: `$total`,
              secondNumber: `$active`,
              unit: "",
              footer_icon: "attach_money",
              footer_en: `Deactivate Currencis `,
              footer_fa: `ارزهای غیر فعال `,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$totalCurrency",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "countries",
        as: "totalCountries",
        pipeline: [
          {
            $group: {
              _id: "countries",
              total: { $sum: 1 },
              active: { $sum: { $cond: ["$isActive", 1, 0] } },
              deactive: { $sum: { $cond: ["$isActive", 0, 1] } },
            },
          },
          {
            $addFields: {
              header_icon:
                //@ts-ignore
                Public.type?.render().props.children.props.d,
              show: true,
              social: true,
              color: "info",
              title_en: "Active countries",
              title_fa: "کشورهای فعال",
              firstNumber: `$total`,
              secondNumber: `$active`,
              unit: "",
              footer_icon: "public",
              footer_en: `Deactivate Countries `,
              footer_fa: `کشورهای غیر فعال `,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$totalCountries",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);
  return valuesList;
};

apiRoute.get(
  verifyToken,
  dbCheck,
  // hazelCast,
  async (req: HazelcastType, res: NextApiResponse<Data>, next: () => void) => {
    try {
      const hz = req.hazelCast;
      if (hz) {
        const multiMapUsers = await hz.getMultiMap("Users");
        const multiMapAgencies = await hz.getMultiMap("Agencies");
        const multiMapCurrencies = await hz.getMultiMap("Currencies");
        const multiMapCountries = await hz.getMultiMap("Countries");
        const usersIsExist = await multiMapUsers.containsKey(`allUsers`);
        const agenciesIsExist = await multiMapAgencies.containsKey(
          `allAgencies`
        );
        const currenciesIsExist = await multiMapCurrencies.containsKey(
          `allCurrencies`
        );
        const countriesIsExist = await multiMapCountries.containsKey(
          `allCountries`
        );
        if (
          usersIsExist &&
          agenciesIsExist &&
          currenciesIsExist &&
          countriesIsExist
        ) {
          let hzValueList: ValueListType[] = [
            {
              totalUsers: {},
              totalAgents: {},
              totalCurrency: {},
              totalCountries: {},
            },
          ];
          const usersValues = await multiMapUsers.get(`allUsers`);
          for (const users of usersValues as any) {
            var totalUsers: TotalDataType = {};
            totalUsers._id = "users";
            totalUsers.total = users.length;
            totalUsers.active = users.filter(
              (a: any) => a.isAdmin == true
            ).length;
            totalUsers.deactive = users.filter(
              (a: any) => a.isAdmin == false
            ).length;
            hzValueList[0].totalUsers = totalUsers;
            hzValueList[0].totalUsers.header_icon =
              //@ts-ignore
              Badge.type?.render().props.children.props.d;
            hzValueList[0].totalUsers.show = true;
            hzValueList[0].totalUsers.social = false;
            hzValueList[0].totalUsers.color = "warning";
            hzValueList[0].totalUsers.title_en = "Users: Total / Actvie";
            hzValueList[0].totalUsers.title_fa = "مجموع کاربران";
            hzValueList[0].totalUsers.firstNumber = users.length;
            hzValueList[0].totalUsers.secondNumber = users.filter(
              (a: any) => a.isAdmin == true
            ).length;
            hzValueList[0].totalUsers.unit = "";
            hzValueList[0].totalUsers.footer_icon = "badge";
            hzValueList[0].totalUsers.footer_en = `Deactivate users `;
            hzValueList[0].totalUsers.footer_fa = `کاربران غیر فعال `;
          }
          const agenciesValues = await multiMapAgencies.get(`allAgencies`);

          for (const agents of agenciesValues as any) {
            var totalAgents: TotalDataType = {};
            totalAgents._id = "agencies";
            totalAgents.total = agents.length;
            totalAgents.active = agents.filter(
              (a: any) => a.isActive == true
            ).length;
            totalAgents.deactive = agents.filter(
              (a: any) => a.isActive == false
            ).length;
            hzValueList[0].totalAgents = totalAgents;
            hzValueList[0].totalAgents.header_icon =
              //@ts-ignore
              AccountBox.type?.render().props.children.props.d;
            hzValueList[0].totalAgents.show = true;
            hzValueList[0].totalAgents.social = false;
            hzValueList[0].totalAgents.color = "dark";
            hzValueList[0].totalAgents.title_en = "Agents: Total/Active";
            hzValueList[0].totalAgents.title_fa = "مجموع نمایندگان";
            hzValueList[0].totalAgents.firstNumber = agents.length;
            hzValueList[0].totalAgents.secondNumber = agents.filter(
              (a: any) => a.isActive == true
            ).length;
            hzValueList[0].totalAgents.unit = "";
            hzValueList[0].totalAgents.footer_icon = "account_box";
            hzValueList[0].totalAgents.footer_en = `Deactivate agents `;
            hzValueList[0].totalAgents.footer_fa = `نمایندگان غیر فعال `;
          }
          const currenciesValues = await multiMapCurrencies.get(
            `allCurrencies`
          );
          for (const currencies of currenciesValues as any) {
            var totalCurrency: TotalDataType = {};
            totalCurrency._id = "agencies";
            totalCurrency.total = currencies.length;
            totalCurrency.active = currencies.filter(
              (a: any) => a.isActive == true
            ).length;
            totalCurrency.deactive = currencies.filter(
              (a: any) => a.isActive == false
            ).length;
            hzValueList[0].totalCurrency = totalCurrency;
            hzValueList[0].totalCurrency.header_icon =
              //@ts-ignore
              AttachMoney.type?.render().props.children.props.d;
            hzValueList[0].totalCurrency.show = true;
            hzValueList[0].totalCurrency.social = false;
            hzValueList[0].totalCurrency.color = "danger";
            hzValueList[0].totalCurrency.title_en = "Active currencies";
            hzValueList[0].totalCurrency.title_fa = "ارزهای فعال";
            hzValueList[0].totalCurrency.firstNumber = currencies.length;
            hzValueList[0].totalCurrency.secondNumber = currencies.filter(
              (a: any) => a.isAdmin == true
            ).length;
            hzValueList[0].totalCurrency.unit = "";
            hzValueList[0].totalCurrency.footer_icon = "attach_money";
            hzValueList[0].totalCurrency.footer_en = `Deactivate Currencis `;
            hzValueList[0].totalCurrency.footer_fa = `ارزهای غیر فعال `;
          }
          const countriesValues = await multiMapCountries.get(`allCountries`);
          for (const countries of countriesValues as any) {
            var totalCountries: TotalDataType = {};
            totalCountries._id = "agencies";
            totalCountries.total = countries.length;
            totalCountries.active = countries.filter(
              (a: any) => a.isActive == true
            ).length;
            totalCountries.deactive = countries.filter(
              (a: any) => a.isActive == false
            ).length;
            hzValueList[0].totalCountries = totalCountries;
            hzValueList[0].totalCountries.header_icon =
              //@ts-ignore
              Public.type?.render().props.children.props.d;
            hzValueList[0].totalCountries.show = true;
            hzValueList[0].totalCountries.social = true;
            hzValueList[0].totalCountries.color = "info";
            hzValueList[0].totalCountries.title_en = "Active countries";
            hzValueList[0].totalCountries.title_fa = "کشورهای فعال";
            hzValueList[0].totalCountries.firstNumber = countries.length;
            hzValueList[0].totalCountries.secondNumber = countries.filter(
              (a: any) => a.isAdmin == true
            ).length;
            hzValueList[0].totalCountries.unit = "";
            hzValueList[0].totalCountries.footer_icon = "public";
            hzValueList[0].totalCountries.footer_en = `Deactivate Countries `;
            hzValueList[0].totalCountries.footer_fa = `کشورهای غیر فعال `;
          }
          res.status(200).json({
            success: true,
            data: hzValueList,
          });
        } else {
          var valuesList = await firstRowFunc();
          res.status(200).json({
            success: true,
            data: valuesList,
          });
        }
        await hz.shutdown();
      } else {
        var valuesList = await firstRowFunc();
        res.status(200).json({
          success: true,
          data: valuesList,
        });
      }
    } catch (error) {
      const hz = req.hazelCast;
      res.status(401).json({ success: false, Error: (error as Error).message });
      if (hz) {
        await hz.shutdown();
      }
    }
  }
);

export default apiRoute;
