import { AsyncHandler } from './../../../services/asyncErrorHandler';
import { Router } from "express";
import AuthController from "../../../controller/globals/auth/auth.controller";

const router = Router();

router.route('/register').post(AsyncHandler.ErrorHandler(AuthController.registerUser))
router.route('/login').post(AsyncHandler.ErrorHandler(AuthController.loginUser))

export default router;
