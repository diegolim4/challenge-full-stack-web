import { Router } from 'express';
import { StudentController } from '../../controllers/StudentCtrl';
import { adminAuth } from '../../../../middlewares/adminAuth';

const studentRouter = Router()
const studentCtrl = new StudentController();

studentRouter.post('/students', adminAuth, studentCtrl.create)

studentRouter.get('/students', adminAuth, studentCtrl.get)

studentRouter.get('/students/:key', adminAuth, studentCtrl.getUnique)

studentRouter.put('/students/:id', adminAuth, studentCtrl.update)

studentRouter.delete('/students/:id', adminAuth, studentCtrl.delete)

export default studentRouter
