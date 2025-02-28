import { IUSer } from "./user.interface";
import User from "./user.model";


const createUserIntoDB = async (user: IUSer)=>{
    const result = await User.create(user)
    return result;
}

export const UserServices = {
    createUserIntoDB
} 