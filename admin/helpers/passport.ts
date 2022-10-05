import passport from 'passport';
import type { NextApiRequest, NextApiResponse } from 'next';
import { validatePassword } from './hashing';
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import Users, { IUser } from '@/models/Users';

export const authenticate = async (
  method: string,
  req: NextApiRequest,
  res: NextApiResponse
) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, user) => {
      // console.log(user)
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    })(req, res);
  });

export const localStrategy = new LocalStrategy(
  { usernameField: 'email' },
  (userName, password, done) => {
    Users.findOne(
      { userName: userName.toLowerCase() },
      (err: NativeError, user: IUser) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, { message: `Wrong Email` });
        } else if (!validatePassword(user, password)) {
          return done(null, { message: `Wrong password` });
        } else {
          done(null, user);
        }
      }
    );
  }
);
