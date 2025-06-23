import multer from "multer"
import {Request} from "express"

//locally file storge garney method
const storage = multer.diskStorage({
  //location to keep incoming file
  //cb - callback function
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null,'./src/storage')
  },
  //what name to me keep after keeping in that location
  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null,Date.now() + "-" + file.originalname )
  },
  
})
// multer instance बनाउने
const upload = multer({ storage });
export {upload};