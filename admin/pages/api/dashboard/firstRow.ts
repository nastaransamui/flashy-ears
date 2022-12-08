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
  totalCount?: number;
};

type Results = {
  data: object[];
  totalCount: number;
};

apiRoute.post(
  dbCheck,
  hazelCast,
  async (req: HazelcastType, res: NextApiResponse<Data>, next: () => void) => {
    try {
      res.status(200).json({
        success: true,
        data: [],
        totalCount: 0,
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
