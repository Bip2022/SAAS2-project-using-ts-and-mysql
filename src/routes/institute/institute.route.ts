import express, { Router } from 'express';
import InstituteController from '../../controller/institute/institute.controller';
import Middleware from '../../middleware/middleware'; // ✅ Fixed typo


const router: Router = express.Router();

router.route('/').post(Middleware.isLoggedIn , InstituteController.createInstitute);

export default router;
