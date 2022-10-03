import jwt from 'jsonwebtoken';

export const unHashProfile = (accessToken: string) =>{
  const profile =  jwt.verify(
     accessToken,
     process.env.NEXT_PUBLIC_SECRET_KEY,
     (err: any, user: any) =>{
       if (!err) {
         return user;
       }else{
         return {err: err.message}
       }
     }
   )
   return profile;
 }