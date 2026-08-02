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
  .post(protect, authorize('admin'), validate(serviceSchema), createService);

router
  .route('/:id')
  .get(getService)
  .put(protect, authorize('admin'), validate(serviceSchema), updateService)
  .delete(protect, authorize('admin'), deleteService);

export default router;
