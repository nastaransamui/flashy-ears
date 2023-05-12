import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import Collections from 'homeModels/Collections';
import { dbCheck } from 'middleware/dbCheck';
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

// let slides = [
//   // {
//   //   img: '/img/1',
//   //   desc_en: 'English first description comes here.',
//   //   desc_th: 'คำอธิบายฉบับภาษาไทยมา ณ ที่นี้',
//   //   title_en: 'Flashy Ears',
//   //   title_th: 'หูแว่ว',
//   //   linkTitle_en: 'Collections',
//   //   linkTitle_th: 'คอลเลกชัน',
//   //   link: '#',
//   // },
//   // {
//   //   img: '/img/2',
//   //   desc_en: 'English second description comes here.',
//   //   desc_th: 'คำอธิบายที่สองภาษาไทยมาค่ะ',
//   //   title_en: 'Flashy Ears',
//   //   title_th: 'หูแว่ว',
//   //   linkTitle_en: 'Collections',
//   //   linkTitle_th: 'คอลเลกชัน',
//   //   link: '#',
//   // },
//   // {
//   //   img: '/img/3',
//   //   desc_en: 'English third description comes here.',
//   //   desc_th: 'คำอธิบายสามภาษาไทยมาไว้ที่นี่',
//   //   title_en: 'Flashy Ears',
//   //   title_th: 'หูแว่ว',
//   //   linkTitle_en: 'Collections',
//   //   linkTitle_th: 'คอลเลกชัน',
//   //   link: '#',
//   // },
//   // {
//   //   img: '/img/4',
//   //   desc_en: 'English forth description comes here.',
//   //   desc_th: 'คำอธิบายภาษาไทยมาที่นี่',
//   //   title_en: 'Flashy Ears',
//   //   title_th: 'หูแว่ว',
//   //   linkTitle_en: 'Collections',
//   //   linkTitle_th: 'คอลเลกชัน',
//   //   link: '#',
//   // },
// ];

apiRoute.get(dbCheck, async (req: NextApiRequest, res: NextApiResponse) => {
  const slides = await Collections.find();
  res.status(200).json({ success: true, slides: slides });
});

export default apiRoute;
