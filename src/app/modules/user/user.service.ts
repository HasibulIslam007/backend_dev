import httpStatus from "http-status-codes";
import AppError from "../../errorHelper/AppError.js";
import type { AutuhenticatedUser, IUser } from "./user.interface.js";
import { User } from "./user.model.js";
import bcrypt from "bcryptjs";







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

  const hashedPassword = await bcrypt.hash(password as string, 10);

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

const getAllUserService = async () => {
  const users = await User.find({});
  const total = await User.countDocuments();
  return { data: users, meta: { total } };
};

export const UserService = {
  createUser,
  getAllUserService,
};