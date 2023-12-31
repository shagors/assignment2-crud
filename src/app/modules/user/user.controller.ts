import { Request, Response } from 'express';
import { UserServices } from './user.service';
import TUserValidationSchema from './user.validate';
import { TUser } from './user.interface';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    // Data validation
    const userData = await TUserValidationSchema.parse(user);

    const result = await UserServices.createUserIntoDB(userData);

    res.status(200).json({
      success: true,
      message: 'User created Successfully',
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'User not created. Please try again later',
      error: {
        code: 500,
        description: 'Something went wrong!',
        error,
      },
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Users not fetched successfully!',
      error: {
        code: 404,
        description: 'Something went wrong!',
      },
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getUserFromDB(userId);
    const { password, ...userWithoutPassword } = result.toObject();
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: userWithoutPassword,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'User not fetched successfully!',
      error: {
        code: 404,
        description: 'Something went wrong!',
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedUserData: Partial<TUser> = req.body;
    // Check user exists
    const existingUser = await UserServices.getUserFromDB(userId);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User with the provided ID does not exist.',
        },
      });
    }
    // Remove the password field
    if (updatedUserData.password) {
      delete updatedUserData.password;
    }
    // Update the user in the database
    const result = await UserServices.updateUserInDB(userId, updatedUserData);
    // Return the updated user data without the password field
    const { password, ...updatedUserWithoutPassword } = result.toObject();

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: updatedUserWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not updated. Please try again later.',
      error: {
        code: 500,
        description: 'Something went wrong!',
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.deleteUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User successfully deleted!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not deleted. Please try again later.',
      error: {
        code: 500,
        description: 'Something went wrong!',
      },
    });
  }
};

const addProductToOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { productName, price, quantity } = req.body;
    const existingUser = await UserServices.getUserFromDB(userId);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User with the provided ID does not exist.',
        },
      });
    }

    if (!existingUser.orders) {
      existingUser.orders = [];
    }
    existingUser.orders.push({ productName, price, quantity });
    // Save updated user with new order
    const result = await existingUser.save();

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Order not created. Please try again later.',
      error: {
        code: 500,
        description: 'Something went wrong!',
      },
    });
  }
};

const getAllOrdersForUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const existingUser = await UserServices.getUserFromDB(userId);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User with the provided ID does not exist.',
        },
      });
    }

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: {
        orders: existingUser.orders || [],
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Orders not fetched successfully!',
      error: {
        code: 500,
        description: 'Something went wrong!',
      },
    });
  }
};

const calculateTotalPriceForUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const existingUser = await UserServices.getUserFromDB(userId);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User with the provided ID does not exist.',
        },
      });
    }
    // Calculate total price of orders
    let totalPrice = 0;

    if (existingUser.orders && existingUser.orders.length > 0) {
      totalPrice = existingUser.orders.reduce(
        (acc: number, order: any) => acc + order.price * order.quantity,
        0,
      );
    }

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Total price could not be calculated.',
      error: {
        code: 500,
        description: 'Something went wrong!',
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
  addProductToOrder,
  getAllOrdersForUser,
  calculateTotalPriceForUser,
};
