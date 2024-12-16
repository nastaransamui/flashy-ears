import { faker } from "@faker-js/faker";
import Users from "@/models/Users";
import Roles from "@/models/Roles";
import Videos from "@/models/Videos";
import { faker as farsiFaker } from "@faker-js/faker/locale/fa";
import Photos from "@/models/Photos";
import Features from "@/models/Features";
import Provinces from "@/models/Provinces";
import Countries from "@/models/Countries";
import Cities from "@/models/Cities";
import Agencies from "@/models/Agencies";
import mongoose, { Model } from "mongoose";

export const addUsersFaker = async (total: number) => {
  let timeSeriesData = [];
  for (let i = 0; i < total; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    let user = {
      userName: faker.internet.email(firstName, lastName).toLowerCase(),
      password: "U2FsdGVkX197jTV5P20MTiKLpRO0Vq46tgNeXjWoC04=",
      profileImage: faker.image.avatar(),
      prifleImageKey: "",
      finalFolder: "so",
      folderId: "so",
      firstName,
      lastName,
      role_id: [new mongoose.Types.ObjectId("6350dd3a28c3c4a13a1c7248")],
      roleName: "Super User",
      agents_id: [],
      city_id: [],
      cityName: "",
      provinde_id: [],
      provinceName: "",
      country_id: [],
      countryName: "",
      position: faker.company.name(),
      aboutMe: faker.lorem.paragraph(),
      isAdmin: true,
      isVercel: false,
      accessToken: "",
      facebook: [],
      google: [],
      twitter: [],
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    };
    timeSeriesData.push(user);
  }
  try {
    // Insert users
    const insertedUsers = await Users.insertMany(timeSeriesData);
    if (insertedUsers) {
      // Extract inserted user IDs
      const usersIdArray = insertedUsers.map((user) => user._id);
      console.log(usersIdArray);

      // Update roles with the new user IDs
      await Roles.updateOne(
        {
          _id: new mongoose.Types.ObjectId("6350dd3a28c3c4a13a1c7248"),
        },
        {
          $push: { users_id: { $each: usersIdArray } },
        }
      );

      console.log("Roles updated successfully with user IDs.");
    }
  } catch (error) {
    console.error("Error during user insertion or role update:", error);
  }
};
var routes = [
  {
    state: "dashboardMain",
    access: true,
  },
  {
    state: "userCollapse",
    access: true,
  },
  {
    state: "usersMultiCollapse",
    access: true,
  },
  {
    state: "userMultiCollapse",
    access: true,
  },
  {
    state: "roleCollapse",
    access: true,
  },
  {
    state: "rolesMultiCollapse",
    access: true,
  },
  {
    state: "roleMultiCollapse",
    access: true,
  },
  {
    state: "mainPageCollapse",
    access: true,
  },
  {
    state: "collectionMultiCollapse",
    access: true,
  },
  {
    state: "collectionsCollapse",
    access: true,
  },
  {
    state: "collectionCollapse",
    access: true,
  },
  {
    state: "photoMultiCollapse",
    access: true,
  },
  {
    state: "photosCollapse",
    access: true,
  },
  {
    state: "photoCollapse",
    access: true,
  },
  {
    state: "featureMultiCollapse",
    access: true,
  },
  {
    state: "featuresCollapse",
    access: true,
  },
  {
    state: "featureCollapse",
    access: true,
  },
  {
    state: "aboutCollapse",
    access: true,
  },
  {
    state: "mainDataCollapse",
    access: true,
  },
  {
    state: "allGlobeCollapse",
    access: true,
  },
  {
    state: "gCountriesCollapse",
    access: true,
  },
  {
    state: "gCurrenciesMultiCollapse",
    access: true,
  },
  {
    state: "gHotelsMultiCollapse",
    access: true,
  },
  {
    state: "activeGlobeCollapse",
    access: true,
  },
  {
    state: "aCountriesCollapse",
    access: true,
  },
  {
    state: "aProvincesCollapse",
    access: true,
  },
  {
    state: "aCitiesCollapse",
    access: true,
  },
  {
    state: "aCurrenciesMultiCollapse",
    access: true,
  },
  {
    state: "agencyDataCollapse",
    access: true,
  },
  {
    state: "agenciesCollapse",
    access: true,
  },
  {
    state: "agencyCollapse",
    access: true,
  },
  {
    state: "hotelsDataCollapse",
    access: true,
  },
  {
    state: "hotelsCollapse",
    access: true,
  },
  {
    state: "hotelCollapse",
    access: true,
  },
];

export const addRolesFaker = async (total: number) => {
  let timeSeriesData = [];
  for (let i = 0; i < total; i++) {
    const roleName =
      faker.company.name() + faker.name.firstName() + faker.name.lastName();
    let role = {
      roleName,
      users_id: [],
      remark: faker.lorem.paragraph(),
      isActive: false,
      routes: routes,
      icon: "M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3z",
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    };
    timeSeriesData.push(role);
  }
  try {
    // Insert users
    const insertedRoles = await Roles.insertMany(timeSeriesData);
    if (insertedRoles) {
      console.log("Roles updated successfully with user IDs.");
    }
  } catch (error) {
    console.error("Error during user insertion or role update:", error);
  }
};

export const addVideosFaker = async (total: number) => {
  let timeSeriesData = [];
  for (let i = 0; i < total; i++) {
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
        "videos/ebz34/ef1c48d7-3ed9-43ce-a48c-50fe143f1492.jpg",
      videoPosterKey: "videos/ebz34/b4cc61dd-28fd-4e04-aa5f-95402fe37d32.jpg",
      videoLinkKey: "videos/ebz34/27faaf4e-8091-49cb-ae69-646f147237d8.mp4",
      youTubeId: i % 2 == 0 ? "xcJtL7QggTI" : "",
      finalFolder: "videos",
      folderId: "ebz34",
      isActive: i % 2 == 0 ? true : false,
      isYoutube: i % 2 == 0 ? true : false,
      isVercel: false,
      imageMobileShow: "https://picsum.photos/id/124/1280/720",
      videoPoster: "https://picsum.photos/id/13/1280/720",
      videoLink: "http://media.w3.org/2010/05/bunny/movie.mp4",
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    };
    timeSeriesData.push(video);
  }
  try {
    // Insert users
    const insertedVideos = await Videos.insertMany(timeSeriesData);
    if (insertedVideos) {
      console.log("Videos updated successfully with user IDs.");
    }
  } catch (error) {
    console.error("Error during user insertion or role update:", error);
  }
};

export const addPhotosFaker = async (total: number) => {
  let timeSeriesData = [];
  for (let i = 0; i < total; i++) {
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
      finalFolder: "photos",
      folderId: "ebz34",
      isActive: i % 2 == 0 ? true : false,
      isVercel: false,
      imageShow: faker.image.avatar(),
      imageShowKey: "photo/ebz34/b4cc61dd-28fd-4e04-aa5f-95402fe37d32.jpg",
      // createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    };
    timeSeriesData.push(video);
  }
  try {
    // Insert users
    const insertedPhotos = await Photos.insertMany(timeSeriesData);
    if (insertedPhotos) {
      console.log("Photos updated successfully with user IDs.");
    }
  } catch (error) {
    console.error("Error during user insertion or role update:", error);
  }
};

export const addFeaturesFaker = async (total: number) => {
  let timeSeriesData = [];
  for (let i = 0; i < total; i++) {
    const title_en = faker.name.firstName();
    const title_fa = farsiFaker.name.firstName();

    let video = {
      title_en,
      title_fa,
      imageShow: faker.image.avatar(),
      imageShowKey: "photo/ebz34/b4cc61dd-28fd-4e04-aa5f-95402fe37d32.jpg",
      videoLink: "http://media.w3.org/2010/05/bunny/movie.mp4",
      videoLinkKey: "features/ebz34/27faaf4e-8091-49cb-ae69-646f147237d8.mp4",
      youTubeId: i % 2 == 0 ? "xcJtL7QggTI" : "",
      finalFolder: "features",
      folderId: "ebz34",
      isActive: i % 2 == 0 ? true : false,
      isVercel: false,
      isYoutube: i % 2 == 0 ? true : false,
      // createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    };
    timeSeriesData.push(video);
  }
  try {
    // Insert users
    const insertedFeatures = await Features.insertMany(timeSeriesData);
    if (insertedFeatures) {
      console.log("Features updated successfully with user IDs.");
    }
  } catch (error) {
    console.error("Error during user insertion or role update:", error);
  }
};

export const addAgenciesFaker = async (total: number) => {
  let timeSeriesData = [];
  for (let i = 0; i < total; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    let agent = {
      agentId: faker.datatype.string(5) + i,
      agentName: firstName + lastName + i,
      address: faker.address.cityName() + faker.address.country(),
      logoImage: faker.image.avatar(),
      logoImageKey: "",
      finalFolder: "so",
      folderId: "so",
      city_id: [
        i % 2 == 0
          ? new mongoose.Types.ObjectId("635f90bbee881d1d7fe5330b")
          : Object("635f90adee881d1d7fe4f972"),
      ],
      cityName: i % 2 == 0 ? "Airdrie" : "Abbotsbury",
      province_id: [
        i % 2 == 0
          ? new mongoose.Types.ObjectId("635f313ee82381e9a3f84505")
          : Object("635f313ee82381e9a3f84350"),
      ],
      provinceName: i % 2 == 0 ? "Alberta" : "New South Wales",
      country_id: [
        i % 2 == 0
          ? new mongoose.Types.ObjectId("634e6cd8c680cc9a50ac81ed")
          : Object("634e6cd8c680cc9a50ac81dd"),
      ],
      countryName: i % 2 == 0 ? "Canada" : "Australia",
      phones: [
        {
          tags: [i % 2 == 0 ? "Mobile" : "Company"],
          number: faker.phone.imei(),
          remark: faker.lorem.lines(1),
        },
        {
          tags: [i % 2 == 0 ? "Mobile" : "Company"],
          number: faker.phone.imei(),
          remark: faker.lorem.lines(1),
        },
        {
          tags: [i % 2 == 0 ? "Mobile" : "Company"],
          number: faker.phone.imei(),
          remark: faker.lorem.lines(1),
        },
        {
          tags: [i % 2 == 0 ? "Mobile" : "Company"],
          number: faker.phone.imei(),
          remark: faker.lorem.lines(1),
        },
      ],
      email: faker.internet.email(firstName, lastName).toLowerCase(),
      currencyCode_id: [
        i % 2 == 0
          ? new mongoose.Types.ObjectId("635f1f07fa784578cf07c6e0")
          : new mongoose.Types.ObjectId("635f1f07fa784578cf07c6c2"),
      ],
      currencyCode: i % 2 == 0 ? "CAD" : "AUD",
      creditAmount: faker.datatype.number({ min: 1000000 }),
      depositAmount: faker.datatype.number({ min: 1000000 }),
      remainCreditAmount: faker.datatype.number({ min: 1000000 }),
      remainDepositAmount: faker.datatype.number({ min: 1000000 }),
      userCreated: [new mongoose.Types.ObjectId("634e125be99740ef55a429b7")],
      userUpdated: [new mongoose.Types.ObjectId("634e125be99740ef55a429b7")],
      accountManager_id: [
        new mongoose.Types.ObjectId("634e125be99740ef55a429b7"),
      ],
      accountManager: "test@test.com",
      isActive: i % 2 == 0 ? true : false,
      isVercel: false,
      remark: faker.lorem.paragraph(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    };
    timeSeriesData.push(agent);
  }
  try {
    // Insert users
    const insertedAgencies = await Agencies.insertMany(timeSeriesData);
    if (insertedAgencies) {
      console.log("Agencies updated successfully with user IDs.");
    }
  } catch (error) {
    console.error("Error during user insertion or role update:", error);
  }
};

export const updateProvince = async () => {
  try {
    const result = await Provinces.updateMany(
      {},
      {
        $set: {
          isActive: false,
          // isHotelsActive: false,
          // cities_id: [],
          // users_id: [],
          // agents_id: [],
          // hotels_id: [],
          // suppliers_id: [],
        },
      },
      { multi: true, upsert: false }
    );

    console.log("Update result:", result);
  } catch (error) {
    console.error("Error updating provinces:", error);
  }
};

export const updateCountryStates = async () => {
  const data = await Countries.aggregate([
    { $match: {} },
    {
      $lookup: {
        from: "provinces",
        localField: "id",
        foreignField: "country_id",
        as: "states_id",
      },
    },
    {
      $addFields: {
        states_id: "$states_id._id",
      },
    },
    // {
    //   $unwind: {
    //     path: '$provincesData',
    //   },
    // },
    {
      $merge: {
        into: "countries",
        on: "_id",
        whenMatched: "replace",
      },
    },
  ]);
  console.log(data);
};

export const updateCountryCities = async () => {
  const data = await Countries.aggregate([
    { $match: {} },
    {
      $lookup: {
        from: "cities",
        localField: "id",
        foreignField: "country_id",
        as: "cities_id",
      },
    },
    {
      $addFields: {
        cities_id: "$cities_id._id",
      },
    },
    // {
    //   $unwind: {
    //     path: '$provincesData',
    //   },
    // },
    {
      $merge: {
        into: "countries",
        on: "_id",
        whenMatched: "replace",
      },
    },
  ]);
  console.log(data);
};

export const updateProvincesCities = async () => {
  const data = await Provinces.aggregate([
    { $match: {} },
    {
      $lookup: {
        from: "cities",
        let: { province_id: "$id" },
        localField: "country_id",
        foreignField: "country_id",
        as: "cities_id",
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$$province_id", "$state_id"],
                  },
                ],
              },
            },
          },
        ],
      },
    },
    // { $match: { 'cities_id.state_id': 'provinces.id' } },
    {
      $addFields: {
        cities_id: "$cities_id._id",
      },
    },
    {
      $merge: {
        into: "provinces",
        on: "_id",
        whenMatched: "replace",
      },
    },
  ]);
  console.log(data);
};

export const updateCities = async () => {
  try {
    const result = await Cities.updateMany(
      {},
      {
        $set: {
          isActive: false,
          // isHotelsActive: false,
          // users_id: [],
          // agents_id: [],
          // hotels_id: [],
          // suppliers_id: [],
        },
        // $unset: { wikiDataId: 1 },
      },
      { multi: true, upsert: false } // `multi` is actually redundant in updateMany.
    );

    console.log("Update result:", result);
  } catch (error) {
    console.error("Error updating cities:", error);
  }
};
