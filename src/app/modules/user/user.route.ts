import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/users', UserControllers.createUser);
router.get('/users', UserControllers.getAllUser);
router.get('/users/:userId', UserControllers.getUser);
router.put('/users/:userId', UserControllers.updateUser);
router.delete('/users/:userId', UserControllers.deleteUser);

router.put('/users/:userId/orders', UserControllers.addProductToOrder);
router.get('/users/:userId/orders', UserControllers.getAllOrdersForUser);
router.get(
  '/users/:userId/orders/total-price',
  UserControllers.calculateTotalPriceForUser,
);

export const UserRoutes = router;
