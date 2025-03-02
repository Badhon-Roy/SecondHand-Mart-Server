/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { catchAsync } from "../../utils/catchAsync";
import { CategoryServices } from "./category.service";




// create Category
const createCategory = catchAsync(async (req, res) => {
    const category = req.body;
    const result = await CategoryServices.createCategoryIntoDB(category)
    res.status(200).json({
        success: true,
        message: "Category created successfully",
        data: result
    })
})

// get all Category
const getAllCategory = catchAsync(async (req, res) => {
    const result = await CategoryServices.getAllCategoryFromDB(
        req.query
    )
    res.status(200).json({
        message: 'Category are retrieved successfully',
        success: true,
        meta: result.meta,
        data: result.result,
    })
})

//* get single Category 
const getSingleCategory = catchAsync(async (req, res) => {
    const { categoryId } = req.params;
    const result = await CategoryServices.getSingleCategoryFromDB(categoryId)
    res.status(200).json({
        message: 'Category retrieved successfully',
        success: true,
        data: result,
    })
})

// * update single Category
const updateSingleCategory = catchAsync(async(req, res)=>{
    const {categoryId} = req.params;
    const categoryData = req.body;
    const result = await CategoryServices.updateSingleCategoryFromDB(categoryId, categoryData)
    res.status(200).json({
        message: 'Category update successfully',
        success: true,
        data: result,
    })
})

// * delete Category
const deleteCategory = catchAsync(async(req,res)=>{
    const {categoryId} = req.params;
    const result = await CategoryServices.deleteCategoryFromDB(categoryId)
    res.status(200).json({
        message: 'Category delete successfully',
        success: true,
        data: {},
    })
})

export const CategoryControllers = {
    createCategory,
    getAllCategory,
    getSingleCategory,
    updateSingleCategory,
    deleteCategory
}