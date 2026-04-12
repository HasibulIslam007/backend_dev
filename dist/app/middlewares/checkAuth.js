import httpStatus from "http-status-codes";
import { envVars } from "../config/env.js";
import AppError from "../errorHelper/AppError.js";
import { IsActive } from "../modules/user/user.interface.js";
import { User } from "../modules/user/user.model.js";
import { verifyToken } from "../utils/jwt.js";
export const checkAuth = (...authRoles) => async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            throw new AppError(401, "Authorization header missing");
        }
        // Accept both "Bearer <token>" and raw token
        const token = authorization.startsWith("Bearer ")
            ? authorization.split(" ")[1]
            : authorization;
        if (!token) {
            throw new AppError(401, "Token not provided");
        }
        let verifiedToken;
        try {
            verifiedToken = verifyToken(token, envVars.JWT_ACCESS_SECRET);
        }
        catch {
            throw new AppError(401, "Invalid or expired token");
        }
        const tokenUserId = verifiedToken.userId ||
            verifiedToken.id ||
            verifiedToken.user;
        const user = tokenUserId
            ? await User.findById(tokenUserId)
            : await User.findOne({ email: verifiedToken.email });
        if (!user) {
            throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
        }
        if (user.isVerified === false) {
            throw new AppError(httpStatus.BAD_REQUEST, "User is not verified");
        }
        if (user.isActive === IsActive.BLOCKED || user.isActive === IsActive.INACTIVE) {
            throw new AppError(httpStatus.BAD_REQUEST, `User is ${user.isActive}`);
        }
        if (user.isDeleted) {
            throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
        }
        if (authRoles.length && !authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "You are not permitted to view this route");
        }
        req.user = verifiedToken;
        next();
    }
    catch (error) {
        console.log("jwt error", error);
        next(error);
    }
};
//# sourceMappingURL=checkAuth.js.map