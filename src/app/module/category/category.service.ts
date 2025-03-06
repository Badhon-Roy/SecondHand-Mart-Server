import QueryBuilder from '../../builder/QueryBuilder';
import { CategorySearchableFields } from './category.constant';
import { ICategory } from './category.interface';
import Category from './category.model';

//* create category into database
const createCategoryIntoDB = async (category: ICategory) => {
  const result = await Category.create(category);
  return result;
};

//* get all category
const getAllCategoryFromDB = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(Category.find(), query)
    .search(CategorySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await categoryQuery.modelQuery;
  const meta = await categoryQuery.countTotal();
  return {
    result,
    meta,
  };
};

//* get single category
const getSingleCategoryFromDB = async (categoryId: string) => {
  const result = await Category.findById(categoryId);
  return result;
};

//* update category details
const updateSingleCategoryFromDB = async (
  categoryId: string,
  categoryData: ICategory,
) => {
  const result = await Category.findByIdAndUpdate(categoryId, categoryData, {
    new: true,
  });
  return result;
};

// * delete category form database
const deleteCategoryFromDB = async (categoryId: string) => {
  const result = await Category.findByIdAndDelete(categoryId);
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
  getSingleCategoryFromDB,
  updateSingleCategoryFromDB,
  deleteCategoryFromDB,
};
