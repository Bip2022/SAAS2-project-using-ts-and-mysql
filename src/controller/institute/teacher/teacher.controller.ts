// import { Request, Response } from 'express';
// import sequelize from '../../../database/connection';
// import geneateTeacherNumber from '../../../services/geneateTeacherNumber';

// class teacherController {
//   static  async createTeacher(req:Request, res:Response) {
//     const { teacherName, teacherEmail, teacherPhoneNumber } = req.body;
   
//     if (!teacherName || !teacherEmail || !teacherPhoneNumber) {
//       res.status(400).json({ message: "All fields are required" });
//       return;
//     }
//     //create a table name teacher in database
// const teacherNumber = geneateTeacherNumber()//teacher(name)

//     await sequelize.query(`
//       CREATE TABLE IF NOT EXISTS teachers_${teacherNumber}(
//         id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//         teacherNumber VARCHAR(255) NOT NULL UNIQUE,
//         teacherName VARCHAR(255) NOT NULL,
//         teacherEmail VARCHAR(255) NOT NULL UNIQUE,
//         teacherPhoneNumber VARCHAR(15) NOT NULL UNIQUE,
//         createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//       )
//     `);

//     // Insert teacher into the table
//     await sequelize.query(`INSERT INTO teachers_${teacherNumber} (teacherNumber, teacherName, teacherEmail, teacherPhoneNumber) VALUES (?, ?, ?, ?)`, {
//       replacements: [teacherNumber ,teacherName, teacherEmail, teacherPhoneNumber],
//     });
//     res.status(200).json({ message: "Teacher created successfully" });

   
//   }
// }

// export default teacherController;