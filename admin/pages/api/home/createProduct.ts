import nextConnect from 'next-connect';
import { NextApiResponse, NextApiRequest } from 'next';
// import { HazelcastType } from '@/interfaces/next.interface';
import { dbCheck } from 'middleware/dbCheck';
import Products, { IProducts } from 'homeModels/Products';
import { verifyToken } from 'middleware/verifyToken';
import cors from 'cors';
import multipartFormParser from 'middleware/multipart-form-parser';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import Colors, { IColors } from 'homeModels/Colors';
import Collections, { ICollection } from 'homeModels/Collections';
const fse = require('fs-extra');
const path = require('path');
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
      req.body.collection_id = JSON.parse(req.body.collection_id);
      req.body.colors_id = JSON.parse(req.body.colors_id);
      req.body.financials = JSON.parse(req.body.financials);
      req.body.images_information = JSON.parse(req.body.images_information);
      req.body.gallery_information = JSON.parse(req.body.gallery_information);
      //@ts-ignore
      const files = req.files;
      const body = req.body;
      const {
        product_label_en,
        product_label_th,
        product_name_en,
        product_name_th,
        product_subtitle_en,
        product_subtitle_th,
        product_description_en,
        product_description_th,
        collection_id,
        colors_id,
        financials,
        images_information,
        gallery_information,
      } = req.body;
      // console.log(files);
      // console.log(body);
      let finalFolder = `${process.cwd()}/public/products/${product_name_en}`;
      var fileExtention;
      var uniqueName;
      var oldPath;
      var newPath: string;
      if (!fs.existsSync(finalFolder)) {
        fs.mkdirSync(finalFolder, { recursive: true });
      }

      for (const allImages of Object.entries(files) as any) {
        switch (true) {
          case allImages[0].includes('gallery'):
            if (Array.isArray(files['gallery'])) {
              gallery_information['gallery'].forEach(
                (elem: any, index: number) => {
                  // console.log(elem['tags'][0]['title']);
                  for (const a of files['gallery'] as any) {
                    if (elem['tags'][0]['title'] == a['originalFilename']) {
                      oldPath = a['filepath'];
                      fileExtention = path.extname(a['originalFilename']);
                      uniqueName = uuidv4();
                      newPath = `${finalFolder}/gallery/${uniqueName}${fileExtention}`;
                      let gallerySrc = `/admin/products/${product_name_en}/gallery/${uniqueName}${fileExtention}`;
                      elem['path'] = newPath;
                      elem['src'] = gallerySrc;
                      fse.move(oldPath, newPath, { overwrite: true });
                    }
                  }
                }
              );
            } else {
              oldPath = files['gallery']['filepath'];
              fileExtention = path.extname(
                files['gallery']['originalFilename']
              );
              uniqueName = uuidv4();
              newPath = `${finalFolder}/gallery/${uniqueName}${fileExtention}`;
              fse.move(oldPath, newPath, { overwrite: true });
              gallery_information['gallery'].forEach(
                (elem: any, index: number) => {
                  const seperatePath = newPath.split('/');
                  const removePublicPath = seperatePath.filter(
                    (a: string) => a !== 'public'
                  );
                  const seperatePathFromAdmin = removePublicPath.splice(
                    removePublicPath.indexOf('admin'),
                    removePublicPath.length - removePublicPath.indexOf('admin')
                  );
                  const path = seperatePathFromAdmin.join('/');
                  elem.path = newPath;
                  elem.src = `/${path}`;
                }
              );
            }
            break;

          case allImages[0].includes('back'):
            let splitBackName = allImages[0].split('_');
            const back_image = allImages[1];
            oldPath = back_image['filepath'];
            fileExtention = path.extname(back_image['originalFilename']);
            uniqueName = splitBackName[splitBackName.length - 1];
            newPath = `${finalFolder}/back/${uniqueName}${fileExtention}`;
            fse.move(oldPath, newPath, { overwrite: true });
            images_information['images'][1]['back'].forEach(
              (elem: any, index: number) => {
                if (
                  elem?.['color'] == splitBackName[splitBackName.length - 1]
                ) {
                  const seperatePath = newPath.split('/');
                  const removePublicPath = seperatePath.filter(
                    (a: string) => a !== 'public'
                  );
                  const seperatePathFromAdmin = removePublicPath.splice(
                    removePublicPath.indexOf('admin'),
                    removePublicPath.length - removePublicPath.indexOf('admin')
                  );
                  const path = seperatePathFromAdmin.join('/');
                  elem.path = newPath;
                  elem.src = `/${path}`;
                }
              }
            );
            break;
          case allImages[0].includes('front'):
            let splitFrontName = allImages[0].split('_');
            const front_image = allImages[1];
            oldPath = front_image['filepath'];
            fileExtention = path.extname(front_image['originalFilename']);
            uniqueName = splitFrontName[splitFrontName.length - 1];
            newPath = `${finalFolder}/front/${uniqueName}${fileExtention}`;
            fse.move(oldPath, newPath, { overwrite: true });
            images_information['images'][0]['front'].forEach(
              (elem: any, index: number) => {
                if (
                  elem?.['color'] == splitFrontName[splitFrontName.length - 1]
                ) {
                  const seperatePath = newPath.split('/');
                  const removePublicPath = seperatePath.filter(
                    (a: string) => a !== 'public'
                  );
                  const seperatePathFromAdmin = removePublicPath.splice(
                    removePublicPath.indexOf('admin'),
                    removePublicPath.length - removePublicPath.indexOf('admin')
                  );
                  const path = seperatePathFromAdmin.join('/');
                  elem.path = newPath;
                  elem.src = `/${path}`;
                }
              }
            );
            break;

          default:
            console.log('default');
            break;
        }
      }
      body['images'] = body['images_information']['images'];
      delete body['images_information'];
      body['gallery'] = body['gallery_information']['gallery'];
      delete body['gallery_information'];
      console.log(body['images']);
      console.log(body['gallery']);
      const newProduct = new Products(body);
      newProduct.save(async (err: Error, result: any) => {
        if (err) {
          res
            .status(401)
            .json({ success: false, Error: '(error as Error).message' });
          fs.rmSync(finalFolder, { recursive: true, force: true });
        } else {
          await Colors.updateMany(
            { _id: { $in: result.colors_id } },
            { $push: { products_id: result._id } },
            { multi: true }
          );
          await Collections.updateOne(
            { _id: { $in: result.collection_id } },
            { $push: { products_id: result._id } },
            { multi: false }
          );
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
