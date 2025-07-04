import { Router } from 'express';
import { StudentController } from '../../controllers/StudentCtrl';

const studentRouter = Router()
const studentCtrl = new StudentController();

studentRouter.post('/students', studentCtrl.create)

studentRouter.get('/students', studentCtrl.get)

studentRouter.get('/students/:key', studentCtrl.getUnique)

studentRouter.put('/students/:id', studentCtrl.update)

studentRouter.delete('/students/:id', studentCtrl.delete)

export default studentRouter
