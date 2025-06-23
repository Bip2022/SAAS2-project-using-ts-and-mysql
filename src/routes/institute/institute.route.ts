import { AsyncHandler } from './../../services/asyncErrorHandler';
import express, { Router,} from 'express';
import { CourseController, InstituteController,StudentController,TeacherController} from '../../controller/institute/institute.controller'
import Middleware from '../../middleware/middleware'


const router: Router = express.Router();

router.route('/')
  .post(
    Middleware.isLoggedIn,
    InstituteController.createInstitute,
   TeacherController.createTeacherTable,
    StudentController.createStudentTable,
    AsyncHandler.ErrorHandler(CourseController.createCourseTable) // ✅ fixed closing )
  );

export default router;
