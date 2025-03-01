import { Router } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";


const router = Router();

router.post('/', validateRequest(userValidation.registerUserValidationSchema), UserControllers.createUser)
router.get('/', UserControllers.getAllUser)
router.get('/:userId',
    UserControllers.getSingleUser)
router.put('/:userId',
    UserControllers.updateSingleUser)
router.delete('/:userId',
    UserControllers.deleteUser)

export const userRouter = router;