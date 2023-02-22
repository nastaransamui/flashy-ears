import nextConnect from 'next-connect';
import { NextApiResponse, NextApiRequest } from 'next';
// import { HazelcastType } from '@/interfaces/next.interface';
import { dbCheck } from 'middleware/dbCheck';
import Collections, { ICollection } from 'models/Collections';
import { verifyToken } from 'middleware/verifyToken';
import cors from 'cors';
import multipartFormParser from 'middleware/multipart-form-parser';
import fs from 'fs';

export function isObjectEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}
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
  data?: ICollection;
};
apiRoute.use(cors());
apiRoute.use(multipartFormParser);
apiRoute.post(
  verifyToken,
  dbCheck,
  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const path = require('path');
    try {
      const cloudinary = require('cloudinary').v2;
      cloudinary.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
      });
      //@ts-ignore
      const files = req.files;
      const body = req.body;
      if (isObjectEmpty(files)) {
        //'image not delete'
        var oldcollection = await Collections.findOne({ _id: body._id });
        var oldTitle = oldcollection['title_en'];
        if (oldTitle == body.title_en) {
          //title_en not change
          let doc = await Collections.findByIdAndUpdate(body._id, body, {
            new: true,
          });
          res.status(200).json({
            success: true,
            data: doc,
          });
        } else {
          //Title en change and update image
          cloudinary.uploader.rename(
            `collections/${oldTitle}img_light`,
            `collections/${body['title_en']}img_light`,
            (error: Error, result: any) => {
              if (error !== undefined) {
                res
                  .status(404)
                  .json({ success: false, Error: (error as Error).message });
              } else {
                body.img_light = result.url;
                cloudinary.uploader.rename(
                  `collections/${oldTitle}img_dark`,
                  `collections/${body['title_en']}img_dark`,
                  async (error: Error, result: any) => {
                    if (error !== undefined) {
                      res.status(404).json({
                        success: false,
                        Error: (error as Error).message,
                      });
                    } else {
                      body.img_dark = result.url;

                      let doc = await Collections.findByIdAndUpdate(
                        body._id,
                        body,
                        {
                          new: true,
                        }
                      );
                      res.status(200).json({
                        success: true,
                        data: doc,
                      });
                    }
                  }
                );
              }
            }
          );
        }
      } else {
        switch (true) {
          case files['img_dark'] == undefined:
            //'image light delete');
            var oldcollection = await Collections.findOne({ _id: body._id });
            var oldTitle = oldcollection['title_en'];
            cloudinary.api.delete_resources_by_prefix(
              `collections/${oldTitle + 'img_light'}`,
              function (error: Error, result: any) {
                console.log(error);
              }
            );
            var lightImageResp = cloudinary.uploader.upload(
              files['img_light'].filepath,
              {
                folder: 'collections',
                public_id: body['title_en'] + 'img_light',
              }
            );
            lightImageResp.then(async (data: any) => {
              body.img_light = data.url;
              fs.unlink(files['img_light'].filepath, (error) => {
                if (error !== null) {
                  res
                    .status(401)
                    .json({ success: false, Error: (error as Error).message });
                }
              });
              let doc = await Collections.findByIdAndUpdate(body._id, body, {
                new: true,
              });
              res.status(200).json({
                success: true,
                data: doc,
              });
            });
            break;
          case files['img_light'] == undefined:
            //'image dark delete');
            var oldcollection = await Collections.findOne({ _id: body._id });
            var oldTitle = oldcollection['title_en'];
            cloudinary.api.delete_resources_by_prefix(
              `collections/${oldTitle + 'img_dark'}`,
              function (error: Error, result: any) {
                console.log(error);
              }
            );
            var darkImageResp = cloudinary.uploader.upload(
              files['img_dark'].filepath,
              {
                folder: 'collections',
                public_id: body['title_en'] + 'img_dark',
              }
            );
            darkImageResp.then(async (data: any) => {
              body.img_dark = data.url;
              fs.unlink(files['img_dark'].filepath, (error) => {
                if (error !== null) {
                  res
                    .status(401)
                    .json({ success: false, Error: (error as Error).message });
                }
              });
              let doc = await Collections.findByIdAndUpdate(body._id, body, {
                new: true,
              });
              res.status(200).json({
                success: true,
                data: doc,
              });
            });
            break;

          default:
            var oldcollection = await Collections.findOne({ _id: body._id });
            var oldTitle = oldcollection['title_en'];
            cloudinary.api.delete_resources_by_prefix(
              `collections/${oldTitle + 'img_light'}`,
              function (error: Error, result: any) {
                console.log(error);
              }
            );
            cloudinary.api.delete_resources_by_prefix(
              `collections/${oldTitle + 'img_dark'}`,
              function (error: Error, result: any) {
                console.log(error);
              }
            );
            var lightImageResp = cloudinary.uploader.upload(
              files['img_light'].filepath,
              {
                folder: 'collections',
                public_id: body['title_en'] + 'img_light',
              }
            );
            lightImageResp.then(async (data: any) => {
              body.img_light = data.url;
              fs.unlink(files['img_light'].filepath, (error) => {
                if (error !== null) {
                  res
                    .status(401)
                    .json({ success: false, Error: (error as Error).message });
                }
              });
              var darkImageResp = cloudinary.uploader.upload(
                files['img_dark'].filepath,
                {
                  folder: 'collections',
                  public_id: body['title_en'] + 'img_dark',
                }
              );
              darkImageResp.then(async (data: any) => {
                body.img_dark = data.url;
                fs.unlink(files['img_dark'].filepath, (error) => {
                  if (error !== null) {
                    res.status(401).json({
                      success: false,
                      Error: (error as Error).message,
                    });
                  }
                });
                let doc = await Collections.findByIdAndUpdate(body._id, body, {
                  new: true,
                });
                res.status(200).json({
                  success: true,
                  data: doc,
                });
              });
            });
            break;
        }
      }
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
