import { AsyncHandler } from './../../services/asyncErrorHandler';
import express, { Router } from 'express';
import Middleware from '../../middleware/middleware';
import CourseController from '../../controller/institute/course/course.controller';
// import {upload} from './../../middleware/multer.mmiddlerware'//local multerset
import upload from './../../services/cloudinaryConfig' //cloud setup
const router: Router = express.Router();

// POST for creating course & GET for all courses
//filenamr --fontend/postname maa ke name bata file aairaxa file vanney kuraa ho...
router.route('/')
  .post(
    Middleware.isLoggedIn,upload.single('courseThumbNail'),
    AsyncHandler.ErrorHandler(CourseController.createCourse)
  )
  .get(
    AsyncHandler.ErrorHandler(CourseController.getAllCourse)
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
