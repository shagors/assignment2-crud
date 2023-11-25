import { Schema, model } from 'mongoose';
import {
  TAddress,
  TOrder,
  TUser,
  TUserMethods,
  TUserModel,
  TUserName,
} from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'First Name cannot be more than 20 characters'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
  },
});

const userAddress = new Schema<TAddress>({
  street: {
    type: String,
    trim: true,
    required: [true, 'Street is required'],
  },
  city: {
    type: String,
    trim: true,
    required: [true, 'City is required'],
  },
  country: {
    type: String,
    trim: true,
    required: [true, 'Country name is required'],
  },
});

const userOrder = new Schema<TOrder>({
  productName: {
    type: String,
    trim: true,
    required: [true, 'Product Name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
});

const userSchema = new Schema<TUser, TUserModel, TUserMethods>({
  userId: {
    type: Number,
    required: [true, 'User ID is required'],
    unique: true,
  },
  userName: {
    type: String,
    required: [true, 'User Name is required'],
    unique: true,
    maxlength: [10, 'User Name cannot be more than 10 characters'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be minimum 8 characters'],
  },
  fullName: {
    type: userNameSchema,
    required: [true, 'Full Name is required'],
  },
  age: {
    type: Number,
    required: [true, 'User Age is required'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email is required'],
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: [{ type: String }],
  address: {
    type: userAddress,
    required: [true, 'Address is required'],
  },
  orders: [userOrder],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// pre save
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt));
  next();
});

// post
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

userSchema.statics.updateUserById = async function (
  userId: number,
  updatedUserData: Partial<TUser>,
) {
  return this.findOneAndUpdate({ userId }, updatedUserData, { new: true });
};

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await UserModel.findOne({ userId });
  return existingUser;
};

export const UserModel = model<TUser, TUserModel>('User', userSchema);
