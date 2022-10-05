import AccountBox from '@mui/icons-material/AccountBox';
import Dashboard from '@mui/icons-material/Dashboard';
import Apps from '@mui/icons-material/Apps';
import Public from '@mui/icons-material/Public';
import AttachMoney from '@mui/icons-material/AttachMoney';
import DataThresholding from '@mui/icons-material/DataThresholding';
import Apartment from '@mui/icons-material/Apartment';
import SouthAmerica from '@mui/icons-material/SouthAmerica';
import Badge from '@mui/icons-material/Badge';
import AccountTree from '@mui/icons-material/AccountTree';
import HotelIcon from '@mui/icons-material/Hotel';
import { RoutesType } from '@/interfaces/react.interface';

var dashRoutes: RoutesType[] = (module.exports = [
  {
    path: '/',
    name_en: 'Dashboard',
    name_fa: 'داشبورد',
    // @ts-ignore
    icon: Dashboard.type?.render().props.children.props.d,
    state: 'dashboardMain',
    //layout: '/admin',
  },
  {
    path: '/user-page',
    collapse: true,
    name_en: 'Users',
    name_fa: 'کاربران',
    // @ts-ignore
    icon: Badge.type?.render().props.children.props.d,
    state: 'userCollapse',
    //layout: '/admin',
    views: [
      {
        path: '/users-page',
        name_en: 'Users List',
        name_fa: 'لیست کاربران',
        mini_en: 'UL',
        mini_fa: 'ل ک',
        state: 'usersMultiCollapse',
        //layout: '/admin',
      },
      {
        path: '/user-page/user',
        name_en: 'Create user',
        name_fa: 'ایجاد کاربر ',
        mini_en: 'CU',
        mini_fa: 'ا ک',
        state: 'userMultiCollapse',
        //layout: '/admin',
      },
    ],
  },
  {
    path: '/rbac-data',
    collapse: true,
    name_en: 'Roles',
    name_fa: 'نقش ها',
    // @ts-ignore
    icon: AccountTree.type?.render().props.children.props.d,
    state: 'roleCollapse',
    //layout: '/admin',
    views: [
      {
        path: '/rbacs-data',
        name_en: 'Roles List',
        name_fa: 'لیست نقش ها',
        mini_en: 'RL',
        mini_fa: 'ل ن',
        state: 'rolesMultiCollapse',
        //layout: '/admin',
      },
      {
        path: '/rbac-data/role',
        name_en: 'Create role',
        name_fa: 'ایجاد نقش ',
        mini_en: 'CR',
        mini_fa: 'ا ن',
        state: 'roleMultiCollapse',
        //layout: '/admin',
      },
    ],
  },
  {
    path: '/main-page-setup',
    collapse: true,
    name_en: 'Main page setup',
    name_fa: 'صفحه اصلی',
    // @ts-ignore
    icon: Apps.type?.render().props.children.props.d,
    state: 'mainPageCollapse',
    views: [
      {
        collapse: true,
        name_en: 'Video banner',
        name_fa: 'بنر ویدیویی',
        mini_en: 'VB',
        mini_fa: 'ب و',
        state: 'videoMultiCollapse',
        path: '/main-page-setup',
        //layout: '/admin',
        views: [
          {
            path: '/main-page-setup/videos',
            name_en: 'Videos List',
            name_fa: 'فیلم های',
            mini_en: 'V',
            mini_fa: 'ف',
            state: 'videosCollapse',
            //layout: '/admin',
          },
          {
            path: '/main-page-setup/videos/video',
            name_en: 'Add video',
            name_fa: 'فیلم',
            mini_en: 'V',
            mini_fa: 'ف',
            state: 'videoCollapse',
            //layout: '/admin',
          },
        ],
      },
      {
        collapse: true,
        name_en: 'Photo slider',
        name_fa: 'نوار عکس',
        mini_en: 'PS',
        mini_fa: 'ن ع',
        state: 'photoMultiCollapse',
        views: [
          {
            path: '/main-page-setup/photos',
            name_en: 'Photos List',
            name_fa: 'عکس ها',
            mini_en: 'P',
            mini_fa: 'ع',
            state: 'photosCollapse',
            //layout: '/admin',
          },
          {
            path: '/main-page-setup/photos/photo',
            name_en: 'Add Photo',
            name_fa: 'عکس',
            mini_en: 'P',
            mini_fa: 'ع',
            state: 'photoCollapse',
            //layout: '/admin',
          },
        ],
      },
      {
        collapse: true,
        name_en: 'Features slider',
        name_fa: 'امکانات',
        mini_en: 'FS',
        mini_fa: 'ا',
        state: 'featureMultiCollapse',
        path: '/main-page-setup',
        //layout: '/admin',
        views: [
          {
            path: '/main-page-setup/features',
            name_en: 'Features List',
            name_fa: 'امکانات',
            mini_en: 'F',
            mini_fa: 'ا',
            state: 'featuresCollapse',
            //layout: '/admin',
          },
          {
            path: '/main-page-setup/features/feature',
            name_en: 'Add Feature',
            name_fa: 'ویژگی',
            mini_en: 'F',
            mini_fa: 'و',
            state: 'featureCollapse',
            //layout: '/admin',
          },
        ],
      },
      {
        name_en: 'About us',
        name_fa: 'درباره',
        mini_en: 'AU',
        mini_fa: 'د',
        state: 'aboutCollapse',
        path: '/main-page-setup/about',
        //layout: '/admin',
      },
    ],
  },
  {
    path: '/dashboard',
    collapse: true,
    name_en: 'Main Data Activation',
    name_fa: 'فعال سازی داده های اصلی',
    // @ts-ignore
    icon: DataThresholding.type?.render().props.children.props.d,
    state: 'mainDataCollapse',
    //layout: '/admin',
    views: [
      {
        collapse: true,
        name_en: 'All',
        name_fa: 'همه',
        mini_en: 'A',
        mini_fa: 'ه',
        state: 'allGlobeCollapse',
        views: [
          {
            path: '/g-locations/countries',
            name_en: 'All countries',
            name_fa: 'همه کشورها',
            mini_en: 'AC',
            mini_fa: 'ه ک',
            state: 'gCountriesCollapse',
            //layout: '/admin',
          },
          {
            path: '/g-currencies/currencies',
            name_en: 'All currencies',
            name_fa: 'همه ارزها',
            mini_en: 'AC',
            mini_fa: 'ه ا',
            state: 'gCurrenciesMultiCollapse',
            //layout: '/admin',
          },
          {
            path: '/g-hotels/allhotels',
            name_en: 'All Hotels',
            name_fa: 'همه هتلها',
            mini_en: 'AH',
            mini_fa: 'ه ه',
            state: 'gHotelsMultiCollapse',
            //layout: '/admin',
          },
        ],
      },
      {
        collapse: true,
        name_en: 'Only actives',
        name_fa: 'فقط فعال',
        mini_en: 'OA',
        mini_fa: 'ف',
        state: 'activeGlobeCollapse',
        views: [
          {
            path: '/a-locations/countries',
            name_en: 'Active countries',
            name_fa: 'کشورها فعال',
            mini_en: 'AC',
            mini_fa: 'ک',
            state: 'aCountriesCollapse',
            //layout: '/admin',
            // @ts-ignore
            icon: Public.type?.render().props.children.props.d,
          },
          {
            path: '/a-locations/provinces',
            name_en: 'Active provinces/states',
            name_fa: 'استان ها / ایالتهای فعال',
            mini_en: 'AP',
            mini_fa: ' ا',
            state: 'aProvincesCollapse',
            //layout: '/admin',
            // @ts-ignore
            icon: SouthAmerica.type?.render().props.children.props.d,
          },
          {
            path: '/a-locations/cities',
            name_en: 'Active cities',
            name_fa: 'شهرها ی فعال',
            mini_en: 'AC',
            mini_fa: 'ش',
            state: 'aCitiesCollapse',
            //layout: '/admin',
            // @ts-ignore
            icon: Apartment.type?.render().props.children.props.d,
          },
          {
            path: '/a-currencies/currencies',
            name_en: 'Active currencies',
            name_fa: 'ارزهای فعال',
            mini_en: 'AC',
            mini_fa: 'ک',
            state: 'aCurrenciesMultiCollapse',
            //layout: '/admin',
            // @ts-ignore
            icon: AttachMoney.type?.render().props.children.props.d,
          },
          // {
          //   path: '/dashboard/a-hotels/hotels',
          //   'name_en': 'Active hotels',
          //   name_fa: 'هتلهای فعال',
          //   'mini_en': 'AH',
          //   mini_fa: 'ه',
          //   state: 'aHotelsMultiCollapse',
          ////   layout: '/admin',
          //   icon: HotelIcon.type?.render().props.children.props.d,
          // },
        ],
      },
    ],
  },
  {
    path: '/dashboard',
    collapse: true,
    name_en: 'Agency/Client Data',
    name_fa: 'اطلاعات آژانس/مشتری',
    // @ts-ignore
    icon: AccountBox.type?.render().props.children.props.d,
    state: 'agencyDataCollapse',
    views: [
      {
        path: '/client-data/clients',
        name_en: 'Agencies List',
        name_fa: 'فهرست آژانس ها',
        mini_en: 'AL',
        mini_fa: 'ف آ',
        state: 'agenciesCollapse',
        //layout: '/admin',
      },
      {
        path: '/client-data/clients/client',
        name_en: 'Add agency',
        name_fa: 'آژانس اضافه کنید',
        mini_en: 'AA',
        mini_fa: 'آا',
        state: 'agencyCollapse',
        //layout: '/admin',
      },
    ],
  },
  {
    path: '/dashboard',
    collapse: true,
    name_en: 'Hotels Data',
    name_fa: 'اطلاعات هتلها',
    // @ts-ignore
    icon: HotelIcon.type?.render().props.children.props.d,
    state: 'hotelsDataCollapse',
    views: [
      {
        path: '/hotel-data/hotels',
        name_en: 'Hotels List',
        name_fa: 'فهرست هتلها',
        mini_en: 'HL',
        mini_fa: 'ف ه',
        state: 'hotelsCollapse',
        //layout: '/admin',
      },
      {
        path: '/hotel-data/hotels/hotel',
        name_en: 'Add hotel',
        name_fa: 'هتل اضافه کنید',
        mini_en: 'AH',
        mini_fa: 'آه',
        state: 'hotelCollapse',
        //layout: '/admin',
      },
    ],
  },
]);

export default dashRoutes;
