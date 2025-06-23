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

const upload = multer({ storage });
export default upload
