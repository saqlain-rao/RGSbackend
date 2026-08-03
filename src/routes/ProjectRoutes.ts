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
  .post(validate(projectSchema), createProject);

router
  .route('/:id')
  .get(getProject)
  .put(validate(projectSchema), updateProject)
  .delete(deleteProject);

export default router;
