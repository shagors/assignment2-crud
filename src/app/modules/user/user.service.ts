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

const updateUserInDB = async (
  userId: number,
  updatedUserData: Partial<TUser>,
) => {
  const result = await UserModel.updateUserById(userId, updatedUserData);

  return result;
};

const deleteUserFromDB = async (userId: number) => {
  const result = await UserModel.updateOne({ userId }, { isDeleted: true });
  return result;
};

const addProductToOrderInDB = async (userId: number, productData: any) => {
  const result = await UserModel.findOneAndUpdate(
    { userId },
    { $push: { orders: productData } },
    { new: true },
  );
  return result;
};

const getAllOrdersForUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId }, { orders: 1 });
  return result?.orders || [];
};

const calculateTotalPriceForUserInDB = async (userId: number) => {
  const existingUser = await UserModel.findOne({ userId });

  if (!existingUser) {
    return 0;
  }

  let totalPrice = 0;

  if (existingUser.orders && existingUser.orders.length > 0) {
    totalPrice = existingUser.orders.reduce(
      (acc: number, order: any) => acc + order.price * order.quantity,
      0,
    );
  }

  return totalPrice;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
  addProductToOrderInDB,
  getAllOrdersForUserFromDB,
  calculateTotalPriceForUserInDB,
};
