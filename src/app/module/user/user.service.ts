import QueryBuilder from "../../builder/QueryBuilder";
import { UserSearchableFields } from "./user.constant";
import { IUser } from "./user.interface";
import User from "./user.model";

//* create user into database
const createUserIntoDB = async (user: IUser) => {
    const result = await User.create(user)
    return result;
}

//* get all user
const getAllUserFromDB = async (
    query: Record<string, unknown>
) => {
    const userQuery = new QueryBuilder(User.find(), query)
        .search(UserSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await userQuery.modelQuery;
    const meta = await userQuery.countTotal();
    return {
        result,
        meta
    };
}

//* get single user
const getSingleUserFromDB = async(id : string)=>{
    const result = await User.findById(id)
    return result;
}

//* update user details 
const updateSingleUserFromDB = async (userId: string, userData: IUser) => {
    const result = await User.findByIdAndUpdate(userId, userData, {
        new: true
    })
    return result;
}

// * delete user form database
const deleteUserFromDB = async (userId: string) => {
    const result = await User.findByIdAndDelete(userId)
    return result;
}

export const UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    updateSingleUserFromDB,
    deleteUserFromDB

} 