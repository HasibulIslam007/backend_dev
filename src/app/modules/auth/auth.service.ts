import bcrypt from "bcryptjs";
import type { IUser } from "../user/user.interface.js";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelper/AppError.js";
import { User } from "../user/user.model.js";

import { createTokens } from "../../utils/userTokens.js";
import { createNewAccessTokenWithRefreshToken } from "../../utils/userTokens.js";
import type { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env.js";
import bcryptjs from "bcryptjs";



const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;


  // ✅ Step 1: Validate inputs
  if (!email || !password) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email and password are required");
  }

  // ✅ Step 2: Find user and include password explicitly
  const isUserExist = await User.findOne({ email }).select("+password");
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid email or password");
  }

  // ✅ Step 3: Compare password safely
  const isPasswordValid = await bcrypt.compare(password, isUserExist.password);
  if (!isPasswordValid) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid email or password");
  }

  // ✅ Step 4: Return safe user data
  const { password: _password, ...userWithoutPassword } = isUserExist.toObject();

  const userToken = createTokens(isUserExist)


  const {password :pass, ...rest} = isUserExist.toObject();
  return {
    success: true,
    message: "Login successful",
    user: userWithoutPassword,
    accessToken: userToken.accessToken,
    refreshToken: userToken.refreshToken,
    user: rest
  };
};


const getNewAccessToken = async (refreshToken: string) => {
  const tokenInfo = await createNewAccessTokenWithRefreshToken(refreshToken);
  return {
    accessToken: tokenInfo
  }
};

const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

    const user = await User.findById(decodedToken.userId);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user.password as string);
    if (!isOldPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Old Password does not match");
    }

    user.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND));

    await user.save();


}




export const AuthService = {
  credentialsLogin,
  getNewAccessToken,
  resetPassword
};

