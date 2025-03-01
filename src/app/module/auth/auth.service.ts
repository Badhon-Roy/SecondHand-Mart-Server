import config from "../../config";
import AppError from "../../errors/appError";
import User from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import jwt, { JwtPayload } from 'jsonwebtoken'

const loginUser = async (payload: ILoginUser) => {

  /// checking if the user is exist
  const user = await User.isUserExistsByEmail(payload?.email);
  if (!user) {
    throw new AppError(404, 'This user is not found !');
  }

  // checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(403, 'Password do not matched');

  const jwtPayload = {
    email: user?.email,
    role: user?.role
  }

  const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_token_expire_in as string)

  const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_token_expire_in as string)

  return {
    accessToken,
    refreshToken
  };
}

const refreshToken = async (token: string) => {

  let decoded;
  try {
    decoded = jwt.verify(token, config.jwt_refresh_secret as string) as JwtPayload;
  } catch (error) {
    console.log(error);
    throw new AppError(401, 'Unauthorized')
  }
  const { email } = decoded;
  const isExistsUser = await User.isUserExistsByEmail(email)
  if (!isExistsUser) {
    throw new AppError(404, "This user is not found!")
  }

  const jwtPayload = {
    email: isExistsUser?.email,
    role: isExistsUser?.role
  }

  const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_token_expire_in as string)

  return {
    accessToken
  }


}

export const AuthServices = {
  loginUser,
  refreshToken
}