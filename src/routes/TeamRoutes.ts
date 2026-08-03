import { Router } from 'express';
import {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam
} from '../controllers/TeamController';
import { protect, authorize } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { teamSchema } from '../validators/teamValidator';

const router = Router();

router
  .route('/')
  .get(getTeams)
  .post(protect, authorize('admin'), validate(teamSchema), createTeam);

router
  .route('/:id')
  .get(getTeam)
  .put(protect, authorize('admin'), validate(teamSchema), updateTeam)
  .delete(protect, authorize('admin'), deleteTeam);

export default router;
