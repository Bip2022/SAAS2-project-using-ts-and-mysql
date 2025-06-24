


import express, { Router,} from 'express';
import StudentController from '../../../controller/institute/student/student.controller';
import AsyncHandler from '../../../services/asyncErrorHandler';



const router: Router = express.Router();

router.route('/')
 .get(AsyncHandler.ErrorHandler(StudentController.getStudents))

export default router;
