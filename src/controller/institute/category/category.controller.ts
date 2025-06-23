import { ExtendRequest } from "../../../middleware/type";

class CategoryController{
  static async createCategory (req: ExtendRequest, res: Response){
    const instituteNumber = req.currentInstituteNumber;
    const {categoryName, categoryDescription} = req.body
    if(!categoryDescription || )
  }
}