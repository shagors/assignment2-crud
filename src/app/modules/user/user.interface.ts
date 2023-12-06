import { Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TUserName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrder[];
  isDeleted: boolean;
};

export type TUserMethods = {
  isUserExists(id: number): Promise<TUser | null>;
};

export type TUserModel = Model<TUser, Record<string, never>, TUserMethods>;
