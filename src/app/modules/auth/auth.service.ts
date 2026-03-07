import bcrypt from "bcryptjs";
import type { IUser } from "../user/user.interface.js";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelper/AppError.js";
import { User } from "../user/user.model.js";
import jwt from "jsonwebtoken";

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

  const jwtPayload = {
    id: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };
  const accessToken = jwt.sign(jwtPayload, "serect", { expiresIn: "1h" });
  return {
    success: true,
    message: "Login successful",
    user: userWithoutPassword,
    accessToken,
  };
};



 


export const AuthService = {
  credentialsLogin,
};