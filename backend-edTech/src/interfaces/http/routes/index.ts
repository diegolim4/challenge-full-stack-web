import { Router } from 'express';
import checkRouter from './checkRoutes';
import studentRouter from './studentRoutes';
import adminRouter from './adminRoutes';
import authRouter from './authRoutes';

const router = Router();

router.use('/api', checkRouter);
router.use('/api', studentRouter);
router.use('/api', adminRouter);
router.use('/api', authRouter);

export default router;
