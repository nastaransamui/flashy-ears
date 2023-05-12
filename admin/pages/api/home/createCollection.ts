import nextConnect from 'next-connect';
import { NextApiResponse, NextApiRequest } from 'next';
// import { HazelcastType } from '@/interfaces/next.interface';
import { dbCheck } from 'middleware/dbCheck';
import Collections, { ICollection } from 'homeModels/Collections';
import { verifyToken } from 'middleware/verifyToken';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
const fse = require('fs-extra');
const path = require('path');
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
      req.body.img_light_src = JSON.parse(req.body.img_light_src);
      req.body.img_dark_src = JSON.parse(req.body.img_dark_src);
      //@ts-ignore
      const files = req.files;
      const body = req.body;
      const {
        desct_en,
        desc_th,
        linkTitle_en,
        linkTitle_th,
        title_en,
        title_th,
        img_light_src,
        img_dark_src,
      } = body;

      let finalFolder = `${process.cwd()}/public/collections/${title_en}`;

      var fileExtention;
      var uniqueName;
      var oldPath;
      var newPath: string;
      if (!fs.existsSync(finalFolder)) {
        fs.mkdirSync(finalFolder, { recursive: true });
      }
      var fileExtention;
      var uniqueName;
      var oldPath;
      var newPath: string;
      if (!fs.existsSync(finalFolder)) {
        fs.mkdirSync(finalFolder, { recursive: true });
      }
      // upload image
      let filesArray = Object.entries(files);
      for (const imgs of filesArray as any) {
        oldPath = imgs[1]['filepath'];
        fileExtention = path.extname(imgs[1]['originalFilename']);
        uniqueName = uuidv4();
        newPath = `${finalFolder}/${uniqueName}${fileExtention}`;
        fse.move(oldPath, newPath, { overwrite: true });
        if (imgs[0] == 'img_light') {
          const seperatePath = newPath.split('/');
          const removePublicPath = seperatePath.filter(
            (a: string) => a !== 'public'
          );
          const seperatePathFromAdmin = removePublicPath.splice(
            removePublicPath.indexOf('collections'),
            removePublicPath.length - removePublicPath.indexOf('collections')
          );
          const path = seperatePathFromAdmin.join('/');
          body.img_light = [
            {
              height: img_light_src[0]['height'],
              width: img_light_src[0]['width'],
              tags: img_light_src[0]['tags'],
              path: newPath,
              src: `${process.env.NEXT_PUBLIC_ADMIN_URL}/${path}`,
            },
          ];
          delete body.img_light_src;
        }
        if (imgs[0] == 'img_dark') {
          const seperatePath = newPath.split('/');
          const removePublicPath = seperatePath.filter(
            (a: string) => a !== 'public'
          );
          const seperatePathFromAdmin = removePublicPath.splice(
            removePublicPath.indexOf('collections'),
            removePublicPath.length - removePublicPath.indexOf('collections')
          );
          const path = seperatePathFromAdmin.join('/');
          body.img_dark = [
            {
              height: img_dark_src[0]['height'],
              width: img_dark_src[0]['width'],
              tags: img_dark_src[0]['tags'],
              path: newPath,
              src: `${process.env.NEXT_PUBLIC_ADMIN_URL}/${path}`,
            },
          ];
          delete body.img_dark_src;
        }
      }
      const newCollection = new Collections(body);
      newCollection.save((err: any, result: any) => {
        if (err) {
          if (err.code == 11000) {
            if (!fs.existsSync(body.img_light[0]['path'])) {
              fs.unlinkSync(body.img_light[0]['path']);
            }
            if (!fs.existsSync(body.img_dark[0]['path'])) {
              fs.unlinkSync(body.img_dark[0]['path']);
            }
          } else {
            fs.rmSync(finalFolder, { recursive: true, force: true });
            res
              .status(401)
              .json({ success: false, Error: (err as Error).message });
          }
          res
            .status(401)
            .json({ success: false, Error: (err as Error).message });
          return;
        } else {
          res.status(200).json({
            success: true,
            data: result,
          });
        }
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
