import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";


const login = catchAsync(async(req,res)=>{
       const user = req.body;
        const result = await AuthServices.loginUser(user)
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            data: result
        })
})

export const AuthControllers = {
    login
}