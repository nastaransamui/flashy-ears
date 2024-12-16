import passport from "passport";
import type { NextApiRequest, NextApiResponse } from "next";
import { validatePassword } from "./hashing";
import passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;
import Users, { IUser } from "@/models/Users";

export const authenticate = async (
  method: string,
  req: NextApiRequest,
  res: NextApiResponse
) =>
  new Promise((resolve, reject) => {
    passport.authenticate(
      method,
      { session: false },
      (error: any, user: IUser) => {
        // console.log(user)
        if (error) {
          reject(error);
        } else {
          resolve(user);
        }
      }
    )(req, res);
  });

export const localStrategy = new LocalStrategy(
  { usernameField: "email" },
  async (userName, password, done) => {
    try {
      const user = await Users.findOne({ userName: userName.toLowerCase() });
      if (!user) {
        return done(null, { message: `Wrong Email` });
      } else if (!validatePassword(user, password)) {
        return done(null, { message: `Wrong password` });
      } else {
        done(null, user);
      }
    } catch (error) {
      return done(error);
    }
  }
);
