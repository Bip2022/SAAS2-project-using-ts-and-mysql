import {Request} from "express"

export interface ExtendRequest extends Request {
user ?: {
  id : string
},
instituteNumber? : number | string | null
currentInstituteNumber? : number | string | null 
 }; 
