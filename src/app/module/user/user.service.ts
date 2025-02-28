import QueryBuilder from "../../builder/QueryBuilder";
import { IUSer } from "./user.interface";
import User from "./user.model";

//* create user into database
const createUserIntoDB = async (user: IUSer) => {
    const result = await User.create(user)
    return result;
}

//* get all user
const getAllUserFromDB = async (
    query: Record<string, unknown>
) => {
    const userQuery = new QueryBuilder(User.find(), query)
        .search(['name', 'email'])
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

export const UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB

} 