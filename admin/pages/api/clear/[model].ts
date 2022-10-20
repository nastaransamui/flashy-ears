import nextConnect from 'next-connect';
import { NextApiResponse } from 'next';
import { HazelcastType } from '@/interfaces/next.interface';
import { verifyToken } from 'middleware/verifyToken';
import hazelCast from 'middleware/hazelCast';

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

type MultimapType =
  | 'roles'
  | 'users'
  | 'videos'
  | 'photos'
  | 'features'
  | 'countries';

apiRoute.get(
  // verifyToken,
  hazelCast,
  async (req: HazelcastType, res: NextApiResponse) => {
    const hz = req.hazelCast;
    if (hz) {
      const { query } = req;
      let model = query.model as MultimapType;

      var capitalCaseModel = model?.charAt(0).toUpperCase() + model?.slice(1);
      const multiMap = await hz.getMultiMap(`${capitalCaseModel}`);
      await multiMap.destroy();
      console.log(`clear ${capitalCaseModel} catch`);
      res.status(200).redirect('/admin/dashboard');
      await hz.shutdown();
    } else {
      res.status(200).redirect('/admin/dashboard');
    }
  }
);

export default apiRoute;
