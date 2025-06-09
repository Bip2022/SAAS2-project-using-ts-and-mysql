import { Request, Response } from 'express';
import User from '../../../database/models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
  async loginUser(req:Request , res:Response){
    const{email, password} = req.body;
    //check if the required fields are present
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //find the user by email
    const data = await User.findAll({
      where:{
        email
      }
    })
    //check if the user exists
    if(data.length === 0){
      return res.status(404).json({ message: "User not found" });
    }else{
      //check if the password is correct
      const isPasswordMatch =  bcrypt.compareSync(password,data[0].password)
      if(isPasswordMatch){
       const token = jwt.sign({id :data[0].id},"dvsghvhdsghgdfhdsvh",{
        expiresIn:'5minutes'
       })
       res.json({
        token: token
       })
      }else{
        return res.status(200).json({ message: "Invalid Credentials" });
      }



    
    }
  }
}
export default AuthController;

