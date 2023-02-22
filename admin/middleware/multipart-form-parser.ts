import formidable from 'formidable';
import type { NextApiRequest, NextApiResponse } from 'next';

const form = formidable({ multiples: true }); // multiples means req.files will be an array

export default async function parseMultipartForm(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  const contentType = req.headers['content-type'];
  if (contentType && contentType.indexOf('multipart/form-data') !== -1) {
    form.parse(req, (err: any, fields: any, files: any) => {
      if (!err) {
        req.body = fields; // sets the body field in the request object
        //@ts-ignore
        req.files = files; // sets the files field in the request object
      }
      next(); // continues to the next middleware or to the route
    });
  } else {
    next();
  }
}
