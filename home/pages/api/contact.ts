import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
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

apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
  let nodemailer = require('nodemailer');
  const path = require('path');
  const transporter = nodemailer.createTransport({
    port: process.env.SMTP_PORT,
    host: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_EMAIL_USER,
      pass: process.env.SMTP_PASS,
    },
    secure: true,
  });
  const htmlEmail = fs.readFileSync(
    `${process.cwd()}/public/email/email.html`,
    // path.join(process.cwd(), 'public', '/email/email.html'),
    'utf-8'
  );

  var options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  } as const;
  var currentDate = new Date().toLocaleDateString('en-GB', options);
  var mailOptions = {
    from: process.env.SMTP_EMAIL_USER,
    to: `${req.body.email}, ${process.env.SMTP_EMAIL_USER}`,
    subject: req.body.subject,
    html: htmlEmail
      .replace('{{name}}', req.body.name)
      .replace('{{subject}}', req.body.subject)
      .replace('{{message}}', req.body.message)
      .replace('{{date}}', currentDate),
  };

  transporter.sendMail(mailOptions, function (error: Error, info: any) {
    if (error) {
      console.log(error);
      res.status(404).json({ success: false, message: error.toString() });
    } else {
      // console.log(info);
      res.status(200).json({
        success: true,
        message: `Email sent: ${info.accepted[0]}`,
      });
    }
  });
});

export default apiRoute;
