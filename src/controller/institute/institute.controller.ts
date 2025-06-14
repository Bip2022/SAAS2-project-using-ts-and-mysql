import { Request, Response } from "express";
import sequelize from "../../database/connection";
import generateRandomNumber from "../../services/generateRandomNumber";

interface ExtendRequest extends Request {
user ?: {
   name : string,
   age: number
}   
 };

class InstituteController {
  static async createInstitute(req:ExtendRequest, res: Response) {
    console.log(req.user)

    const { instituteName, instituteAddress, instituteEmail, institutePhoneNumber } = req.body;
    const instituteVatNo = req.body.instituteVatNo || null;
    const institutePanNo = req.body.institutePanNo || null;
    if (!instituteName || !instituteAddress || !instituteEmail || !institutePhoneNumber) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    // create  table name institute in database
   const instituteNumber = generateRandomNumber()  //institute(name) 
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS institute_${instituteNumber}(
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      instituteName VARCHAR(255) NOT NULL,
      instituteAddress VARCHAR(255) NOT NULL,
      instituteEmail VARCHAR(255) NOT NULL,
      institutePhoneNumber VARCHAR(15) NOT NULL,
      instituteVatNo VARCHAR(50),
      institutePanNo VARCHAR(50),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`)

    await sequelize.query(`INSERT INTO institute_${instituteNumber} (instituteName, instituteAddress, instituteEmail, institutePhoneNumber, instituteVatNo, institutePanNo) VALUES (?, ?, ?, ?, ?, ?)`, {
      replacements: [instituteName, instituteAddress, instituteEmail, institutePhoneNumber, instituteVatNo, institutePanNo],
    });


    res.status(200).json({ message: "Institute table created successfully" });
  }
}

//   const createTeacherTable = async (req: Request, res: Response) =>
//   {
//     await sequelize.query(`
//       CREATE TABLE teacher_$(instituteNumber) (
//       id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//       teacherName VARCHAR(255) NOT NULL,
//       teacherEmail VARCHAR(255) NOT NULL,
//       teacherPhoneNumber VARCHAR(15) NOT NULL,
//       createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//     )`);

// }

export default InstituteController;