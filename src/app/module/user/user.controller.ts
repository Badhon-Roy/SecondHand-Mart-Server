import { Request, Response } from "express";
import { UserServices } from "./user.service";
import User from "./user.model";


const createUser = async(req: Request, res: Response) => {
    try {
        const user = req.body;
        const result = await UserServices.createUserIntoDB(user)
        console.log(result);
        res.status(200).json({
            success: true,
            message : "User created successfully",
            body : result
        })
    } catch (error) {
        console.log(error);
    }
}

export const UserControllers = {
    createUser
}