import { AsyncHandler } from './../../services/asyncErrorHandler';
import express, { Router } from 'express';
import InstituteController from '../../controller/institute/institute.controller';
import Middleware from '../../middleware/middleware';

const router: Router = express.Router();

router.route('/')
  .post(
    Middleware.isLoggedIn,
    AsyncHandler.ErrorHandler(InstituteController.createInstitute),
    AsyncHandler.ErrorHandler(InstituteController.createTeacherTable),
    AsyncHandler.ErrorHandler(InstituteController.createStudentTable),
    AsyncHandler.ErrorHandler(InstituteController.createCourseTable)
  );

export default router;