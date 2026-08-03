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
  .post(validate(contactmessageSchema), createContactMessage);

router
  .route('/:id')
  .get(getContactMessage)
  .put(validate(contactmessageSchema), updateContactMessage)
  .delete(deleteContactMessage);

export default router;
