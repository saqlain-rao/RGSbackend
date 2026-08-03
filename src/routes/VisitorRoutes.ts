import { Router } from 'express';
import { getVisitorCount, trackVisitor } from '../controllers/VisitorController';

const router = Router();

router.get('/', getVisitorCount);
router.post('/track', trackVisitor);

export default router;
