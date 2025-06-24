import { QueryTypes } from 'sequelize';
import sequelize from '../../../database/connection';
import { ExtendRequest } from './../../../middleware/type';
import { Response } from 'express';
import PasswordGenerator from '../../../services/generateRandomPassword';

class teacherController{
  static async  createTeacher (req:ExtendRequest, res:Response){
    const instituteNumber = req.currentInstituteNumber
    //check teacher data
    const{teacherName,teacherPassword,teacherPhoneNumber,teacherAddress,teacherEmail,teacherExperience,teacherQualification,teacherSalary,teacherJoinedDate,courseId} = req.body
    const teacherPhoto = req.file ? req.file.path : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5THnEbyG6r45djj8mEMSCSrxQkDJudyEcPA&s"
    if(!teacherName || !teacherPassword || !teacherPhoneNumber || !teacherAddress ||!teacherEmail ||!teacherExperience ||!teacherQualification ||!teacherSalary ||!teacherJoinedDate){
      return res.status(400).json({
        message:"Please provide all details"
      })
    }
    //password generate function
    const data  = PasswordGenerator.generateRandomPassword(teacherName)

 const insertedData = await sequelize.query (`INSERT INTO teacher_${instituteNumber} (teacherName,teacherEmail,
        teacherPhoneNumber,teacherAddress,teacherPassword,teacherQualification,teacherExperience,joinedDate,salary,teacherPhoto) VALUES(?,?,?,?,?,?,?,?,?,?)`,{
           type: QueryTypes.INSERT,
        replacements: [teacherName,data.hashedVersion,teacherPhoneNumber,teacherAddress,teacherEmail,teacherExperience,teacherQualification,teacherSalary,teacherJoinedDate,teacherPhoto]
        })

        const teacherData: {id : string} [] = await sequelize.query(`SELECT id FROM teacher_${instituteNumber} WHERE teacherEmail = ? `,{
          type : QueryTypes.SELECT,
          replacements : [teacherEmail]
        })
        console.log(teacherData,"teacher data")
        await  sequelize.query(`UPDATE course_${instituteNumber} SET teacherId = ? WHERE id = ?`,{
          type : QueryTypes.UPDATE,
          replacements : [teacherData[0].id, courseId]
        })
       
        //send mail function goes here

        res.status(200).json({
          message: "teacher created"
        })
  }
static async getTeachers (req:ExtendRequest, res:Response){
  const instituteNumber = req.currentInstituteNumber
  const teachers = await sequelize.query(`SELECT * FROM teacher_${instituteNumber}`,{
    type :QueryTypes.SELECT
  })
  res.status(200).json({
    message:"Teachers fetched" , 
    data : teachers
  })
}

static async deleteTeachers (req:ExtendRequest, res:Response){
  const instituteNumber = req.currentInstituteNumber
  const id = req.params.id
  await sequelize.query(`DELETE FROM teacher_${instituteNumber} WHERE id = ?`,{
    type :QueryTypes.DELETE,
    replacements: [id]
  })
  res.status(200).json({
    message:"Teacher Deleted successfully" , 
  })
}
}
export default teacherController;