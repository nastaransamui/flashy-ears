import Users from '@/models/Users';

export async function findUserByUsername(username: string) {
  let user = await Users.findOne({ userName: username });
    return user;
}