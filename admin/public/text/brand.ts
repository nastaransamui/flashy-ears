interface Brand {
  name_en: string;
  name_fa: string;
  desc_en: string;
  desc_fa: string;
  prefix_en: string;
  prefix_fa: string;
  footerText_en: string;
  footerText_fa: string;
  logoText_en: string;
  logoText_fa: string;
  projectName_en: string;
  projectName_fa: string;
  contactUs_en: string;
  contactUs_fa: string;
  url_en: string;
  url_fa: string;
  img_en: string;
  img_fa: string;
  notifMsg_en: string;
  notifMsg_fa: string;
}

const brand: Brand = (module.exports = {
  name_en: 'Name',
  name_fa: 'نام',
  desc_en: 'Description',
  desc_fa: 'شرح',
  prefix_en: 'perfix',
  prefix_fa: 'پرفیکس',
  footerText_en: 'Footer Text',
  footerText_fa: 'متن پاورقی',
  logoText_en: 'Logo Text',
  logoText_fa: 'متن لوگو',
  projectName_en: 'Project Name',
  projectName_fa: 'نام پروژه',
  contactUs_en: 'Contact us',
  contactUs_fa: 'تماس با ما',
  url_en: 'url',
  url_fa: 'آدرس اینترنتی',
  img_en: '/images/logo.png',
  img_fa: '/images/logo.png',
  notifMsg_en: 'Notif Message.',
  notifMsg_fa: 'پیام نوتیف.',
});

export default brand;
