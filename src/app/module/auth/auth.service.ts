import AppError from "../../errors/appError";
import User from "../user/user.model";
import { ILoginUser } from "./auth.interface";


const loginUser = async (user: ILoginUser) => {
    const isExistsUser = await User.isUserExistsByEmail(user?.email)
    if (!isExistsUser) {
        throw new AppError(404, "User is not found!")
    }
    //* checking password 
    if (!(await User.isPasswordMatched(user?.password, isExistsUser?.password))) {
        throw new AppError(403, 'Password does not match');
     }

}
export const AuthServices = {
    loginUser
}