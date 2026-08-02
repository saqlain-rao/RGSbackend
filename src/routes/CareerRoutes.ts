import { Router } from 'express';
import {
  createCareer,
  getCareers,
  getCareer,
  updateCareer,
  deleteCareer
} from '../controllers/CareerController';
import { protect, authorize } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { careerSchema } from '../validators/careerValidator';

const router = Router();

router
  .route('/')
  .get(getCareers)
  .post(protect, authorize('admin'), validate(careerSchema), createCareer);

router
  .route('/:id')
  .get(getCareer)
  .put(protect, authorize('admin'), validate(careerSchema), updateCareer)
  .delete(protect, authorize('admin'), deleteCareer);

export default router;
