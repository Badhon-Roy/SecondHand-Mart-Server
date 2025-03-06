/* eslint-disable @typescript-eslint/no-explicit-any */
import { model, Schema } from 'mongoose';

import bcrypt from 'bcrypt';
import config from '../../config';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    avatar: String,
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this as any;

  if (!user.password) {
    return next();
  }
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email });
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

const User = model<IUser, UserModel>('User', userSchema);
export default User;
