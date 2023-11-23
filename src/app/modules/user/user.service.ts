import { UserModel } from '../user.model';
import { TUser } from './user.interface';

const createUserIntoDB = async (userData: TUser) => {
  const result = await UserModel.create(userData);

  // const student = new Student(studentData);
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists!');
  // }
  // const result = await student.save();

  return result;
};

export const UserServices = {
  createUserIntoDB,
};
