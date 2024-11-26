import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import { HazelcastType } from "@/interfaces/next.interface";
import { verifyToken } from "middleware/verifyToken";
import { dbCheck } from "middleware/dbCheck";
// import hazelCast from 'middleware/hazelCast';

import { autoCompleteRoles } from "@/helpers/autoComplete";

export function escapeRegExp(value: string) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

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

type Results = {
  data: object[];
};
apiRoute.post(
  verifyToken,
  dbCheck,
  // hazelCast,
  async (req: HazelcastType, res: NextApiResponse<Data>) => {
    try {
      const { modelName, activeOnly, filterValue, fieldValue } = req.body;
      const hz = req.hazelCast;
      const searchRegex = new RegExp(escapeRegExp(filterValue), "i");
      // console.log(hz);
      if (hz) {
        res.status(401).json({ success: false, error: "update HZ search" });
      } else {
        switch (modelName) {
          case "Roles":
            var result: Results = await autoCompleteRoles(
              searchRegex,
              fieldValue
            );
            console.log(result);
            res.status(200).json({ success: true, ...result });
            break;
          default:
            res.status(200).json({ success: true, data: [] });
            break;
        }
      }
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
