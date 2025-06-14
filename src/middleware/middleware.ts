import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../database/models/user.model';


interface ExtendRequest extends Request {
user ?: {
  username: string | null,
  email: string,
  role: string
}
 }; 




class Middlware {
  static isLoggedIn(req: ExtendRequest, res: Response, next: NextFunction){
    //check if login or not
    //token accept
   
    const token = req.headers.authorization//jwt token

    console.log(token, "token");
    if (!token) {
      res.status(401).json({ message: " Please provide token you are not logged in!" });
      return;
    }
    //verify token
    jwt.verify(token, 'dvsghvhdsghgdfhdsvh', async(error, result : any) => {
      if (error) {
        res.status(403).json({ message: "Invalid token!" });
        return;
      }
      //if token is valid, attach user to request
      console.log(result, "result");

//one way to get result
      // const userData = await User.findAll({
      //   where: {
      //     id: result.id
      //   }
      // })
    
      // if(userData.length === 0) {
      //   res.status(403).json({ message: "User not found with requiremwnt!!" });
      //   return;
      // }
      // console.log("User veified successfully");

      //another way to get result
     const userData = await User.findByPk(result.id);
     if (!userData) {
     res.status(403).json({ message: "User not found with requirement!" });
     return;
}

// userData found, continue your logic here
  req.user = userData,
  next();     
    }
    )
  }
}


export default Middlware; 