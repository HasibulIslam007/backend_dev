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
import type { AutuhenticatedUser } from "../user/user.interface.js";
import { generateToken, verifyToken } from "../../utils/jwt.js";




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
  if (!isUserExist.password) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password is not set for this account");
  }

  // ✅ Step 3: Compare password safely
  const isPasswordValid = await bcrypt.compare(password, isUserExist.password);
  if (!isPasswordValid) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid email or password");
  }

  // ✅ Step 4: Return safe user data
  const { password: _, ...userWithoutPassword } = isUserExist.toObject();

  const userToken = createTokens(isUserExist)

  return {
    success: true,
    message: "Login successful",
    user: userWithoutPassword,
    accessToken: userToken.accessToken,
    refreshToken: userToken.refreshToken
  };
};


const getNewAccessToken = async (refreshToken: string) => {
  const tokenInfo = await createNewAccessTokenWithRefreshToken(refreshToken);
  return tokenInfo;
};

const resetPassword = async (payload: Record<string, any>, decodedToken: JwtPayload) => {
    if (payload.id != decodedToken.userId) {
        throw new AppError(401, "You can not reset your password")
    }

    const isUserExist = await User.findById(decodedToken.userId)
    if (!isUserExist) {
        throw new AppError(401, "User does not exist")
    }

    const hashedPassword = await bcryptjs.hash(
        payload.newPassword,
        Number(envVars.BCRYPT_SALT_ROUND)
    )

    isUserExist.password = hashedPassword;

    await isUserExist.save()
}
const setPassword = async(userId:string , plainPassword: string) => {

    const user = await User.findById(userId)

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    if (user.password && user.auths?.some(providerObject => providerObject.provider === "google")) {
        throw new AppError(httpStatus.BAD_REQUEST, "Password is already set for this user");
    }
    const hashedPassword = await bcryptjs.hash(
      plainPassword,
      Number(envVars.BCRYPT_SALT_ROUND)
    )

    const credentialProvider: AutuhenticatedUser = {
        provider: "credentials",
        providerId : user.email
    }

    const auths: AutuhenticatedUser[] = [...(user.auths || []), credentialProvider ]
    user.password = hashedPassword;
    user.auths = auths;

    await user.save();

  }

  const changePassword = async(oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

    const user = await User.findById(decodedToken.userId);

    const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user?.password as string);
    if (!isOldPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Old Password does not match");
    }

    user!.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND));

    await user!.save(); 
     


  }


const EMAIL_VERIFY_EXPIRES = "1d";
const PASSWORD_RESET_EXPIRES = "15m";

const createEmailVerificationToken = (user: Partial<IUser>) => {
  if (!user._id) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "User id missing for verification token");
  }
  const payload = {
    userId: user._id,
    tokenType: "email_verify",
  } as JwtPayload;

  return generateToken(payload, envVars.JWT_ACCESS_SECRET, EMAIL_VERIFY_EXPIRES);
};

const verifyEmail = async (token: string) => {
  let decoded: JwtPayload & { userId?: string; tokenType?: string };
  try {
    decoded = verifyToken(token, envVars.JWT_ACCESS_SECRET) as JwtPayload & {
      userId?: string;
      tokenType?: string;
    };
  } catch {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid or expired verification token");
  }

  if (decoded.tokenType !== "email_verify" || !decoded.userId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid verification token");
  }

  const user = await User.findById(decoded.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (user.isVerified) {
    return { alreadyVerified: true };
  }

  user.isVerified = true;
  await user.save();

  return { verified: true };
};

const resendVerification = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (user.isVerified) {
    return { alreadyVerified: true };
  }

  const verificationToken = createEmailVerificationToken(user);
  return { verificationToken };
};

const createPasswordResetToken = (user: Partial<IUser>) => {
  if (!user._id) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "User id missing for reset token");
  }
  const payload = {
    userId: user._id,
    tokenType: "password_reset",
  } as JwtPayload;

  return generateToken(payload, envVars.JWT_ACCESS_SECRET, PASSWORD_RESET_EXPIRES);
};

const forgetPassword = async (email: string) => {
  if (!email) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email is required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const resetToken = createPasswordResetToken(user);
  return { resetToken };
};

export const AuthService = {
  credentialsLogin,
  getNewAccessToken,
  resetPassword,
  setPassword,
  changePassword,
  createEmailVerificationToken,
  verifyEmail,
  resendVerification,
  forgetPassword
};
