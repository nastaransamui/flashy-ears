import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { dbCheck } from 'middleware/dbCheck';
import Products from '@/models/Products';
import _ from 'lodash';
var ObjectId = require('mongodb').ObjectID;
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

apiRoute.get(dbCheck, async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  if (_.isEmpty(query)) {
    const productItems = await Products.aggregate([
      {
        $sort: { product_label_en: 1 },
      },
      {
        $lookup: {
          from: 'colors',
          localField: 'colors_id',
          foreignField: '_id',
          as: 'colors',
        },
      },
      {
        $lookup: {
          from: 'collections',
          localField: 'collection_id',
          foreignField: '_id',
          as: 'collectionData',
        },
      },
    ]);

    res.status(200).json({ success: true, productItems: productItems });
  } else {
    const collectionId = query._id;
    const match =
      collectionId == undefined
        ? {}
        : { collection_id: { $in: [ObjectId(collectionId)] } };
    console.log(match);
    const productItems = await Products.aggregate([
      { $match: match },
      {
        $sort: { product_label_en: 1 },
      },
      {
        $lookup: {
          from: 'colors',
          localField: 'colors_id',
          foreignField: '_id',
          as: 'colors',
        },
      },
      {
        $lookup: {
          from: 'collections',
          localField: 'collection_id',
          foreignField: '_id',
          as: 'collectionData',
        },
      },
    ]);
    res.status(200).json({ success: true, productItems: productItems });
  }
});

export default apiRoute;
