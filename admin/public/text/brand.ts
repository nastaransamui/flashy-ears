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
  img_white: string;
  img_black: string;
  notifMsg_en: string;
  notifMsg_fa: string;
}

const brand: Brand = (module.exports = {
  name_en: 'Flashy Ears',
  name_fa: 'گوشواره های پر زرق و برق',
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
  img_white: '/images/logo_white.png',
  img_black: '/images/logo_black.png',
  notifMsg_en: 'Notif Message.',
  notifMsg_fa: 'پیام نوتیف.',
});

export default brand;
