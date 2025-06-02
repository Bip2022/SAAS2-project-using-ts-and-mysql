import express, { Router, Request, Response } from "express";
import AuthController from "../../../controller/globals/auth/auth.controller";

const router: Router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    await AuthController.registerUser(req, res);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

export default router;
