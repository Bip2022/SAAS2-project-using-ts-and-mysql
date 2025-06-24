import express,{ Router } from 'express';
import Middlware from '../../../middleware/middleware';
import AsyncHandler from '../../../services/asyncErrorHandler';
import teacherController from '../../../controller/institute/teacher/teacher.controller';
import {upload} from  '../../../middleware/multer.middlerware'



const router: Router = express.Router();

router.route('/')
.post(
  Middlware.isLoggedIn,upload.single('teacherPhoto'),AsyncHandler.ErrorHandler(teacherController.createTeacher)
)

.get(
  Middlware.isLoggedIn,AsyncHandler.ErrorHandler(teacherController.getTeachers)
)

router.route('/:id').delete(Middlware.isLoggedIn,AsyncHandler.ErrorHandler(teacherController.deleteTeachers))

export default router

