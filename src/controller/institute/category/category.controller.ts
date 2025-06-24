import { Response } from "express"
import { ExtendRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";

class CategoryController {
  static async createCategory(req: ExtendRequest, res: Response) {
    const instituteNumber = req.currentInstituteNumber;
    const { categoryName, categoryDescription } = req.body
    if (!categoryDescription || !categoryDescription) {
      return res.status(400).json({
       message: "Please provide all required fields: categoryName and categoryDescription"
      })
    }
  
    await sequelize.query(`INSERT INTO category_${instituteNumber}(categoryName, categoryDescription) VALUES(?,?)`,{
      replacements: [categoryName, categoryDescription]
    })
    res.status(200).json({
      message: "Category added Successfully"
    })
  }

  static async getCategory (req:ExtendRequest, res:Response){
     const instituteNumber = req.currentInstituteNumber;
     const categories = await sequelize.query(`SELECT * FROM category_${instituteNumber}`)
     res.status(200).json({
      message:"Categories fetched successfully",
      data : categories
     })
  }


  static async deleteCategory (req:ExtendRequest, res:Response){
     const instituteNumber = req.currentInstituteNumber;
     const id = req.params.id
     await sequelize.query(`DELETE FROM category_${instituteNumber}WHERE id =?`,{
      replacements : [id]
     })
     res.status(200).json({
      message:"Categories deleted successfully"
     })
  }
}
export default CategoryController