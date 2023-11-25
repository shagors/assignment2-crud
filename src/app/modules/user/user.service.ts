import { UserModel } from '../user.model';
import { TUser } from './user.interface';

const createUserIntoDB = async (userData: TUser) => {
  // console.log(userData);
  const result = await UserModel.create(userData);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

// const updateUserInDB = async (
//   userId: number,
//   updatedUserData: Partial<TUser>,
// ) => {
//   const result = await UserModel.findOneAndUpdate({ userId }, updatedUserData, {
//     new: true,
//   });

//   return result;
// };

const updateUserInDB = async (
  userId: number,
  updatedUserData: Partial<TUser>,
) => {
  const result = await UserModel.updateUserById(userId, updatedUserData);

  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getUserFromDB,
  updateUserInDB,
};
