import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const result = await UserServices.createUserIntoDB(user);

    res.status(200).json({
      success: true,
      message: 'User is created Successfully',
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

export const UserControllers = {
  createUser,
};
