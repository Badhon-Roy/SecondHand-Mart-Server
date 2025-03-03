/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user'
    avatar?: string;
    phoneNumber : string;
}

export interface UserModel extends Model<IUser> {
    isUserExistsByEmail(email: string): Promise<IUser>;
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string
     ): Promise<boolean>;
}

export type IUserRole = keyof typeof USER_ROLE