import { Router } from 'express';
import {
  createContactMessage,
  getContactMessages,
  getContactMessage,
  updateContactMessage,
  deleteContactMessage
} from '../controllers/ContactMessageController';
import { protect, authorize } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { contactmessageSchema } from '../validators/contactmessageValidator';

const router = Router();

router
  .route('/')
  .get(getContactMessages)
  .post(protect, authorize('admin'), validate(contactmessageSchema), createContactMessage);

router
  .route('/:id')
  .get(getContactMessage)
  .put(protect, authorize('admin'), validate(contactmessageSchema), updateContactMessage)
  .delete(protect, authorize('admin'), deleteContactMessage);

export default router;
