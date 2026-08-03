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
  .post(validate(teamSchema), createTeam);

router
  .route('/:id')
  .get(getTeam)
  .put(validate(teamSchema), updateTeam)
  .delete(deleteTeam);

export default router;
