import { Router } from 'express';
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject
} from '../controllers/ProjectController';
import { protect, authorize } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { projectSchema } from '../validators/projectValidator';

const router = Router();

router
  .route('/')
  .get(getProjects)
  .post(protect, authorize('admin'), validate(projectSchema), createProject);

router
  .route('/:id')
  .get(getProject)
  .put(protect, authorize('admin'), validate(projectSchema), updateProject)
  .delete(protect, authorize('admin'), deleteProject);

export default router;
