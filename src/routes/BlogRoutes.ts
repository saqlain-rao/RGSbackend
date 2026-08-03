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
  .post(validate(blogSchema), createBlog);

router
  .route('/:id')
  .get(getBlog)
  .put(validate(blogSchema), updateBlog)
  .delete(deleteBlog);

export default router;
