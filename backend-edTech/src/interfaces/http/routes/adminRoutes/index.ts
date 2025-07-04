import { Router } from 'express';
import { AdminController } from '../../controllers/AdminCtrl';

const adminRouter = Router();
const adminCtrl = new AdminController();

adminRouter.post('/admin', adminCtrl.create);

adminRouter.get('/admin', adminCtrl.get);

adminRouter.put('/admin/:id', adminCtrl.update);

adminRouter.delete('/admin/:id', adminCtrl.delete);

export default adminRouter;
