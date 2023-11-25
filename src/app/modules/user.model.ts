import { Schema, model } from 'mongoose';
import { TAddress, TOrder, TUser, TUserName } from './user/user.interface';
// import validator from 'validator';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'First Name cannot be more than 20 characters'],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not in capitalize formate',
    // },
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid',
    // },
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

const userSchema = new Schema<TUser>({
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
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: '{VALUE} is not valid email',
    // },
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

export const UserModel = model<TUser>('User', userSchema);
