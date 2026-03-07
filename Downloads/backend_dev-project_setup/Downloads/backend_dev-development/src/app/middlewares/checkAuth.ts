import type { Request, Response, NextFunction } from "express";
import AppError from "../errorHelper/AppError.js";
import { verifyToken } from "../utils/jwt.js";
import { envVars } from "../modules/config/env.js";
import type { JwtPayload } from "jsonwebtoken";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError("Unauthorized", 401);
      }

      const decoded = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      if (!authRoles.includes(decoded.role)) {
        throw new AppError("Forbidden", 403);
      }

      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };