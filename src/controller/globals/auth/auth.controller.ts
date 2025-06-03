import { Request, Response } from 'express';
import User from '../../../database/models/user.model';
import bcrypt from 'bcrypt';

class AuthController {
  static async registerUser(req: Request, res: Response) {
    // Log the request body for debugging
    console.log(req.body)
    //check if the request body is undefined or missing
    if (req.body == undefined) {
      return res.status(400).json({ message: "No data was sent!" });
    }
    const { username, password, email } = req.body
    //check if the required fields are present
    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    } else {
      //insert into User table
      await User.create({
        username: username,
        password: bcrypt.hashSync(password,12), //hash the password
        email: email
      })
      return res.status(201).json({ message: "User registered successfully" });
    }
  }
}
export default AuthController;

