import sequelize from '../../../database/connection';
import { ExtendRequest } from './../../../middleware/type';
import { Response } from "express";

class CourseController {
  static async createCourse(req: ExtendRequest, res: Response) {
    const instituteNumber = req.currentInstituteNumber;

    const { courseName, courseDescription, courseDuration, courseFee} = req.body;

    if (!courseName || !courseDescription || !courseDuration || !courseFee ) { 
      return res.status(400).json({
        message: "Please provide all fields!!"
      });
    }
   const courseThumbNail = null  
   const returnData = await sequelize.query(`INSERT INTO course_${instituteNumber} (courseName, courseDescription, courseDuration, courseFee, courseThumbnail) VALUES (?, ?, ?, ?, ?)`, {
      replacements: [courseName, courseDescription, courseDuration, courseFee, courseThumbNail || "https://s3.amazonaws.com/images.seroundtable.com/google-amp-1454071566.jpg" ]
    });
    console.log(returnData)
    return res.status(200).json({
      message: "Course created successfully!"
    });
  }

  static  async deleteCourse (req: ExtendRequest, res: Response){
     const instituteNumber = req.currentInstituteNumber;
     const courseId = req.params.id
     //first check if course exist or not 
     const [courseData]: any =  await sequelize.query(`SELECT courseName FROM course_${instituteNumber} WHERE id =?`,{
        replacements: [courseId]
     })
     if (courseData.length == 0){
      return res.status (404).json({
        message:"Course not registered with respective ID"
      })
     }
 // If exists, delete it
     sequelize.query(`DELETE FROM course_${instituteNumber} WHERE Id =?`,{
      replacements : [courseId]
     })
     res.sendStatus(200).json({
      message:"course deleted successfully"
     })
  }

  static  async getAllCourse (req: ExtendRequest, res: Response){
     const instituteNumber = req.currentInstituteNumber;
     const courses = await sequelize.query(`SELECT * FROM course_${instituteNumber}`)
     res.status(200).json({
      message : "Course feteched",
      data : courses
     })
  }

  static async getSingleCourse (req: ExtendRequest, res: Response){
   const instituteNumber = req.currentInstituteNumber
   const courseId = req.params.id
   const [courses] = await sequelize.query(`SELECT * FROM course_${instituteNumber} WHERE id =?`,{
    replacements : [courseId]
   })
     res.status(200).json({
      message : "Single course fetched",
      data : courses
     })

  }




}

export default CourseController;
