import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/UserController';
import { protect, authorize } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { userSchema } from '../validators/userValidator';

const router = Router();

router
  .route('/')
  .get(getUsers)
  .post(validate(userSchema), createUser);

router
  .route('/:id')
  .get(getUser)
  .put(validate(userSchema), updateUser)
  .delete(deleteUser);

export default router;
