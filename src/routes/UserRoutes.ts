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
  .post(protect, authorize('admin'), validate(userSchema), createUser);

router
  .route('/:id')
  .get(getUser)
  .put(protect, authorize('admin'), validate(userSchema), updateUser)
  .delete(protect, authorize('admin'), deleteUser);

export default router;
