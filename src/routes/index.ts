import { Router } from 'express';
import userRoutes from './UserRoutes';
import projectRoutes from './ProjectRoutes';
import serviceRoutes from './ServiceRoutes';
import settingsRoutes from './SettingsRoutes';
import blogRoutes from './BlogRoutes';
import faqRoutes from './FAQRoutes';
import testimonialRoutes from './TestimonialRoutes';
import teamRoutes from './TeamRoutes';
import careerRoutes from './CareerRoutes';
import contactmessageRoutes from './ContactMessageRoutes';
import visitorRoutes from './VisitorRoutes';

// Upload Route
import uploadRoutes from './uploadRoutes';
import authRoutes from './authRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/services', serviceRoutes);
router.use('/settings', settingsRoutes);
router.use('/blogs', blogRoutes);
router.use('/faqs', faqRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/teams', teamRoutes);
router.use('/careers', careerRoutes);
router.use('/contactmessages', contactmessageRoutes);
router.use('/visitors', visitorRoutes);

router.use('/upload', uploadRoutes);
router.use('/auth', authRoutes);

export default router;
