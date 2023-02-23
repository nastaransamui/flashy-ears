import nextConnect from 'next-connect';
import { NextApiResponse, NextApiRequest } from 'next';
// import { HazelcastType } from '@/interfaces/next.interface';
import { dbCheck } from 'middleware/dbCheck';
import Collections, { ICollection } from 'homeModels/Collections';
import { verifyToken } from 'middleware/verifyToken';
import cors from 'cors';
import multiparty from 'multiparty';
import multipartFormParser from 'middleware/multipart-form-parser';
import fs from 'fs';
const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
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
apiRoute.use(cors());
apiRoute.use(multipartFormParser);
apiRoute.post(
  verifyToken,
  dbCheck,
  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
      const cloudinary = require('cloudinary').v2;

      //@ts-ignore
      const files = req.files;
      const body = req.body;
      // Configuration
      cloudinary.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
      });
      const lightImageResp = cloudinary.uploader.upload(
        files['img_light'].filepath,
        {
          folder: 'collections',
          public_id: body['title_en'] + 'img_light',
        }
      );

      lightImageResp
        .then((data: any) => {
          body.img_light = data.url;
          fs.unlink(files['img_light'].filepath, (error) => {
            if (error !== null) {
              res
                .status(401)
                .json({ success: false, Error: (error as Error).message });
            }
          });
          const darkImageResp = cloudinary.uploader.upload(
            files['img_dark'].filepath,
            {
              folder: 'collections',
              public_id: body['title_en'] + 'img_dark',
            }
          );

          darkImageResp.then((data: any) => {
            body.img_dark = data.url;
            body.link = '#';
            fs.unlink(files['img_dark'].filepath, (error) => {
              if (error !== null) {
                res
                  .status(401)
                  .json({ success: false, Error: (error as Error).message });
              }
            });
            const newCollection = new Collections(body);
            newCollection.save((err: Error, result: any) => {
              if (err) {
                cloudinary.api.delete_resources_by_prefix(
                  `collections/${body['title_en'] + 'img_light'}`,
                  function (error: Error, result: any) {
                    console.log(error);
                  }
                );
                cloudinary.api.delete_resources_by_prefix(
                  `collections/${body['title_en'] + 'img_dark'}`,
                  function (error: Error, result: any) {
                    console.log(error);
                  }
                );
                res
                  .status(401)
                  .json({ success: false, Error: (err as Error).message });
              } else {
                res.status(200).json({
                  success: true,
                  data: result,
                });
              }
            });
          });
        })
        .catch((err: any) => {
          console.log(err);
          res
            .status(401)
            .json({ success: false, Error: (err as Error).message });
        });
    } catch (error) {
      res.status(401).json({ success: false, Error: (error as Error).message });
    }
  }
);
export default apiRoute;
export const config = {
  api: {
    bodyParser: false,
  },
};
