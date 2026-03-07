import httpStatus from "http-status-codes";
import AppError from "../../errorHelper/AppError.js";
import { UserRole, type AutuhenticatedUser, type IUser } from "./user.interface.js";
import { User } from "./user.model.js";
import bcrypt from "bcryptjs";
import { env } from "process";
import type { Jwt, JwtPayload, JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env.js";
import bcryptjs from "bcryptjs";







const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  // ✅ Ensure required fields exist
  if (!email) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email is required");
  }

  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password as string, Number(env.BCRYPT_SALT_ROUND));

  const authProvider: AutuhenticatedUser = {
    provider: "credentials",
    providerId: email,
  };

  const user = await User.create({
    email,   
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });

  return user;
};

const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {

    const ifUserExist = await User.findById(userId);

    if (!ifUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User Not Found")
    }

    /**
     * email - can not update
     * name, phone, password address
     * password - re hashing
     *  only admin superadmin - role, isDeleted...
     * 
     * promoting to superadmin - superadmin
     */

    if (payload.role) {
        if (decodedToken.role === UserRole.USER || decodedToken.role === UserRole.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        }

        if (payload.role === UserRole.SUPER_ADMIN && decodedToken.role === UserRole.ADMIN) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        }
    }

    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (decodedToken.role === UserRole.USER || decodedToken.role === UserRole.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        }
    }

    if (payload.password) {
        payload.password = await bcryptjs.hash(payload.password, envVars.BCRYPT_SALT_ROUND)
    }

    const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true })

    return newUpdatedUser
}
const getAllUserService = async () => {
  const users = await User.find({});
  const total = await User.countDocuments();
  return { data: users, meta: { total } };
};

export const UserService = {
  createUser,
  getAllUserService,
  updateUser
};