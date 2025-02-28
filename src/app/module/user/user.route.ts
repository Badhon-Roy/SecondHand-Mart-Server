import { Router } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidationSchema } from "./user.validation";


const router = Router();

router.post('/create-user', validateRequest(UserValidationSchema), UserControllers.createUser)
router.get('/user', UserControllers.getAllUser)
router.get('/user/:userId',
    UserControllers.getSingleUser)

export const userRouter = router;