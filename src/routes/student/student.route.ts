

import StudentController from '../../controller/institute/student/student.controller';
import { AsyncHandler } from './../../services/asyncErrorHandler';
import express, { Router,} from 'express';



const router: Router = express.Router();

router.route('/')
 .get(AsyncHandler.ErrorHandler(StudentController.getStudents))

export default router;
