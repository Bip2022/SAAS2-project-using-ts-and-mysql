import { AsyncHandler } from './../../../services/asyncErrorHandler'
import express, { Router } from 'express';
import Middleware from '../../.././middleware/middleware';

// import {upload} from './../../middleware/multer.mmiddlerware'//local multerset
 //cloud setup
import CourseController from '../../../controller/institute/course/course.controller';
import { upload } from '../../../middleware/multer.middlerware';
const router: Router = express.Router();

// POST for creating course & GET for all courses
//filenamr --fontend/postname maa ke name bata file aairaxa file vanney kuraa ho...
router.route('/')
  .post(
    Middleware.isLoggedIn,upload.single('courseThumbNail'),
    AsyncHandler.ErrorHandler(CourseController.createCourse)
  )
  .get(
  Middleware.isLoggedIn,AsyncHandler.ErrorHandler(CourseController.getAllCourse)
  );

// GET single course by id & DELETE course
router.route('/:id')
  .get(
    AsyncHandler.ErrorHandler(CourseController.getSingleCourse)
  )
  .delete(
    Middleware.isLoggedIn,
    AsyncHandler.ErrorHandler(CourseController.deleteCourse)
  );

export default router;
