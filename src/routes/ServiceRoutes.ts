import { Router } from 'express';
import {
  createService,
  getServices,
  getService,
  updateService,
  deleteService
} from '../controllers/ServiceController';
import { protect, authorize } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { serviceSchema } from '../validators/serviceValidator';

const router = Router();

router
  .route('/')
  .get(getServices)
  .post(validate(serviceSchema), createService);

router
  .route('/:id')
  .get(getService)
  .put(validate(serviceSchema), updateService)
  .delete(deleteService);

export default router;
