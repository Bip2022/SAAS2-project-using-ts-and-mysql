import {Request} from "express"

export interface ExtendRequest extends Request {
user ?: {
  id : string,
  username: string | null,
  email: string,
  role: string 
},
instituteNumber? : number | string | null
 }; 
