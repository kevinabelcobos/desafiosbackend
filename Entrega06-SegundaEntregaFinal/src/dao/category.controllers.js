import CategoryModel from "./models/category.model.js";

class categoryManager {
  addCategory = async (category) => {
    try {
      await categoryModel.create(category);
    } catch (e) {
      throw e;
    }
  };
  getCategory = async () => {
    try {
      const category = await CategoryModel.find().lean().exec();
      return category;
    } catch (e) {
      return [];
    }
  };
  getCategoryPaginate = async () => {
    try {
      const category = await CategoryModel.paginate(
        {},
        { page: 1, limit: 50, lean: true }
      );
      return category;
    } catch (e) {
      throw e;
    }
  };
}

export default categoryManager;
