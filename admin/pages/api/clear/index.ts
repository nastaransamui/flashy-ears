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

apiRoute.get(
  // verifyToken,
  hazelCast,
  async (req: HazelcastType, res: NextApiResponse) => {
    const hz = req.hazelCast;
    if (hz) {
      const multiMapu = await hz.getMultiMap('Users');
      await multiMapu.destroy();
      const multiMapRo = await hz.getMultiMap('Roles');
      await multiMapRo.destroy();
      res.status(200).redirect('/admin/dashboard');
      await hz.shutdown();
    } else {
      res.status(200).redirect('/admin/dashboard');
    }
  }
);

export default apiRoute;
