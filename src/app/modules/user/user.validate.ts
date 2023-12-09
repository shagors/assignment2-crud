import { z } from 'zod';

const TUserNameValidationSchema = z.object({
  firstName: z.string().min(3).max(20),
  lastName: z.string().min(3),
});

const TAddressValidationSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});

const TOrderValidationSchema = z.object({
  productName: z.string().min(1),
  price: z.number().min(0),
  quantity: z.number().min(0),
});

export const TUserValidationSchema = z.object({
  userId: z.number().positive(),
  username: z.string().min(3).max(15),
  password: z.string().min(8),
  fullName: TUserNameValidationSchema,
  age: z.number().positive(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()),
  address: TAddressValidationSchema,
  orders: z.array(TOrderValidationSchema).optional(),
  isDeleted: z.boolean().default(false),
});

export default TUserValidationSchema;
