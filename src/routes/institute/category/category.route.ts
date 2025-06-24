import Middlware from '../../../middleware/middleware';
import express, { Router } from 'express';
import AsyncHandler from '../../../services/asyncErrorHandler';
import CategoryController from '../../../controller/institute/category/category.controller';



const router: Router = express.Router();

router.route('/')
  .post(
  Middlware.isLoggedIn,
  AsyncHandler.ErrorHandler(CategoryController.createCategory)
  )
  
  .get(
    Middlware.isLoggedIn,
    AsyncHandler.ErrorHandler(CategoryController.getCategory)
  )

  router.route('/:id')
  .delete(Middlware.isLoggedIn,AsyncHandler.ErrorHandler(CategoryController.deleteCategory))

export default router;
