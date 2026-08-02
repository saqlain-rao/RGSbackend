import { Router } from 'express';
import {
  createTestimonial,
  getTestimonials,
  getTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../controllers/TestimonialController';
import { protect, authorize } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { testimonialSchema } from '../validators/testimonialValidator';

const router = Router();

router
  .route('/')
  .get(getTestimonials)
  .post(protect, authorize('admin'), validate(testimonialSchema), createTestimonial);

router
  .route('/:id')
  .get(getTestimonial)
  .put(protect, authorize('admin'), validate(testimonialSchema), updateTestimonial)
  .delete(protect, authorize('admin'), deleteTestimonial);

export default router;
