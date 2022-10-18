import { faker } from '@faker-js/faker';
import Users from '@/models/Users';
import Roles from '@/models/Roles';
import Videos from '@/models/Videos';
import { faker as farsiFaker } from '@faker-js/faker/locale/fa';
import Photos from '@/models/Photos';
import Features from '@/models/Features';

var ObjectId = require('mongodb').ObjectID;

export const addUsersFaker = () => {
  let timeSeriesData = [];
  for (let i = 0; i < 1000; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    let user = {
      userName: faker.internet.email(firstName, lastName).toLowerCase(),
      password: 'U2FsdGVkX197jTV5P20MTiKLpRO0Vq46tgNeXjWoC04=',
      profileImage: faker.image.avatar(),
      prifleImageKey: '',
      finalFolder: 'so',
      folderId: 'so',
      firstName,
      lastName,
      role_id: [ObjectId('6348d23e94a61b2193d719a7')],
      roleName: 'Super User',
      agents_id: [],
      city_id: [],
      cityName: '',
      provinde_id: [],
      provinceName: '',
      country_id: [],
      countryName: '',
      position: faker.company.name(),
      aboutMe: faker.lorem.paragraph(),
      isAdmin: true,
      isVercel: false,
      accessToken: '',
      facebook: [],
      google: [],
      twitter: [],
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    };
    timeSeriesData.push(user);
  }
  Users.insertMany(timeSeriesData, async (err, data) => {
    console.log(err);
    //Seperate _ids from users
    // console.log(data);
    if (data !== undefined) {
      const usersIdArray = data.map((a) => a._id);
      // add current user to array of Ids
      // usersIdArray.push(ObjectId('6348c1d8e5875d7b0513eda2'));
      console.log(usersIdArray);
      await Roles.updateOne(
        {
          _id: ObjectId('6348d23e94a61b2193d719a7'),
        },
        {
          $push: {
            users_id: [...usersIdArray],
          },
        }
      );
    }
  });
};
var routes = [
  {
    state: 'dashboardMain',
    access: true,
  },
  {
    state: 'userCollapse',
    access: true,
  },
  {
    state: 'usersMultiCollapse',
    access: true,
  },
  {
    state: 'userMultiCollapse',
    access: true,
  },
  {
    state: 'roleCollapse',
    access: true,
  },
  {
    state: 'rolesMultiCollapse',
    access: true,
  },
  {
    state: 'roleMultiCollapse',
    access: true,
  },
  {
    state: 'mainPageCollapse',
    access: true,
  },
  {
    state: 'videoMultiCollapse',
    access: true,
  },
  {
    state: 'videosCollapse',
    access: true,
  },
  {
    state: 'videoCollapse',
    access: true,
  },
  {
    state: 'photoMultiCollapse',
    access: true,
  },
  {
    state: 'photosCollapse',
    access: true,
  },
  {
    state: 'photoCollapse',
    access: true,
  },
  {
    state: 'featureMultiCollapse',
    access: true,
  },
  {
    state: 'featuresCollapse',
    access: true,
  },
  {
    state: 'featureCollapse',
    access: true,
  },
  {
    state: 'aboutCollapse',
    access: true,
  },
  {
    state: 'mainDataCollapse',
    access: true,
  },
  {
    state: 'allGlobeCollapse',
    access: true,
  },
  {
    state: 'gCountriesCollapse',
    access: true,
  },
  {
    state: 'gCurrenciesMultiCollapse',
    access: true,
  },
  {
    state: 'gHotelsMultiCollapse',
    access: true,
  },
  {
    state: 'activeGlobeCollapse',
    access: true,
  },
  {
    state: 'aCountriesCollapse',
    access: true,
  },
  {
    state: 'aProvincesCollapse',
    access: true,
  },
  {
    state: 'aCitiesCollapse',
    access: true,
  },
  {
    state: 'aCurrenciesMultiCollapse',
    access: true,
  },
  {
    state: 'agencyDataCollapse',
    access: true,
  },
  {
    state: 'agenciesCollapse',
    access: true,
  },
  {
    state: 'agencyCollapse',
    access: true,
  },
  {
    state: 'hotelsDataCollapse',
    access: true,
  },
  {
    state: 'hotelsCollapse',
    access: true,
  },
  {
    state: 'hotelCollapse',
    access: true,
  },
];

export const addRolesFaker = () => {
  let timeSeriesData = [];
  for (let i = 0; i < 1000; i++) {
    const roleName =
      faker.company.name() + faker.name.firstName() + faker.name.lastName();
    let role = {
      roleName,
      users_id: [],
      remark: faker.lorem.paragraph(),
      isActive: false,
      routes: routes,
      icon: 'M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3z',
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    };
    timeSeriesData.push(role);
  }
  Roles.insertMany(timeSeriesData, async (err, data) => {
    console.log(err);
  });
};

export const addVideosFaker = () => {
  let timeSeriesData = [];
  for (let i = 0; i < 1000; i++) {
    const title_en = faker.name.firstName();
    const title_fa = farsiFaker.name.firstName();
    const topTitle_en = faker.name.firstName();
    const topTitle_fa = farsiFaker.name.firstName();
    const subTitle_en = faker.name.firstName();
    const subTitle_fa = farsiFaker.name.firstName();
    const button_en = faker.name.firstName();
    const button_fa = farsiFaker.name.firstName();

    let video = {
      title_en,
      title_fa,
      topTitle_en,
      topTitle_fa,
      subTitle_en,
      subTitle_fa,
      button_en,
      button_fa,
      imageMobileShowKey:
        'videos/ebz34/ef1c48d7-3ed9-43ce-a48c-50fe143f1492.jpg',
      videoPosterKey: 'videos/ebz34/b4cc61dd-28fd-4e04-aa5f-95402fe37d32.jpg',
      videoLinkKey: 'videos/ebz34/27faaf4e-8091-49cb-ae69-646f147237d8.mp4',
      youTubeId: i % 2 == 0 ? 'CK1ndZEkBcE' : '',
      finalFolder: 'videos',
      folderId: 'ebz34',
      isActive: i % 2 == 0 ? true : false,
      isYoutube: i % 2 == 0 ? true : false,
      isVercel: false,
      imageMobileShow: 'https://picsum.photos/id/124/1280/720',
      videoPoster: 'https://picsum.photos/id/13/1280/720',
      videoLink: 'http://media.w3.org/2010/05/bunny/movie.mp4',
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    };
    timeSeriesData.push(video);
  }
  Videos.insertMany(timeSeriesData, async (err, data) => {
    console.log(err);
  });
};

export const addPhotosFaker = () => {
  let timeSeriesData = [];
  for (let i = 0; i < 1000; i++) {
    const title_en = faker.name.firstName();
    const title_fa = farsiFaker.name.firstName();
    const topTitle_en = faker.name.firstName();
    const topTitle_fa = farsiFaker.name.firstName();
    const subTitle_en = faker.name.firstName();
    const subTitle_fa = farsiFaker.name.firstName();
    const button_en = faker.name.firstName();
    const button_fa = farsiFaker.name.firstName();

    let video = {
      title_en,
      title_fa,
      topTitle_en,
      topTitle_fa,
      subTitle_en,
      subTitle_fa,
      button_en,
      button_fa,
      finalFolder: 'photos',
      folderId: 'ebz34',
      isActive: i % 2 == 0 ? true : false,
      isVercel: false,
      imageShow: faker.image.avatar(),
      imageShowKey: 'photo/ebz34/b4cc61dd-28fd-4e04-aa5f-95402fe37d32.jpg',
      // createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    };
    timeSeriesData.push(video);
  }
  Photos.insertMany(timeSeriesData, async (err, data) => {
    console.log(err);
  });
};

export const addFeaturesFaker = () => {
  let timeSeriesData = [];
  for (let i = 0; i < 2000; i++) {
    const title_en = faker.name.firstName();
    const title_fa = farsiFaker.name.firstName();

    let video = {
      title_en,
      title_fa,
      imageShow: faker.image.avatar(),
      imageShowKey: 'photo/ebz34/b4cc61dd-28fd-4e04-aa5f-95402fe37d32.jpg',
      videoLink: 'http://media.w3.org/2010/05/bunny/movie.mp4',
      videoLinkKey: 'features/ebz34/27faaf4e-8091-49cb-ae69-646f147237d8.mp4',
      youTubeId: i % 2 == 0 ? 'CK1ndZEkBcE' : '',
      finalFolder: 'features',
      folderId: 'ebz34',
      isActive: i % 2 == 0 ? true : false,
      isVercel: false,
      isYoutube: i % 2 == 0 ? true : false,
      // createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    };
    timeSeriesData.push(video);
  }
  Features.insertMany(timeSeriesData, async (err, data) => {
    console.log(err);
  });
};
