import { NextFunction, Response } from "express";
import sequelize from "../../database/connection";
import RandomNumberGenerator from "../../services/generateRandomNumber";
import { ExtendRequest } from "../../middleware/type";
import User from "../../database/models/user.model";
import categories from "../../seed";




class InstituteController {
  static async createInstitute(req: ExtendRequest, res: Response, next: NextFunction) {
    console.log(req.user)

    const { instituteName, instituteAddress, instituteEmail, institutePhoneNumber } = req.body;
    const instituteVatNo = req.body.instituteVatNo || null;
    const institutePanNo = req.body.institutePanNo || null;
    if (!instituteName || !instituteAddress || !instituteEmail || !institutePhoneNumber) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }


    // create  table name institute in database
    const instituteNumber = RandomNumberGenerator.generateRandomNumber()  //institute(name) 
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS institute_${instituteNumber}(
      id VARCHAR(36)  PRIMARY KEY DEFAULT (UUID()),
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
    //
    //to create user institute history table
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS user_institute_history (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        userId VARCHAR(255) REFERENCES users(id),
        instituteNumber INT NOT NULL UNIQUE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) `)


    if (req.user) {
      await sequelize.query(`INSERT INTO user_institute_history (userId, instituteNumber) VALUES (?, ?)`, {
        replacements: [req.user.id, instituteNumber],
      })



      //  const user = await User.findByPk(req.user.id)
      //  req.instituteNumber = instituteNumber;
      // await user?.save();

      await User.update({
        currentInstituteNumber: instituteNumber,// Update the currentInstituteNumber for the user
        role: 'institute'
      }, {
        where: {
          id: req.user.id
        }
      })
    }


    req.currentInstituteNumber = instituteNumber; // Set the instituteNumber in the request 
    next()
  }
  catch(error: any) {
    console.log(error)
  }

  static async createTeacherTable(req: ExtendRequest, res: Response, next: NextFunction) {
    try {
      const instituteNumber = req.currentInstituteNumber;
      await sequelize.query(`
      CREATE TABLE IF NOT EXISTS teacher_${instituteNumber}(
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        teacherName VARCHAR(255) NOT NULL,
        teacherEmail VARCHAR(255) NOT NULL,
        teacherPhoneNumber VARCHAR(50) NOT NULL,
        teacherAddress VARCHAR(255) NOT NULL,
        teacherPassword VARCHAR(255),
        teacherQualification VARCHAR(255) NOT NULL,
        teacherExperience INT NOT NULL,
        joinedDate DATE,
        salary VARCHAR(100),
        teacherPhoto VARCHAR(255),
        courseId VARCHAR (100) REFERENCES course_${instituteNumber} (id),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
      next()
    } catch (error) {
      console.log(error, "Error")
      res.status(500).json({ message: error })

    }
  }

  static async createStudentTable(req: ExtendRequest, res: Response, next: NextFunction) {

    try {
      const instituteNumber = req.currentInstituteNumber;
      await sequelize.query(`
      CREATE TABLE IF NOT EXISTS student_${instituteNumber}(
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        studentName VARCHAR(255) NOT NULL,
        studentEmail VARCHAR(255) NOT NULL,         
        studentPhoneNumber VARCHAR(50) NOT NULL,
        studentAddress VARCHAR(255) NOT NULL,
        studentClass VARCHAR(50) NOT NULL,
        studentRollNumber VARCHAR(50) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

      next()
    } catch (error) {
      console.log(error, "Error")
      res.status(500).json({ message: error })

    }
  }




  static async createCourseTable(req: ExtendRequest, res: Response) {
    const instituteNumber = req.currentInstituteNumber;
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS course_${instituteNumber}(
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        courseName VARCHAR(255) NOT NULL UNIQUE,
        courseDescription TEXT,
        courseDuration VARCHAR(50) NOT NULL,
        courseLevel ENUM ('beginner', 'intermediate', 'advance') NOT NULL,
        courseFee VARCHAR(255) NOT NULL,
        courseThumbnail VARCHAR(200),
        teacherId VARCHAR(36) REFERENCES teacher_${instituteNumber} (id),
        categoryId VARCHAR(36) NOT NULL REFERENCES category_${instituteNumber} (id),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
    res.status(200).json({
      message: "Institutee created successfully👌🏻👌",
      instituteNumber,
    })
  }

  static async createCategoryTable(req: ExtendRequest, res: Response, next: NextFunction) {
    const instituteNumber = req.currentInstituteNumber;
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS category_${instituteNumber}(
       id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        categoryName VARCHAR(255) NOT NULL UNIQUE,
        categoryDescription TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`)
    categories.forEach(async function (categories) {
      await sequelize.query(`INSERT INTO category_${instituteNumber}(categoryName,categoryDescription) VALUES(?,?)`, {
        replacements: [categories.categoryName, categories.categoryDescription] //data sedding
      })

    })

    next()

  }

}
export default InstituteController;





