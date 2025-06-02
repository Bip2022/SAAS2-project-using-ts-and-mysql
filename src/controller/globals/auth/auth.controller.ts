import {Request,Response} from 'express';
import User from '../../../database/models/user.model';

class AuthController{
 static  async registerUser(req:Request,res:Response){
    const {username,password,email} = req.body
    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }else{
      //insert into User table
      await User.create({
        username: username,
        password: password,
        email: email
 })
     return res.status(200).json({ message: "User registered successfully" });
    }
  }
}
export default AuthController;

