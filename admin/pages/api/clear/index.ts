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
      const multiMapUsers = await hz.getMultiMap('Users');
      await multiMapUsers.destroy();
      const multiMapRoles = await hz.getMultiMap('Roles');
      await multiMapRoles.destroy();
      const multiMapVideos = await hz.getMultiMap('Videos');
      await multiMapVideos.destroy();
      const multiMapPhotos = await hz.getMultiMap('Photos');
      await multiMapPhotos.destroy();
      const multiMapFeatures = await hz.getMultiMap('Features');
      await multiMapFeatures.destroy();
      const multiMapCountries = await hz.getMultiMap('Countries');
      await multiMapCountries.destroy();
      res.status(200).redirect('/admin/dashboard');
      await hz.shutdown();
    } else {
      res.status(200).redirect('/admin/dashboard');
    }
  }
);

export default apiRoute;
