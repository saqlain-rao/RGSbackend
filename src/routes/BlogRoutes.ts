import { Router } from 'express';
import {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog
} from '../controllers/BlogController';
import { protect, authorize } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { blogSchema } from '../validators/blogValidator';

const router = Router();

router
  .route('/')
  .get(getBlogs)
  .post(protect, authorize('admin'), validate(blogSchema), createBlog);

router
  .route('/:id')
  .get(getBlog)
  .put(protect, authorize('admin'), validate(blogSchema), updateBlog)
  .delete(protect, authorize('admin'), deleteBlog);

export default router;
