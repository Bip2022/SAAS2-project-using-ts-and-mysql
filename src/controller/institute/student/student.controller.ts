import sequelize from "../../../database/connection";
import { ExtendRequest } from "../../../middleware/type";
import { Response } from "express";

class  StudentController{
  static async getStudents (req:ExtendRequest , res: Response){
    const instituteNumber =  req.currentInstituteNumber
    const [students] = await sequelize.query(`SELECT * FROM student_${instituteNumber}`)
    res.status(200).json({
      message: "Students  fetched successfully",
      data : students
    })
  }
}
export default StudentController