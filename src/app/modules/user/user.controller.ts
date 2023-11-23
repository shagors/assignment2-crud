import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const result = await UserServices.createUserIntoDB(user);

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
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
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

export const UserControllers = {
  createUser,
  getAllUser,
  getUser,
};
