import { Request, Response } from 'express';
import User from '../../../database/models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthController {
  static async registerUser(req: Request, res: Response): Promise<void> {
    console.log(req.body);
    if (!req.body) {
      res.status(400).json({ message: "No data was sent!" });
      return;
    }
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    
    await User.create({
      username,
      password: bcrypt.hashSync(password, 12),
      email,
    });
    
    res.status(201).json({ message: "User registered successfully" });
    return;
  }

  static async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const data = await User.findAll({ where: { email } });

    if (data.length === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordMatch = bcrypt.compareSync(password, data[0].password);
    if (isPasswordMatch) {
      const token = jwt.sign({ id: data[0].id }, "dvsghvhdsghgdfhdsvh", {
        expiresIn: '5minutes',
      });
      res.status(200).json({ token, message: "Login successful" });
      return;
    } else {
      res.status(403).json({ message: "Invalid Credentials" });
      return;
    }
  }
}

export default AuthController;
