import {v2 as cloudinary} from 'cloudinary'
import {CloudinaryStorage} from "multer-storage-cloudinary"
import multer from 'multer';

//configuratiuon
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_NAME,  
   api_key: process.env.CLOUDINARY_API_KEY, 
   api_secret: process.env.CLOUDINARY_API_SECRET 
})

// Upload an image
const storage = new CloudinaryStorage({
  cloudinary,
  params : async (req, file)=>(
    {
    folder : "SAAS2" 
  }
)
})


const fileFilter = (req:Request , file:Express.Multer.File , cb:multer.FileFilterCallback)=>{
  const allowedFileTypes = ['image/png' , 'image/jpeg', 'image/jpg']
  if(allowedFileTypes.includes(file.mimetype)){
    cb(null,true)
  }else{
    cb(new Error("Only image files are supported!!"))
  }
  } 
 
  // Multer middleware with limits
const upload = multer({ 
  storage,
   limits :{
    fileSize : 4 * 1024 * 1024
  },

 });
export default upload
