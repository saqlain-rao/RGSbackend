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
  .post(validate(careerSchema), createCareer);

router
  .route('/:id')
  .get(getCareer)
  .put(validate(careerSchema), updateCareer)
  .delete(deleteCareer);

export default router;
