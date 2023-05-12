import nextConnect from 'next-connect';
import { NextApiResponse, NextApiRequest } from 'next';
// import { HazelcastType } from '@/interfaces/next.interface';
import { dbCheck } from 'middleware/dbCheck';
import Collections, { ICollection } from 'homeModels/Collections';
import { verifyToken } from 'middleware/verifyToken';
import cors from 'cors';
import multipartFormParser from 'middleware/multipart-form-parser';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
const fse = require('fs-extra');
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
        _id,
      } = body;
      let isFileUpload = !isObjectEmpty(files);
      let oldCollection = await Collections.findById(_id);
      let finalFolder = `${process.cwd()}/public/collections/${
        oldCollection.title_en
      }`;
      var fileExtention;
      var uniqueName;
      var oldPath;
      var newPath: string;
      if (isFileUpload) {
        // upload image
        let filesArray = Object.entries(files);
        for (const imgs of filesArray as any) {
          console.log(imgs);
          oldPath = imgs[1]['filepath'];
          fileExtention = path.extname(imgs[1]['originalFilename']);
          uniqueName = imgs[1]['originalFilename']; //uuidv4();
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
            fs.rmSync(oldCollection.img_light[0]['path'], {
              recursive: true,
              force: true,
            });
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
            fs.rmSync(oldCollection.img_dark[0]['path'], {
              recursive: true,
              force: true,
            });
            delete body.img_dark_src;
          }
        }
      }
      if (typeof body.img_dark == 'string') {
        body.img_dark = img_dark_src;
        delete body.img_dark_src;
      }
      if (typeof body.img_light == 'string') {
        body.img_light = img_light_src;
        delete body.img_light_src;
      }

      delete body._id;
      if (body.title_en !== oldCollection.title_en) {
        try {
          let newFinalFolder = `${process.cwd()}/public/collections/${title_en}`;
          fs.renameSync(finalFolder, newFinalFolder);
          const seperateDarkPath = body.img_dark[0]['path'].split('/');
          const indexOfCollection = seperateDarkPath.findIndex(
            (a: string) => a == 'collections'
          );
          seperateDarkPath[indexOfCollection + 1] = body.title_en;
          body.img_dark[0]['path'] = seperateDarkPath.join('/');
          const seperatelightPath = body.img_light[0]['path'].split('/');
          seperatelightPath[indexOfCollection + 1] = body.title_en;
          body.img_light[0]['path'] = seperatelightPath.join('/');

          const seperateDarkSrc = body.img_dark[0]['src'].split('/');
          const indexOfSrcCollection = seperateDarkSrc.findIndex(
            (a: string) => a == 'collections'
          );
          seperateDarkSrc[indexOfSrcCollection + 1] = body.title_en;
          body.img_dark[0]['src'] = seperateDarkSrc.join('/');

          const seperatelightSrc = body.img_light[0]['src'].split('/');
          seperatelightSrc[indexOfSrcCollection + 1] = body.title_en;
          body.img_light[0]['src'] = seperatelightSrc.join('/');
          let newCollection = await Collections.findByIdAndUpdate(
            oldCollection._id,
            req.body,
            {
              returnDocument: 'after',
            }
          );
          res.status(200).json({ success: true, data: newCollection });
        } catch (error) {
          res
            .status(401)
            .json({ success: false, Error: (error as Error).message });
          return;
        }
      } else {
        let newCollection = await Collections.findByIdAndUpdate(
          oldCollection._id,
          req.body,
          {
            returnDocument: 'after',
          }
        );
        res.status(200).json({ success: true, data: newCollection });
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
