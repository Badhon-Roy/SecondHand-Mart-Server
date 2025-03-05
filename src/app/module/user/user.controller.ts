import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import User from "./user.model";
import AppError from "../../errors/appError";


// create user
const createUser = catchAsync(async (req, res) => {
    const user = req.body;
    const exitsUser = await User.findOne({ email: user?.email })
    if (exitsUser) {
        throw new AppError(404, "User already Exits!")
    } else {
        const result = await UserServices.createUserIntoDB(user)
       res.status(200).json({
            success: true,
            message: "User created successfully",
            data: result
        })
    }


})

// get all user
const getAllUser = catchAsync(async (req, res) => {
    const result = await UserServices.getAllUserFromDB(
        req.query
    )
    res.status(200).json({
        message: 'Users are retrieved successfully',
        success: true,
        meta: result.meta,
        data: result.result,
    })
})

//* get single user 
const getSingleUser = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(userId)
    res.status(200).json({
        message: 'User retrieved successfully',
        success: true,
        data: result,
    })
})

// * update single User
const updateSingleUser = catchAsync(async(req, res)=>{
    const {userId} = req.params;
    const userData = req.body;
    const result = await UserServices.updateSingleUserFromDB(userId, userData)
    res.status(200).json({
        message: 'User update successfully',
        success: true,
        data: result,
    })
})

// * delete User
const deleteUser = catchAsync(async(req,res)=>{
    const {userId} = req.params;
    const result = await UserServices.deleteUserFromDB(userId)
    console.log(result);
    res.status(200).json({
        message: 'User delete successfully',
        success: true,
        data: {},
    })
})

export const UserControllers = {
    createUser,
    getAllUser,
    getSingleUser,
    updateSingleUser,
    deleteUser
}