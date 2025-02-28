import { model, Schema } from "mongoose";
import { IUSer } from "./user.interface";

import bcrypt from 'bcrypt'
import config from "../../config";
import { NextFunction } from "express";

const userSchema = new Schema<IUSer>({
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

const User = model<IUSer>("User", userSchema)
export default User;