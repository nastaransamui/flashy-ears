import Users from '@/models/Users';

export async function findUserByUsername(username: string) {
  let user = await Users.findOne({ userName: username });
  return user;
}

export async function findUserById(_id: string) {
  let user = await Users.findById(_id, '-password');
  return user;
}
