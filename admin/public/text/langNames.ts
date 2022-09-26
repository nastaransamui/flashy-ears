interface Lang {
  id: number;
  title_en: string;
  title_fa: string;
  Lang: string;
  LangCode: string;
  Flag: string;
}


const langName: Lang[] = (module.exports = [
  {
    id: 2.1,
    title_en: 'English',
    title_fa: 'English',
    Lang: 'English',
    LangCode: 'en',
    Flag: 'en.png',
  },
  {
    id: 2.2,
    title_en: 'فارسی',
    title_fa: 'فارسی',
    Lang: 'Farsi',
    LangCode: 'fa',
    Flag: 'fa.png',
  },
]);

export default langName;
