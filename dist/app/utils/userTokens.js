import { IsActive } from "../modules/user/user.interface.js";
import { User } from "../modules/user/user.model.js";
import jwt from "jsonwebtoken";
import { verifyToken } from "./jwt.js";
import { envVars } from "../config/env.js";
import AppError from "../errorHelper/AppError.js";
import { generateToken } from "./jwt.js";
export const createTokens = (user) => {
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role,
    };
    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES);
    const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES);
    return { accessToken, refreshToken };
};
export const createNewAccessTokenWithRefreshToken = async (refreshToken) => {
    // Implementation for creating new access token with refresh token
    const verifiedRefreshToken = verifyToken(refreshToken, envVars.JWT_REFRESH_SECRET);
    const isUserExist = await User.findOne({ email: verifiedRefreshToken.email });
    if (!isUserExist) {
        throw new AppError(404, "User not found");
    }
    if (isUserExist.isActive === IsActive.INACTIVE || isUserExist.isActive === IsActive.BLOCKED) {
        throw new AppError(403, "Your account is not active. Please contact support.");
    }
    if (isUserExist.isVerified === false) {
        throw new AppError(403, "Your account is not verified. Please verify your account.");
    }
    const jwtPayload = {
        userId: isUserExist.id,
        email: isUserExist.email,
        role: isUserExist.role,
    };
    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES);
    return { accessToken };
};
//# sourceMappingURL=userTokens.js.map