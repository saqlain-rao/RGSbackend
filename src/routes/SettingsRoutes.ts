import { Router } from 'express';
import {
  createSettings,
  getSettingss,
  getSettings,
  updateSettings,
  deleteSettings
} from '../controllers/SettingsController';
import { protect, authorize } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { settingsSchema } from '../validators/settingsValidator';

const router = Router();

router
  .route('/')
  .get(getSettingss)
  .post(protect, authorize('admin'), validate(settingsSchema), createSettings);

router
  .route('/:id')
  .get(getSettings)
  .put(protect, authorize('admin'), validate(settingsSchema), updateSettings)
  .delete(protect, authorize('admin'), deleteSettings);

export default router;
