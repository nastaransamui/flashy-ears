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
import { isObjectEmpty } from '@/helpers/functions';
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
  data?: IProducts;
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
      let {
        _id,
        product_label_en,
        product_label_th,
        product_name_en,
        product_name_th,
        product_subtitle_en,
        product_subtitle_th,
        product_description_en,
        product_description_th,
        colors_id,
        collection_id,
        financials,
        images_information,
        gallery_information,
        deletedGalleryArray,
        deletedColor,
        deletedImagesArray,
      } = req.body;
      var fileExtention: string;
      var uniqueName;
      var oldPath;
      var newPath: string;
      let product = await Products.findById(_id);
      let finalFolder = `${process.cwd()}/public/products/${
        product.product_name_en
      }`;
      deletedGalleryArray =
        deletedGalleryArray == 'undefined'
          ? false
          : JSON.parse(deletedGalleryArray);
      deletedColor =
        deletedColor == 'undefined' ? false : JSON.parse(deletedColor);
      deletedImagesArray =
        deletedImagesArray == 'undefined'
          ? false
          : JSON.parse(deletedImagesArray);
      //@ts-ignore
      const files = req.files;
      const body = req.body;
      let isAnyFileDelete =
        Array.isArray(deletedGalleryArray) ||
        Array.isArray(deletedColor) ||
        Array.isArray(deletedImagesArray);
      let isAnyFileUpload = !isObjectEmpty(files);
      var galleryUploadResolve: any;
      var imageFrontUploadResolve: any;
      var imageBackUploadResolve: any;
      var deletedGalleryResolve: any;
      var deletedColorResolve: any;
      var deletedImagesResolve: any;
      let deletePromise = new Promise(async (deleteResolve, deleteReject) => {
        if (isAnyFileDelete) {
          let deletedGalleryPromise = new Promise(async (r, j) => {
            deletedGalleryResolve = r;
          });

          let deletedColorPromise = new Promise(async (r, j) => {
            deletedColorResolve = r;
          });
          let deletedImagesPromise = new Promise(async (r, j) => {
            deletedImagesResolve = r;
          });
          if (typeof deletedGalleryArray == 'boolean') {
            deletedGalleryResolve(true);
          }
          if (typeof deletedColor == 'boolean') {
            deletedColorResolve(true);
          }
          if (typeof deletedImagesArray == 'boolean') {
            deletedImagesResolve(true);
          }

          if (typeof deletedGalleryArray == 'object') {
            gallery_information = gallery_information.filter(
              (b: any) =>
                !deletedGalleryArray.map((a: any) => a.src).includes(b.src)
            );
            deletedGalleryArray.forEach((elem: any) => {
              fs.unlink(elem.path, (err: any) => {
                if (err) {
                  res
                    .status(401)
                    .json({ success: false, Error: (err as Error).message });
                  return;
                }
              });
              deletedGalleryResolve(true);
            });
          }
          if (typeof deletedColor == 'object') {
            deletedColor.forEach((_id: string) => {
              fs.readdir(`${finalFolder}/front`, (err, files) => {
                files.forEach((file) => {
                  if (path.parse(file).name == _id) {
                    fs.unlinkSync(`${finalFolder}/front/${file}`);
                  }
                });
              });
              fs.readdir(`${finalFolder}/back`, (err, files) => {
                files.forEach((file) => {
                  if (path.parse(file).name == _id) {
                    fs.unlink(`${finalFolder}/back/${file}`, (err: any) => {
                      if (err) {
                        res.status(401).json({
                          success: false,
                          Error: (err as Error).message,
                        });
                        return;
                      }
                    });
                  }
                });
              });
              deletedColorResolve(true);
            });
          }
          if (typeof deletedImagesArray == 'object') {
            deletedImagesArray.forEach((elem: any) => {
              fs.unlink(elem.path, (err: any) => {
                if (err) {
                  res
                    .status(401)
                    .json({ success: false, Error: (err as Error).message });
                  return;
                }
              });
            });

            deletedImagesResolve(true);
          }
          Promise.all([
            deletedGalleryPromise,
            deletedColorPromise,
            deletedImagesPromise,
          ]).then((values) => {
            deleteResolve(true);
          });
        } else {
          deleteResolve(true);
        }
      });

      Promise.resolve(deletePromise).then(async (value) => {
        let changeColorPromise = new Promise(
          async (colorChangeResolve, colorChangeReject) => {
            await Colors.updateMany(
              { _id: { $in: product.colors_id } },
              { $pull: { products_id: _id } },
              { multi: true }
            );
            await Colors.updateMany(
              { _id: { $in: colors_id } },
              { $push: { products_id: _id } },
              { multi: true }
            );
            colorChangeResolve(true);
          }
        );
        let changeCollectionPromise = new Promise(
          async (collectionChangeResolve, collectionChangeReject) => {
            await Collections.updateMany(
              { _id: { $in: product.collection_id } },
              { $pull: { products_id: _id } },
              { multi: true }
            );
            await Collections.updateMany(
              { _id: { $in: collection_id } },
              { $push: { products_id: _id } },
              { multi: true }
            );
            collectionChangeResolve(true);
          }
        );
        let uploadPromise = new Promise(async (uploadResolve, uploadReject) => {
          if (isAnyFileUpload) {
            let galleryPromise = new Promise(async (r, j) => {
              galleryUploadResolve = r;
            });

            let imagefrontPromise = new Promise(async (r, j) => {
              imageFrontUploadResolve = r;
            });
            let imagebackPromise = new Promise(async (r, j) => {
              imageBackUploadResolve = r;
            });
            Object.entries(files).forEach(async (doc: any, index) => {
              if (!doc[0].includes('newgallery')) {
                galleryUploadResolve(true);
              }
              if (!doc[0].includes('back')) {
                imageBackUploadResolve(true);
              }
              if (!doc[0].includes('front')) {
                imageFrontUploadResolve(true);
              }
              if (doc[0] == 'newgallery') {
                if (Array.isArray(doc[1])) {
                  body.gallery_information.forEach(
                    (elem: any, index: number) => {
                      for (const a of doc[1] as any) {
                        if (elem['tags'][0]['title'] == a['originalFilename']) {
                          oldPath = a['filepath'];
                          fileExtention = path.extname(a['originalFilename']);
                          uniqueName = uuidv4();
                          newPath = `${finalFolder}/gallery/${uniqueName}${fileExtention}`;
                          let gallerySrc = `/admin/products/${product.product_name_en}/gallery/${uniqueName}${fileExtention}`;
                          elem['path'] = newPath;
                          elem['src'] = gallerySrc;
                          elem['isSelected'] = elem['isSelected'] || false;
                          galleryUploadResolve(true);
                          fse.move(oldPath, newPath, { overwrite: true });
                        }
                      }
                    }
                  );
                } else {
                  body.gallery_information.forEach(
                    (elem: any, index: number) => {
                      if (
                        elem['tags'][0]['title'] == doc[1]['originalFilename']
                      ) {
                        oldPath = doc[1]['filepath'];
                        fileExtention = path.extname(
                          doc[1]['originalFilename']
                        );
                        uniqueName = uuidv4();
                        newPath = `${finalFolder}/gallery/${uniqueName}${fileExtention}`;
                        let gallerySrc = `/admin/products/${product.product_name_en}/gallery/${uniqueName}${fileExtention}`;
                        elem['path'] = newPath;
                        elem['src'] = gallerySrc;
                        elem['isSelected'] = elem['isSelected'] || true;
                        galleryUploadResolve(true);
                        fse.move(oldPath, newPath, { overwrite: true });
                      }
                    }
                  );
                }
              } else {
                let splitNameArray = doc[0].split('_');
                if (splitNameArray[1] == 'back') {
                  images_information[1]['back'].forEach(
                    (elem: any, index: number) => {
                      if (splitNameArray[2] == elem['color']) {
                        oldPath = doc[1]['filepath'];
                        fileExtention = path.extname(
                          doc[1]['originalFilename']
                        );
                        uniqueName = splitNameArray[2];
                        newPath = `${finalFolder}/back/${uniqueName}${fileExtention}`;
                        let backSrc = `/admin/products/${product.product_name_en}/back/${uniqueName}${fileExtention}`;
                        fse.move(oldPath, newPath, { overwrite: true });
                        elem['src'] = backSrc;
                        elem['path'] = newPath;
                        imageBackUploadResolve(true);
                      }
                    }
                  );
                }
                if (splitNameArray[1] == 'front') {
                  images_information[0]['front'].forEach(
                    (elem: any, index: number) => {
                      if (splitNameArray[2] == elem['color']) {
                        oldPath = doc[1]['filepath'];
                        fileExtention = path.extname(
                          doc[1]['originalFilename']
                        );
                        uniqueName = splitNameArray[2];
                        newPath = `${finalFolder}/front/${uniqueName}${fileExtention}`;
                        let frontSrc = `/admin/products/${product.product_name_en}/front/${uniqueName}${fileExtention}`;
                        fse.move(oldPath, newPath, { overwrite: true });
                        elem['src'] = frontSrc;
                        elem['path'] = newPath;
                        imageFrontUploadResolve(true);
                      }
                    }
                  );
                }
              }
            });
            Promise.all([
              galleryPromise,
              imagefrontPromise,
              imagebackPromise,
            ]).then((values) => {
              uploadResolve(true);
            });
          } else {
            uploadResolve(true);
          }
        });

        Promise.all([
          uploadPromise,
          changeColorPromise,
          changeCollectionPromise,
        ]).then(
          async (values) => {
            try {
              let oldName = product.product_name_en;
              let newName = product_name_en;
              body['images'] = body['images_information'];
              delete body['images_information'];
              body['gallery'] = body['gallery_information'];
              delete body['gallery_information'];
              delete body['deletedGalleryArray'];
              delete body['deletedColor'];
              delete body['deletedImagesArray'];
              if (oldName == newName) {
                let newProduct = await Products.findByIdAndUpdate(_id, body, {
                  returnDocument: 'after',
                });
                res.status(200).json({ success: true, data: newProduct });
              } else {
                let newFinalFolder = `${process.cwd()}/public/products/${newName}`;
                fs.renameSync(finalFolder, newFinalFolder);
                //Todo bug not update the folder
                JSON.parse(JSON.stringify(body.gallery)).forEach(
                  (elem: any, index: number) => {
                    const seperatePath = elem['src'].split('/');
                    const indexOfProducts = seperatePath.findIndex(
                      (a: string) => a == 'products'
                    );
                    seperatePath[indexOfProducts + 1] = newName;
                    const newPathOfSrc = seperatePath.join('/');
                    elem['src'] = newPathOfSrc;
                    elem['path'] = elem['path'].replace(
                      finalFolder,
                      newFinalFolder
                    );
                  }
                );
                body['images'][0]['front'].forEach(
                  (elem: any, index: number) => {
                    const seperatePath = elem['src'].split('/');
                    const indexOfProducts = seperatePath.findIndex(
                      (a: string) => a == 'products'
                    );
                    seperatePath[indexOfProducts + 1] = newName;
                    const newPathOfSrc = seperatePath.join('/');
                    elem['src'] = newPathOfSrc;
                    elem['path'] = elem['path'].replace(
                      finalFolder,
                      newFinalFolder
                    );
                  }
                );
                body['images'][1]['back'].forEach(
                  (elem: any, index: number) => {
                    const seperatePath = elem['src'].split('/');
                    const indexOfProducts = seperatePath.findIndex(
                      (a: string) => a == 'products'
                    );
                    seperatePath[indexOfProducts + 1] = newName;
                    const newPathOfSrc = seperatePath.join('/');
                    elem['src'] = newPathOfSrc;
                    elem['path'] = elem['path'].replace(
                      finalFolder,
                      newFinalFolder
                    );
                  }
                );
                JSON.stringify(body.gallery);
                console.log(body.gallery);
                let newProduct = await Products.findByIdAndUpdate(_id, body, {
                  returnDocument: 'after',
                });
                res.status(200).json({ success: true, data: newProduct });
              }
            } catch (error) {
              res
                .status(401)
                .json({ success: false, Error: (error as Error).message });
            }
          },
          (errors) => {
            res
              .status(401)
              .json({ success: false, Error: (errors as Error).message });
          }
        );
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
