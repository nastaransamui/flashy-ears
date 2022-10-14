import { faker } from '@faker-js/faker';
import Users from '@/models/Users';
import Roles from '@/models/Roles';
function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var ObjectId = require('mongodb').ObjectID;

export const addUsersFaker = () => {
  let timeSeriesData = [];
  for (let i = 0; i < 10000; i++) {
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
      role_id: [ObjectId('63437d0d282d1427c89a48e0')],
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
  // console.log(timeSeriesData);
  Users.insertMany(timeSeriesData, async (err, data) => {
    console.log(err);
    //Seperate _ids from users
    const usersIdArray = data.map((a) => a._id);
    // add current user to array of Ids
    usersIdArray.push(ObjectId('63437d0d282d1427c89a48de'));
    console.log(usersIdArray);
    await Roles.updateOne(
      {
        _id: ObjectId('63437d0d282d1427c89a48e0'),
      },
      {
        $set: {
          users_id: usersIdArray,
        },
      }
    );
  });
};
