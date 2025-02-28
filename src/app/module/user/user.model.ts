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

// Hash password before saving
userSchema.pre('save', async function (next) {
    const user = this; // Reference to the user document
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
      );
    }
    next();
  });
  
  // Exclude password after saving
  userSchema.post('save', function (doc, next) {
    doc.password = ''; // Clear password in the returned document
    next();
  });
  
  userSchema.statics.isUserExistsByCustomEmail = async function (email: string) {
    return await User.findOne({ email }).select('+password');
  };
  
  userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
  ) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  };

const User = model<IUSer>("User", userSchema)
export default User;