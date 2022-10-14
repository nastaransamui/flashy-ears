import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import { IUser } from '@/models/Users';
import Roles, { IRole } from '../models/Roles';
import { NextApiResponse } from 'next';

export function validatePassword(user: IUser, inputPassword: string) {
  const bytes = CryptoJS.AES.decrypt(
    user.password,
    process.env.NEXT_PUBLIC_SECRET_KEY
  );
  const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
  const passwordsMatch = originalPassword == inputPassword;
  return passwordsMatch;
}

export async function updateAccessToken(user: IUser, res: NextApiResponse) {
  const accessToken = await jwtSign(user);

  const role = await Roles.findOne(
    { _id: { $in: user.role_id } },
    {
      _id: 0,
      icon: 0,
      remark: 0,
      isActive: 0,
      users_id: 0,
      roleName: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    }
  );

  if (role == null) {
    return {
      accessToken: null,
      accessRole: null,
      errorMessage: 'accessRoleNull',
    };
  }

  const accessRole = role.routes;
  user.accessToken = accessToken;
  user = await user.save();
  const { password, ...info } = user._doc;
  return {
    accessToken: accessToken,
    accessRole: accessRole,
    errorMessage: null,
  };
}

export async function jwtSign(user: IUser) {
  const accessToken = jwt.sign(
    {
      _id: user._id,
      isAdmin: user.isAdmin,
      isVercel: user.isVercel,
      agents_id: user.agents_id,
      userName: user.userName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      profileImage: user.profileImage,
      profileImageKey: user.profileImageKey,
      firstName: user.firstName,
      lastName: user.lastName,
      roleName: user.roleName,
      role_id: user.role_id,
      cityName: user.cityName,
      city_id: user.city_id,
      provinceName: user.provinceName,
      province_id: user.province_id,
      countryName: user.countryName,
      country_id: user.country_id,
      position: user.position,
      aboutMe: user.aboutMe,
    },
    process.env.NEXT_PUBLIC_SECRET_KEY,
    { expiresIn: '7d' }
  );
  return accessToken;
}
