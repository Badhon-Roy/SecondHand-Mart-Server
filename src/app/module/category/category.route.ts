import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryControllers } from "./category.controller";
import { categoryValidation } from "./category.validation";


const router = Router();

router.post('/', validateRequest(categoryValidation.createCategoryValidationSchema), CategoryControllers.createCategory)

router.get('/', CategoryControllers.getAllCategory)

router.get('/:categoryId', CategoryControllers.getSingleCategory)

router.put('/:categoryId', CategoryControllers.updateSingleCategory)

router.delete('/:categoryId',  CategoryControllers.deleteCategory)

export const categoryRouter = router;