import bcrypt from "bcryptjs";
import httpStatus from "http-status-codes";

import type { IUser } from "../user/user.interface.js";
import { User } from "../user/user.model.js";

import AppError from "../../errorHelper/AppError.js";
import { generateToken } from "../../utils/jwt.js";
import { envVars } from "../config/env.js";

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  // ✅ Step 1: Validate input
  if (!email || !password) {
    throw new AppError(
      "Email and password are required",
      httpStatus.BAD_REQUEST
    );
  }

  // ✅ Step 2: Check user existence
  const isUserExist = await User.findOne({ email }).select("+password");

  if (!isUserExist) {
    throw new AppError(
      "Invalid email or password",
      httpStatus.UNAUTHORIZED
    );
  }

  // ✅ Step 3: Compare password
  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist.password
  );

  if (!isPasswordMatched) {
    throw new AppError(
      "Invalid email or password",
      httpStatus.UNAUTHORIZED
    );
  }

  // ✅ Step 4: Create JWT payload
  const jwtPayload = {
    id: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  // ✅ Step 5: Generate token
  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET as string,
    envVars.JWT_ACCESS_EXPIRES as string
  );

  // ✅ Step 6: Remove password before returning user
  const { password: _password, ...userWithoutPassword } =
    isUserExist.toObject();

  return {
    success: true,
    message: "Login successful",
    accessToken,
    user: userWithoutPassword,
  };
};

export const AuthService = {
  credentialsLogin,
};