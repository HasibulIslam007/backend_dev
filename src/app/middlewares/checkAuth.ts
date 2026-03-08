import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env.js";
import AppError from "../errorHelper/AppError.js";
import { verifyToken } from "../utils/jwt.js";
import { User } from "../modules/user/user.model.js";
import httpStatus from "http-status-codes";
import { IsActive } from "../modules/user/user.interface.js";

export const checkAuth = (...authRoles: string[]) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new AppError(401, "Authorization header missing");
    }

    // Extract token safely
    const token = authorization.startsWith("Bearer ")
      ? authorization.split(" ")[1]
      : authorization; // fallback to raw token

    if (!token) {
      throw new AppError(401, "Token not provided");
    }

    // Verify JWT
    let verifiedToken: JwtPayload;
    try {
      verifiedToken = verifyToken(token, envVars.JWT_ACCESS_SECRET) as JwtPayload;
    } catch (err) {
      throw new AppError(401, "Invalid or expired token");
    }

    // Find user (prefer id from token)
    const tokenUserId =
      (verifiedToken as JwtPayload & { userId?: string; id?: string; user?: string }).userId ||
      (verifiedToken as JwtPayload & { userId?: string; id?: string; user?: string }).id ||
      (verifiedToken as JwtPayload & { userId?: string; id?: string; user?: string }).user;

    const user = tokenUserId
      ? await User.findById(tokenUserId)
      : await User.findOne({ email: verifiedToken.email });
    if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
    }

    // Check user status
    if (user.isActive === IsActive.BLOCKED || user.isActive === IsActive.INACTIVE) {
      throw new AppError(httpStatus.BAD_REQUEST, `User is ${user.isActive}`);
    }
    if (user.isDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
    }

    // Role-based access control
    if (authRoles.length && !authRoles.includes(verifiedToken.role)) {
      throw new AppError(403, "You are not permitted to view this route");
    }

    // Attach user info to request
    req.user = verifiedToken;
    next();
  } catch (error) {
    console.log("jwt error", error);
    next(error);
  }
};
