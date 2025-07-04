import { Router } from 'express';
import { AuthController } from '../../controllers/AuthCtrl';

const authRouter = Router();
const authCtrl = new AuthController();

authRouter.post('/auth', authCtrl.create);

export default authRouter;
