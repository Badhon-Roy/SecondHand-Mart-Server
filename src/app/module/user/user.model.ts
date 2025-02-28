import { model, Schema } from "mongoose";

import bcrypt from 'bcrypt'
import config from "../../config";
import { NextFunction } from "express";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', "user"],
        default: "user"
    },
    password: { type: String, required: true },
    avatar: String
}, {
    timestamps: true
}
)

userSchema.pre("save", async function (next) {
    const user = this as any;

    if (!user.password) {
        return next();
    }
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
    next();
});


userSchema.post('save', function (doc, next) {
    doc.password = ''
    next()
})

const User = model<IUser>("User", userSchema)
export default User;