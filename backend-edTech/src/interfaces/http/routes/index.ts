import { Router } from 'express';
import checkRouter from './checkRoutes';
import studentRouter from './studentRoutes';
import adminRouter from './adminRoutes';
import authRouter from './authRoutes';
import { adminAuth } from '../../../middlewares/adminAuth';

const router = Router();

router.use('/api', checkRouter);
router.use('/api', adminAuth, studentRouter);
router.use('/api', adminAuth, adminRouter);
router.use('/api', adminAuth, authRouter);

export default router;
