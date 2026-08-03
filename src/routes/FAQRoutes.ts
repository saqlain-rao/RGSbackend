import { Router } from 'express';
import {
  createFAQ,
  getFAQs,
  getFAQ,
  updateFAQ,
  deleteFAQ
} from '../controllers/FAQController';
import { protect, authorize } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { faqSchema } from '../validators/faqValidator';

const router = Router();

router
  .route('/')
  .get(getFAQs)
  .post(protect, authorize('admin'), validate(faqSchema), createFAQ);

router
  .route('/:id')
  .get(getFAQ)
  .put(protect, authorize('admin'), validate(faqSchema), updateFAQ)
  .delete(protect, authorize('admin'), deleteFAQ);

export default router;
