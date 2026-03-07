import { IsActive, type IUser } from "../modules/user/user.interface.js";
import {User} from "../modules/user/user.model.js";
import jwt from "jsonwebtoken";
import { verifyToken } from "./jwt.js";
import { envVars } from "../config/env.js";
import { email } from "zod";
import AppError from "../errorHelper/AppError.js";

export const createTokens = (user: Partial<IUser>) => {
    const jwtPayload = {
        id: user._id,
        email: user.email,
        role: user.role,
      };
      const accessToken = jwt.sign(jwtPayload, "serectKey", { expiresIn: "1h" });
    
    
      const refreshToken = jwt.sign(jwtPayload  , "refreshSerectKey",   { expiresIn: "7d" });   

    return { accessToken, refreshToken };
}


export const createNewAccessTokenWithRefreshToken = async  (refreshToken: string) => {
    // Implementation for creating new access token with refresh token
    const verifiedRefreshToken = verifyToken(refreshToken, envVars.JWT_REFRESH_SECRET) as jwt.JwtPayload;

    const isUserExist = await User.findOne({email: verifiedRefreshToken.email});

    if (!isUserExist) {
        throw new AppError(404, "User not found")
    }

    if (isUserExist.isActive=== IsActive.INACTIVE || isUserExist.isActive === IsActive.BLOCKED ){
        throw new AppError(403, "Your account is not active. Please contact support.")
    }
    if (isUserExist.isVerified === false) {
        throw new AppError(403, "Your account is not verified. Please verify your account.")
    }

    const jwtPayload ={
        user : isUserExist.id,
        email: isUserExist.email,
        role: isUserExist.role

    }
    const accessToken = jwt.sign(jwtPayload, envVars.JWT_ACCESS_SECRET, { expiresIn: "1h" });
    return { accessToken };
};